import {Currency, BlockchainAction} from 'meteor/populous:api';
import {
  blockchainActionTypes,
  blockchainActionStatuses
} from 'meteor/populous:constants';
import connectInstance from "../../ethConnect/connectInstance";
import ethConnect from 'meteor/populous:eth-connect';
import moment from 'moment';

const createCurrency = async (blockchainAction, nonce) => {
  const currency = await Currency.findOne({
    symbol: blockchainAction.title,
    isPending: true,
  });

  const {
    config: {
      network: {ropsten},
      contract: {populous,},
    },
    contracts: {populous: {createCurrency,},},
  } = ethConnect;


  if (blockchainAction && currency) {
    await createCurrency(connectInstance, populous, {nonce, from: ropsten.ethAddress},
      currency.title, 8, currency.symbol, blockchainAction._id);

    return true;
  }
};

export default createCurrency;
