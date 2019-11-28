import { BlockchainAction, Wallet, LedgerBalance, LedgerLog, DepositLog } from 'meteor/populous:api';

import { hexToAscii } from "../../helpers";

export default async function EventUSDpToUSDCHandler(eventObj) {

  const {
    returnValues: {
      _blockchainActionId: blockchainActionIdHex,
      _clientId: userIdHex,
      amount
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

  const userWallet = Wallet.findOne({ userId });

  const { depositLogId } = blockchainAction.data;
  const depositLog = await DepositLog.findOne({_id: depositLogId})
  const relatedLedgerLog = await LedgerLog.findOne({
    type: ledgerActionsTypes.deposit,
    dataId: depositLogId,
  });
  const userCurrencyLedger = await LedgerBalance.findOne({ userId, currency: relatedLedgerLog.toCurrency });
  const ledgerLogToValue = parseFloat(relatedLedgerLog.toValue.toFixed(2));

  userCurrencyLedger.amount -= ledgerLogToValue;
  userCurrencyLedger.save();

  userWallet.availableBalanceUSDC += amount;
  userWallet.save();
  depositLog.returned = true;
  depositLog.save();

  await blockchainAction.handleBlockchainResponse(false, eventObj);
}
