import {
  blockchainActionTypes,
  blockchainActionStatuses,
  ledgerActionsTypes,
  userProviderStatuses,
  tokenPrecision
} from 'meteor/populous:constants';
import { BlockchainAction, Wallet } from 'meteor/populous:api';
import ethConnect from 'meteor/populous:eth-connect';


import { hexToAscii } from "../../helpers";

const {
  contracts: { pptMultiplier },
} = ethConnect;

let tokenAddresses = process.env.tokenAddresses ||
  Object.assign({}, {
    PXTToken: process.env.PXTToken,
    USDCToken: process.env.USDCToken,
    TUSDToken: process.env.TUSDToken,
    XAUToken: process.env.TUSDToken,
    XAUToken: process.env.XAUToken,
    GBPpToken: process.env.GBPpToken
  });


export default async function EventExchangeXAUpHandler(eventObj) {




  const {
    returnValues: {
      _blockchainActionId: blockchainActionIdHex,
      _clientId: userIdHex,
      xaup_amount, erc20_tokenAddress, erc20_amount,
      _tokenId: tokenId
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

  const xaupAmountInt = Number.parseInt(xaup_amount);
  const wallet = await Wallet.findOne({ userId });

  if (erc20_tokenAddress === tokenAddresses.USDCToken) {
    wallet.balanceUSDC -= (Number.parseInt(erc20_amount) / tokenPrecision.USDCToken);
  }

  if (erc20_tokenAddress === tokenAddresses.TUSDToken) {
    wallet.balanceTUSD -= (Number.parseInt(erc20_amount) / tokenPrecision.TUSDToken);
  }


  let XAUseries = new Map();
  wallet.balanceXAU.map(item => {
    XAUseries.set(item.xaup_id, Number(item.amount))
  });

  
  if (XAUseries.get(Number(tokenId))) {
    XAUseries.set(Number(tokenId), XAUseries.get(Number(tokenId)) + Number(xaupAmountInt));
  } else {
    XAUseries.set(Number(tokenId), Number(xaupAmountInt));
  }

  wallet.balanceXAU = [];
  for (const key of XAUseries.keys()) {
    wallet.balanceXAU.push({ xaup_id: key, amount: XAUseries.get(key) });
  }

  wallet.save();
  await blockchainAction.handleBlockchainResponse(false, eventObj);
}
