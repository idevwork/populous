import { Currency, BlockchainAction } from 'meteor/populous:api';
import {
  blockchainActionTypes,
  blockchainActionStatuses
} from 'meteor/populous:constants';
import ethConnect from 'meteor/populous:eth-connect';

import connectInstance from "../ethConnect/connectInstance";
import createCurrency from "./BlockchainCronMethods/createCurrency";
import createAddress from "./BlockchainCronMethods/createAddress";
import upgradeCurrency from "./BlockchainCronMethods/upgradeCurrency";
import withdrawRepeat from "./BlockchainCronMethods/withdrawRepeat";
import newProvider from "./BlockchainCronMethods/newProvider";
import newInvoice from "./BlockchainCronMethods/newInvoice";
import exchangeXaup from "./BlockchainCronMethods/exchangeXaup";
import usdcToUsdp from "./BlockchainCronMethods/usdcToUsdp";
import usdpToUsdc from "./BlockchainCronMethods/usdpToUsdc";

const {
  config: {
    network: { ropsten },
    contract: { dataManager, },
  },
  methods: { transaction: { getNextNonce }, },
  contracts: { dataManager: { getActionStatus, } },
} = ethConnect;

let inProgress = false;

const priority = {
  [blockchainActionTypes.exchangeXaup]: 1,
  [blockchainActionTypes.usdcToUsdp]: 1,
  [blockchainActionTypes.usdpToUsdc]: 1,
  [blockchainActionTypes.createAddress]: 1,
  [blockchainActionTypes.withdrawRepeat]: -1,
};

export default async function BlockchainCron() {


  if (inProgress) {
    return;
  }

  inProgress = true;

  const blockchainActions = await BlockchainAction.find({
    status: blockchainActionStatuses.pending,
  }).fetch()
    .sort(({ type: firstType }, { type: secondType }) => {
      const firstTypePriority = priority[firstType] || 0;
      const secondTypePriority = priority[secondType] || 0;
      return secondTypePriority - firstTypePriority;
    });

  if (blockchainActions.length) {
    let nonce;
    try {
      nonce = Number(await getNextNonce(connectInstance, ropsten.ethAddress));
    } catch (error) {
      console.log('BlockchainCron error nonce getting', error);
      return;
    }

    for (let i = 0; i < blockchainActions.length; i++) {
      const blockchainAction = blockchainActions[i];

      try {
        if (await getActionStatus(connectInstance, dataManager, blockchainAction._id)) {
          continue;
        }
      } catch (error) {
        console.log('BlockchainCron error BA status check', error);
        continue;
      }

      let result;

      console.log(`Nonce from Blockchain cron ${blockchainAction._id}: `, '0x' + nonce.toString(16));

      const funcObj = [
        blockchainAction,
        '0x' + nonce.toString(16),
      ];

      let targetFunction;
      switch (blockchainAction.type) {
        case blockchainActionTypes.createAddress:
          targetFunction = createAddress;
          break;
        case blockchainActionTypes.createCurrency:
          targetFunction = createCurrency;
          break;
        case blockchainActionTypes.upgradeCurrency:
          targetFunction = upgradeCurrency;
          break;
        case blockchainActionTypes.withdraw:
          targetFunction = withdrawRepeat;
          break;
        case blockchainActionTypes.newProvider:
          targetFunction = newProvider;
          break;
        case blockchainActionTypes.invoice:
          targetFunction = newInvoice;
          break;
        case blockchainActionTypes.exchangeXaup:
          targetFunction = exchangeXaup;
          break;
        case blockchainActionTypes.usdcToUsdp:
          targetFunction = usdcToUsdp;
          break;
        case blockchainActionTypes.usdpToUsdc:
          targetFunction = usdpToUsdc;
          break;
    }

      if (targetFunction) {
        try {
          //pause for 0.5 second for each request
          result = await targetFunction(...funcObj);
          if (result) {
            nonce++;
          }
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(true)
            }, 500);
          })
          // increment nonce only if method returns 'true' and finished without exceptions
        } catch (error) {
          console.log(`BlockchainCron error for ${blockchainAction._id}:`, error);
        }
      }
    }
  }
  inProgress = false;
}
