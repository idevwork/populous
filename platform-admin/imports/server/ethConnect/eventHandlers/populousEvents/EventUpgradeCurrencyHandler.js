import {
  blockchainActionTypes,
  blockchainActionStatuses,
  ledgerActionsTypes,
  userProviderStatuses,
} from 'meteor/populous:constants';
import {
  BlockchainAction,
  Currency,
} from 'meteor/populous:api';

import {hexToAscii} from "../../helpers";

export default async function EventUpgradeCurrencyHandler (eventObj){
  const {
    returnValues: {
      blockchainActionId: blockchainActionIdHex,
      tokenSymbol: tokenSymbolHex,
      version,
    }
  } = eventObj;

  const tokenSymbol = hexToAscii(tokenSymbolHex);
  const blockchainActionId = hexToAscii(blockchainActionIdHex);

  const blockchainAction = await BlockchainAction.findOne(blockchainActionId);
  const currency = await Currency.findOne({symbol: tokenSymbol});

  if (!blockchainAction || blockchainAction.isCompleted() || !currency) {
    return;
  }

  currency.version = Number.parseInt(version);

  await currency.save();
  await blockchainAction.handleBlockchainResponse(false, eventObj);
}
