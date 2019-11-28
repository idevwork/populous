import {
  blockchainActionTypes,
  blockchainActionStatuses,
  ledgerActionsTypes,
  userProviderStatuses,
} from 'meteor/populous:constants';
import {
  BlockchainAction,
  Wallet
} from 'meteor/populous:api';
import {hexToAscii} from "../../helpers";

export default async function EventDepositAddressUpgradeHandler (eventObj){
  const {
    returnValues: {
      blockchainActionId: blockchainActionIdHex,
      clientId: userIdHex,
      version: version,
      newDepositContract: newDepositContract
    },
    returnValues,
  } = eventObj;

  const userId = hexToAscii(userIdHex);
  const blockchainActionId = hexToAscii(blockchainActionIdHex);

  if (!userId) {
    return;
  }

  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);

  if (!blockchainAction || blockchainAction.isCompleted()) {
    return;
  }
  const wallet = await Wallet.findOne({userId});
  wallet.version = parseInt(version, 10);
  wallet.address = newDepositContract;

  await wallet.save();
  await blockchainAction.handleBlockchainResponse(false, eventObj);
}
