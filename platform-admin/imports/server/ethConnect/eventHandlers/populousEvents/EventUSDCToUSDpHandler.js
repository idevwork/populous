// import {
//   blockchainActionTypes,
//   blockchainActionStatuses,
//   ledgerActionsTypes,
//   userProviderStatuses,
//   tokenPrecision
// } from 'meteor/populous:constants';
import { BlockchainAction, Wallet, LedgerBalance, LedgerLog } from 'meteor/populous:api';
// import ethConnect from 'meteor/populous:eth-connect';


import { hexToAscii } from "../../helpers";

// const {
//   contracts: { pptMultiplier },
// } = ethConnect;

// let tokenAddresses = process.env.tokenAddresses ||
//   Object.assign({}, {
//     PXTToken: process.env.PXTToken,
//     USDCToken: process.env.USDCToken,
//     TUSDToken: process.env.TUSDToken,
//     XAUToken: process.env.TUSDToken,
//     XAUToken: process.env.XAUToken,
//     GBPpToken: process.env.GBPpToken
//   });


export default async function EventUSDCToUSDpHandler(eventObj) {

  const {
    returnValues: {
      _blockchainActionId: blockchainActionIdHex,
      _clientId: userIdHex,
      amount,
    },
    returnValues,
  } = eventObj;


  const userId = hexToAscii(userIdHex);
  const blockchainActionId = hexToAscii(blockchainActionIdHex);

  if (!userId) {
    return;
  }

  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);

  if (!blockchainAction || blockchainAction.isCompleted()) {
    return;
  }

  // const amountInt = Number.parseInt(amount);
  // const wallet = await Wallet.findOne({ userId });
  const { ledgerLogId, resultAmount } = blockchainAction.data;

  // const conversionRate = 1 / (resultAmount / amount);
  let ledgerBalance = LedgerBalance.findOne({userId, currency: 'GBP'});

  if (!ledgerBalance) {
    ledgerBalance = new LedgerBalance({userId, currency: 'GBP'});
  }

  const ledgerLog = LedgerLog.findOne({_id: ledgerLogId})
  ledgerLog.isPending = false;

  ledgerLog.save();

  ledgerBalance.amount += resultAmount;

  ledgerBalance.save();

  await blockchainAction.handleBlockchainResponse(false, eventObj);
}
