import { Currency, BlockchainAction, blockcahinVersionHelpers, } from 'meteor/populous:api';
import {
  blockchainActionTypes,
  blockchainActionStatuses
} from 'meteor/populous:constants';
import connectInstance from "../../ethConnect/connectInstance";
import ethConnect from 'meteor/populous:eth-connect';
import moment from 'moment';

const upgradeCurrency = async (blockchainAction, nonce) => {
  const currency = await Currency.findOne({
    isPending: false,
    ethAddress: {$exists: true},
    version: {
      $exists: true,
      $lt: blockchainAction.version,
    },
    symbol: blockchainAction.title,
  });

    const {
      config: {
        network: { ropsten },
        contract: { populous, },
      },
      contracts: {populous: {upgradeCurrency,}, },
    } = ethConnect;

    if (blockchainAction && currency) {
      await upgradeCurrency(connectInstance, populous, { nonce, from: ropsten.ethAddress},
        blockchainAction._id, currency.ethAddress, currency.symbol,);

      return true;
    }
};

export default upgradeCurrency;
