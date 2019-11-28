import { User, BlockchainAction, blockcahinVersionHelpers, } from 'meteor/populous:api';
import {
  blockchainActionTypes,
  blockchainActionStatuses,
  userProviderStatuses,
} from 'meteor/populous:constants';
import ethConnect from 'meteor/populous:eth-connect';

import connectInstance from "../../ethConnect/connectInstance";


export default async function newProvider(blockchainAction, nonce) {
  const {
    config: {
      network: { ropsten },
      contract: { populous },
    },
    contracts: { populous: { addProvider } },
  } = ethConnect;

  const user = await User.findOne(blockchainAction.userId);

  if(user){
    await addProvider(connectInstance, populous, {nonce, from:ropsten.ethAddress},
      blockchainAction._id, user._id, user.companyNumber,
      user.companyName, user.country);

    return true;
  }
}
