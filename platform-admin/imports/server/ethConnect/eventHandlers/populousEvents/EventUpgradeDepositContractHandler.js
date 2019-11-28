import {
  blockchainActionTypes,
  blockchainActionStatuses,
  ledgerActionsTypes,
  userProviderStatuses,
} from 'meteor/populous:constants';
import {
  BlockchainAction,
  Wallet,
} from 'meteor/populous:api';

import {hexToAscii} from "../../helpers";

export default async function EventUpgradeDepositContractHandler (eventObj){
  const {
    returnValues: {
      blockchainActionId: blockchainActionIdHex,
      clientId,
      version,
    }
  } = eventObj;

  const userId = hexToAscii(clientId);
  const blockchainActionId = hexToAscii(blockchainActionIdHex);

  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);
  const wallet = await Wallet.findOne({userId});

  if (!blockchainAction || blockchainAction.isCompleted() || !wallet) {
    return;
  }

  blockchainAction.status = blockchainActionStatuses.complete;

  await wallet.save();
  await blockchainAction.handleBlockchainResponse(false, eventObj);
}
