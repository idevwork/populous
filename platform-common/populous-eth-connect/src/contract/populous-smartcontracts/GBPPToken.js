import {tokenPrecision} from 'meteor/populous:constants';

import blockchainDataService from "../../blockchainDataService";
import contracts from "../../config/contract";

export default {
  balanceOfForGBP(ownerAddress) {
    return blockchainDataService.getTokensBalance(contracts.GBPPToken.address, ownerAddress, tokenPrecision.GBPpToken);
  },
};
