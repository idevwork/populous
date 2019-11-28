import moment from 'moment';
import {requestTypes, blockchainActionTypes} from 'meteor/populous:constants';
import {platformActionTypes, platformActionStatuses} from 'meteor/populous:constants';

import PlatformAction from '../model';
import startAuction from "./processingMethods/startAuction";
import exchangePPTForPoken from "./processingMethods/exchangePPTForPoken";
import refundPPT from "./processingMethods/refundPPT";
import placeBid from './processingMethods/placeBid';


const typeToProcessingMethod = {
  [platformActionTypes.startAuction]: startAuction,
  [platformActionTypes.PPTtoGBPp]: exchangePPTForPoken,
  [platformActionTypes.GBPptoPPT]: refundPPT,
  [platformActionTypes.placeBid]: placeBid,
};


async function processing(){
  const actions = await PlatformAction.find({
    $or:[
      {status: platformActionStatuses.new},
      {
        status: platformActionStatuses.pending,
        type: platformActionTypes.startAuction,
        createdAt: {$lte: moment().subtract(15, 'minutes').toDate()}
      }
    ]
  }).fetch();

  for(let i = 0; i< actions.length; i++){
    const action = actions[i];
    try {
      if(typeToProcessingMethod[action.type]) {
        await typeToProcessingMethod[action.type](action);
      } else {
        throw new Error('No handler is defined for the action')
      }
    } catch (error) {
      console.error(error)
      // if (action.status === platformActionStatuses.new) {
      action.status = platformActionStatuses.failed
      action.error = `${error}`
      await action.save()
      // }
    }
  }

  setTimeout(processing, 500);
}

PlatformAction.extend({
  meteorMethods: {
    startJob(){
      processing();
    }
  },
});
