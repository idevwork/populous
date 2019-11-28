import {
  blockchainActionTypes,
  blockchainActionStatuses,
  ledgerActionsTypes,
  userProviderStatuses,
} from 'meteor/populous:constants';
import {
  BlockchainAction,
  User,
} from 'meteor/populous:api';

import {hexToAscii} from "../../helpers";


export default async function EventNewProviderHandler(eventObj){
  const {
    returnValues: {
      _blockchainActionId,
      _userId,
    }
  } = eventObj;

  const userId = hexToAscii(_userId);
  const blockchainActionId = hexToAscii(_blockchainActionId);

  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);
  const user = await User.findOne(userId);

  if (!blockchainAction || blockchainAction.isCompleted() || !user) {
    return;
  }

  user.provider.status = userProviderStatuses.completed;

  await user.save();
  await blockchainAction.handleBlockchainResponse(false, eventObj);

}
