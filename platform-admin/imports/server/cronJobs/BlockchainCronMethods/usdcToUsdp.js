import {Wallet, LedgerLog, LedgerBalance, DepositLog} from 'meteor/populous:api';
import {populousEvents, depositLogTypes, blockchainActionStatuses, ledgerActionsTypes} from 'meteor/populous:constants';
import ethConnect from 'meteor/populous:eth-connect';

import connectInstance from "../../ethConnect/connectInstance";

const {
  config: {
    network: {ropsten},
    contract: {populous},
  },
  contracts: {populous: {usdcToUsdp}},
} = ethConnect;

export default async function exchangeUsdcToUsdp(blockchainAction) {
  if (blockchainAction) {
    const {userId, _id, amount, data} = blockchainAction;
    // const {resultAmount} = data
    // const wallet = Wallet.findOne({userId});
    // const availableBalance = wallet.balanceUSDC;
    // if (amount <= 0 || amount > availableBalance) {
    //   blockchainAction.error = "Not enough USDC";
    //   blockchainAction.status = blockchainActionStatuses.failed;
    //   blockchainAction.save();
    //   return;
    // }

    // TODO: This is section 3.
    await usdcToUsdp(connectInstance, populous, ropsten.ethAddress, _id, userId, amount);

    // const conversionRate = 1 / (resultAmount / amount);
    // let ledgerBalance = LedgerBalance.findOne({userId, currency: 'GBP'});

    // if (!ledgerBalance) {
    //   ledgerBalance = new LedgerBalance({userId, currency: 'GBP'});
    // }

    // const ledgerLog = new LedgerLog({
    //   fromUserId: userId,
    //   fromUserAddress: wallet.address,
    //   fromCurrency: 'USDC',
    //   fromValue: amount,
    //   fromNewBalance: availableBalance - amount,
    //   toUserId: userId,
    //   toUserAddress: this.address,
    //   toCurrency: 'GBP',
    //   toValue: resultAmount,
    //   toNewBalance: ledgerBalance.amount + resultAmount,
    //   conversionRate,
    //   type: ledgerActionsTypes.deposit,
    //   isPending: false,
    // });

    // ledgerLog.save();

    // const depositLog = new DepositLog({
    //   userId,
    //   logId: ledgerLog._id,
    //   amount: amount,
    //   received: resultAmount,
    //   type: depositLogTypes.USDC
    // });
    // depositLog.save();

    // ledgerBalance.amount += resultAmount;

    // ledgerLog.dataId = depositLog._id;

    // ledgerLog.save();
    // ledgerBalance.save();

    return true;
  }
}
