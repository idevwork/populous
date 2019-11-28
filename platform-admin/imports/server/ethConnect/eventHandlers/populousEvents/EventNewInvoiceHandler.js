import {
  BlockchainAction,
} from 'meteor/populous:api';
import {
  blockchainActionStatuses,
} from 'meteor/populous:constants';

import {hexToAscii} from "../../helpers";


export default async function EventNewInvoiceHandler(eventObj){
  const {
    returnValues: {
      _blockchainActionId,
    }
  } = eventObj;

  const blockchainActionId = hexToAscii(_blockchainActionId);
  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);

  if (!blockchainAction || blockchainAction.isCompleted()) {
    return;
  }

  await blockchainAction.handleBlockchainResponse(false, eventObj);
}
