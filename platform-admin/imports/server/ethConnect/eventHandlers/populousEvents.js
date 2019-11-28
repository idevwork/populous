import {
  Wallet, Currency, EthId, BlockchainAction,
  LedgerBalance, BlockchainEvent, LedgerLog, DepositLog,
  Request,
} from 'meteor/populous:api';
import ethConnect from 'meteor/populous:eth-connect';
import {
  blockchainActionTypes,
  blockchainActionStatuses,
  ledgerActionsTypes,
} from 'meteor/populous:constants';

import { hexToAscii } from '../helpers';
import eventLogger from './eventLogger';
import { Config, configKeys } from 'meteor/populous:config';
import connectInstance from "../connectInstance";
import EventNewProviderHandler from "./populousEvents/EventNewProviderHandler";
import EventNewInvoiceHandler from "./populousEvents/EventNewInvoiceHandler";
import EventUpgradeCurrencyHandler from "./populousEvents/EventUpgradeCurrencyHandler";
import EventUpgradeDepositContractHandler from "./populousEvents/EventUpgradeDepositContractHandler";
import EventExchangeXAUpHandler from "./populousEvents/EventExchangeXAUpHandler";
import EventDepositAddressUpgradeHandler from "./populousEvents/EventDepositAddressUpgradeHandler";
import EventUSDCToUSDpHandler from "./populousEvents/EventUSDCToUSDpHandler";
import EventUSDpToUSDCHandler from "./populousEvents/EventUSDpToUSDCHandler";

const {
  config: {
    network: { ropsten },
    contract: { populous },
  },
  contracts: { populous: { getLedgerEntry } },
  methods: { event: { subscribeAll } },
  constants: { pptMultiplier, }
} = ethConnect;

const eventsList = {
  EventWithdrawPPT: 'EventWithdrawPPT',
  EventWithdrawPoken: 'EventWithdrawPoken',
  EventNewCurrency: 'EventNewCurrency',
  EventUpgradeCurrency: 'EventUpgradeCurrency',
  EventNewDepositContract: 'EventNewDepositContract',
  EventUpgradeDepositContract: 'EventUpgradeDepositContract',
  EventNewProvider: 'EventNewProvider',
  EventNewInvoice: 'EventNewInvoice',
  EventExchangeXAUp: 'EventExchangeXAUp',
  EventDepositAddressUpgrade: 'EventDepositAddressUpgrade', // 'DepositAddressUpgrade',
  EventUSDCToUSDp: 'EventUSDCToUSDp',
  EventUSDpToUSDC: 'EventUSDpToUSDC'
};


const subscribe = async () => {
  const initialConfig = Config.findOne({ key: configKeys.latestBlockNumber });
  const blockNumber = /*initialConfig && initialConfig.value.lastPopulousBlockNumber
    ? initialConfig.value.lastPopulousBlockNumber
    : */ 7185206;
  subscribeAll('populous', populous.address, blockNumber, async (eventName, event) => {
    switch (eventName) {
      case eventsList.EventWithdrawPPT:
        withdrawPPT(event);
        break;
      case eventsList.EventWithdrawPoken:
        withdrawPokens(event);
        break;
      case eventsList.EventNewCurrency:
        newCurrency(event);
        eventLogger('ppt', eventName, event.returnValues);
        break;
      case eventsList.EventUpgradeCurrency:
        EventUpgradeCurrencyHandler(event);
        eventLogger('ppt', eventName, event.returnValues);
        break;
      case eventsList.EventNewDepositContract:
        newDepositContract(event);
        eventLogger('ppt', eventName, event.returnValues);
        break;
      case eventsList.EventUpgradeDepositContract:
        EventUpgradeDepositContractHandler(event);
        eventLogger('ppt', eventName, event.returnValues);
        break;
      case eventsList.EventNewProvider:
        EventNewProviderHandler(event);
        eventLogger('ppt', eventName, event.returnValues);
        break;
      case eventsList.EventNewInvoice:
        EventNewInvoiceHandler(event);
        eventLogger('ppt', eventName, event.returnValues);
        break;
      case eventsList.EventExchangeXAUp:
        EventExchangeXAUpHandler(event);
        eventLogger('ppt', eventName, event.returnValues);
        break;
      case eventsList.EventDepositAddressUpgrade:
        EventDepositAddressUpgradeHandler(event);
        eventLogger('ppt', eventName, event.returnValues);
        break;
      case eventsList.EventUSDCToUSDp:
        EventUSDCToUSDpHandler(event);
        eventLogger('usdc', eventName, event.returnValues);
        break;
      case eventsList.EventUSDpToUSDC:
        EventUSDpToUSDCHandler(event);
        eventLogger('usdc', eventName, event.returnValues);
        break;
    }
    const config = Config.findOne({ key: configKeys.latestBlockNumber });
    config.value.lastPopulousBlockNumber = event.blockNumber;
    await config.save();
  });
};


const newDepositContract = async (eventObj) => {
  const {
    returnValues: {
      blockchainActionId: blockchainActionIdHex,
      clientId,
      depositContractAddress,
      version: eventVersion,
    }
  } = eventObj;

  const userId = hexToAscii(clientId);
  const blockchainActionId = hexToAscii(blockchainActionIdHex);
  const version = Number.parseInt(eventVersion);

  if (!userId) {
    return;
  }

  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);

  if (!blockchainAction || blockchainAction.isCompleted()) {
    return;
  }
  await blockchainAction.handleBlockchainResponse(false, eventObj);

  const wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    return;
  }

  if (wallet.address) {
    wallet.old.push(wallet.address);
  }

  wallet.address = depositContractAddress;
  wallet.isPending = false;
  wallet.version = version;
  wallet.save();
};

const newCurrency = async (eventObj) => {

  const {
    returnValues: {
      blockchainActionId: blockchainActionIdHex,
      tokenSymbol,
      addr,
    }
  } = eventObj;

  const currencySymbol = hexToAscii(tokenSymbol);

  if (!currencySymbol) {
    return;
  }

  const currencyDoc = await Currency.findOne({ symbol: currencySymbol });

  if (!currencyDoc) {
    return;
  }

  const blockchainActionId = hexToAscii(blockchainActionIdHex);

  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);

  if (!blockchainAction || blockchainAction.isCompleted()) {
    return;
  }

  await blockchainAction.handleBlockchainResponse(false, eventObj);

  currencyDoc.isPending = false;
  currencyDoc.ethAddress = addr;
  currencyDoc.version = blockchainAction.version;

  await currencyDoc.save();
};

const withdrawPPT = async (eventObj) => {
  const {
    event,
    returnValues,
    returnValues: {
      blockchainActionId: blockchainActionIdHex,
      accountId: userIdHex,
      depositContract: walletAddress,
      to: withdrawToAddress,
      amount: withdrawAmount
    }
  } = eventObj;

  const userId = hexToAscii(userIdHex);
  const blockchainActionId = hexToAscii(blockchainActionIdHex);

  if (!userId) {
    return;
  }

  const amountInt = Number.parseInt(withdrawAmount) / pptMultiplier;

  returnValues.accountId = userId;
  returnValues.amount = amountInt;

  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);

  if (!blockchainAction || blockchainAction.isCompleted()) {
    return;
  }

  /**
   * For deposit strike out action on admin side
   */

  if (blockchainAction.dataId) {
    const relatedDepositLog = await DepositLog.findOne(blockchainAction.dataId);

    relatedDepositLog.returned = true;
    await relatedDepositLog.save();
  }

  await blockchainAction.handleBlockchainResponse(false, eventObj);

  const wallet = await Wallet.findOne({ userId });

  const availableBalance = await wallet.calculateAvailableBalance();

  const blockchainEvent = new BlockchainEvent({
    source: 'ppt',
    type: event,
    data: returnValues,
    newBalance: availableBalance,
  });

  await blockchainEvent.save();

  await LedgerLog.update({ dataId: blockchainActionId }, { isPending: false });
};

const withdrawPokens = async (eventObj) => {

  const {
    returnValues: {
      _blockchainActionId: blockchainActionIdHex,
      accountId: userIdHex,
      amount: withdrawAmountStr,
      currency: currencyHex,
      toBank,
    },
    returnValues, event,
  } = eventObj;

  const userId = hexToAscii(userIdHex);
  const currencySymbol = hexToAscii(currencyHex),
    withdrawAmount = Number.parseInt(withdrawAmountStr) / pptMultiplier,
    blockchainActionId = hexToAscii(blockchainActionIdHex);

  if (!userId) {
    return;
  }

  returnValues.accountId = userId;
  returnValues.amount = withdrawAmount;
  returnValues.currency = currencySymbol;

  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);

  const ledgerBalance = await LedgerBalance.findOne({
    userId: userId,
    currency: currencySymbol,
  });

  if (!blockchainAction || blockchainAction.isCompleted() || !ledgerBalance) {
    return;
  }

  // Always subtract from external amount
  ledgerBalance.externalWalletAmount -= typeof blockchainAction.amount === 'object'
    ? blockchainAction.amount.externalInterest
    : blockchainAction.amount;

  await blockchainAction.handleBlockchainResponse(false, eventObj);

  await ledgerBalance.save();

  const blockchainEvent = new BlockchainEvent({
    source: 'ppt',
    type: event,
    data: returnValues,
    newBalance: ledgerBalance.amount,
  });

  await blockchainEvent.save();
};


const newCrowdsaleBlock = async (eventObj) => {
  const {
    returnValues,
    event,
    returnValues: {
      blockchainActionId: blockchainActionIdHex,
      invoiceId: invoiceIdHex,
      sourceLength,
    }
  } = eventObj;

  const invoiceId = hexToAscii(invoiceIdHex);
  const blockchainActionId = hexToAscii(blockchainActionIdHex);

  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);

  if (!blockchainAction || blockchainAction.isCompleted()) {
    return;
  }

  await blockchainAction.handleBlockchainResponse(false, eventObj);
};

export default {
  subscribe
}