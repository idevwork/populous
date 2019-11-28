import {Wallet, LedgerLog, LedgerBalance, DepositLog} from 'meteor/populous:api';
import {populousEvents, depositLogTypes, blockchainActionStatuses, ledgerActionsTypes} from 'meteor/populous:constants';
import ethConnect from 'meteor/populous:eth-connect';

import connectInstance from "../../ethConnect/connectInstance";

const {
  config: {
    network: {ropsten},
    contract: {populous},
  },
  contracts: {populous: {usdpToUsdc}},
} = ethConnect;

export default async function exchangeUsdcToUsdp(blockchainAction) {
  if (blockchainAction) {
    const {userId, _id, amount, data} = blockchainAction;
    // TODO: This is section 3.
    await usdpToUsdc(connectInstance, populous, ropsten.ethAddress, _id, userId, amount);
    return true;
  }
}
