import {Wallet, BlockchainAction, Currency, blockcahinVersionHelpers} from 'meteor/populous:api';
import ethConnect from 'meteor/populous:eth-connect';
import {
  blockchainActionTypes,
  blockchainActionStatuses,
} from 'meteor/populous:constants';

import connectInstance from "../../ethConnect/connectInstance";

const {
  config: {
    network: {ropsten},
    contract: {populous},
  },
  contracts: {populous: {exchangeXAUP}},
} = ethConnect;

export default async function exchangeXaup(blockchainAction) {
  if (blockchainAction) {
    const {userId, _id, amount} = blockchainAction;
    const xaupAmount = amount.xau;
    let requiredAmount, currency;
    if (amount['USDCToken']) {
      requiredAmount = amount['USDCToken'];
      currency = 'USDCToken';
    } else {
      requiredAmount = amount['TUSDToken'];
      currency = 'TUSDToken';
    }

    await exchangeXAUP(connectInstance, populous, ropsten.ethAddress, _id, userId, currency, requiredAmount, xaupAmount);

    return true;
  }
}
