import { Meteor } from 'meteor/meteor';

import BlockchainLog from "../model";
import User from "../../accounts/model";
import { Config, configKeys } from 'meteor/populous:config';
import checkAuth from "../../helpers/checkAuth";


const blockchainConfigValue = {
  gasPrice: 0,
  gasLimit: 0,
};

const blockchainInitialConfig = {
  key: configKeys.blockchain,
  value: {...blockchainConfigValue}
};

BlockchainLog.extend({
  meteorMethods: {
    updateBlockchain(data) {
      const userId = checkAuth();
      const user = User.findOne(userId);
      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }
      const updateObj = {}

      if (data.gasPrice) {
        const gasPrice = Number.parseInt(data.gasPrice);

        if (!gasPrice || gasPrice <= 0 ) {
          throw new Meteor.Error(400, 'Gas Price should be valid number');
        }
        updateObj.gasPrice = gasPrice
      }
      if (data.pptInterestFee) {
        const pptInterestFee = Number.parseFloat(data.pptInterestFee);

        if (!pptInterestFee || pptInterestFee < 0 ) {
          throw new Meteor.Error(400, 'PPT interest fee should be valid number');
        }
        updateObj.pptInterestFee = pptInterestFee
      }
      if (data.pptExchange) {
        const pptExchange = Number.parseFloat(data.pptExchange);

        if (!pptExchange || pptExchange < 0 ) {
          throw new Meteor.Error(400, 'PPT exchange fee should be valid number');
        }
        updateObj.pptExchange = pptExchange
      }
      const blockchainLog = new BlockchainLog({
        userId: Meteor.userId(),
        data
      });

      blockchainLog.save();

      const blockchainConfig = Config.findOne({ 'key': configKeys.blockchain })
        || new Config({...blockchainInitialConfig});

      blockchainConfig.value = { ...blockchainConfig.value, ...updateObj};

      blockchainConfig.save();
    },

    updateBlockchainSignerKey(signerKey) {
      const userId = checkAuth();
      const user = User.findOne(userId);
      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }
      if (!signerKey) {
        throw new Meteor.Error(400, 'Security signer key is required!');
      }
      const blockchainLog = new BlockchainLog({
        userId: Meteor.userId(),
        data: {
          securitySignerKey: signerKey,
        }
      });

      blockchainLog.save();

      const blockchainConfig = Config.findOne({ 'key': configKeys.blockchain })
        || new Config({...blockchainInitialConfig});


      blockchainConfig.value.securitySignerKey = signerKey;

      blockchainConfig.save();
    },

    create(gasPrice, gasLimit) {
      this.gasPrice = Number(gasPrice);
      this.gasLimit = Number(gasLimit);
      this.userId = Meteor.userId();
      this.save();
    }
  }
});
