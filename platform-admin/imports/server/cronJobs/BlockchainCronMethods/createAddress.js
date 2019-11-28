import {Wallet, BlockchainAction} from 'meteor/populous:api';
import {
  blockchainActionTypes,
  blockchainActionStatuses
} from 'meteor/populous:constants';
import ethConnect from 'meteor/populous:eth-connect';
import connectInstance from "../../ethConnect/connectInstance";


const createAddress = async (blockchainAction, nonce) => {
  const wallet = await Wallet.findOne({
    userId: blockchainAction.userId,
  });

  const {
    config: {
      network: {ropsten},
      contract: {populous,},
    },
    contracts: {populous: {createAddress,},},
  } = ethConnect;


  if (blockchainAction && wallet) {
    await createAddress(connectInstance, populous, {nonce, from:ropsten.ethAddress}, wallet.userId, blockchainAction._id);

    return true;
  }
};

export default createAddress;
