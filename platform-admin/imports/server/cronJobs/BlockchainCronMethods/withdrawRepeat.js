import moment from "moment";
import {tokenPrecision} from 'meteor/populous:constants';
import { Wallet, BlockchainAction, Currency, blockcahinVersionHelpers } from 'meteor/populous:api';
import ethConnect from 'meteor/populous:eth-connect';
import {
  blockchainActionTypes,
  blockchainActionStatuses,
} from 'meteor/populous:constants';

import connectInstance from "../../ethConnect/connectInstance";
export default async function withdrawRepeat(blockchainAction, nonce) {

  const {
    config: {
      network: { ropsten },
      contract: { populous, populousToken, ERC1155, PXTToken, USDCToken, TUSDToken },
    },
    contracts: { populous: { withdrawERC20, withdrawPoken, }, ERC1155: { safeTransferFrom } }
  } = ethConnect;

  const { title, userId, _id, to, amount, feeAmount: feeAmountDb } = blockchainAction;

  const userWallet = await Wallet.findOne({ userId });
  const inCollateral = await userWallet.getInCollateral();
  const adminExternalWallet = process.env.ADMIN_EXTERNAL_WALLET;

  const feeAmount = feeAmountDb;
  
  switch (title) {
    case "PPT":
      await withdrawERC20(connectInstance, populous, { nonce, from: ropsten.ethAddress },
        _id, populousToken.address, userId,
        to, amount * tokenPrecision.PopulousToken, inCollateral, feeAmount, adminExternalWallet);
      break;
    case "GBP":
      if (blockchainAction.data !== undefined
        && blockchainAction.data.type == "exchange" &&
        blockchainAction.data.currency == "USD") {
    
          console.log("withdraw USDC amount: ", amount)
          //withdraw usdc
          await withdrawPoken(connectInstance, populous, { nonce, from: ropsten.ethAddress },
            _id, title, (typeof amount === 'number' ? amount : amount.total), blockchainAction.data.amount,
            userWallet.address, to || adminExternalWallet, userId, inCollateral,
            feeAmount, adminExternalWallet
          );
      } else {
        //withdraw GBP poken
        await withdrawPoken(connectInstance, populous, { nonce, from: ropsten.ethAddress },
          _id, title, (typeof amount === 'number' ? amount : amount.total), 0,
          userWallet.address, to || adminExternalWallet, userId, inCollateral,
          feeAmount, adminExternalWallet
        );
      }
      break;

    /*case "XAUp": //incomplete XAUp, needs to be tested
      const depositAddress = await Wallet.findOne({ userId }).address;
      await safeTransferFrom(connectInstance, ERC1155, { from: depositAddress, xaup_id: 1, to, amount });
      break;
      */

    case "PXT":
      await withdrawERC20(connectInstance, populous, { nonce, from: ropsten.ethAddress },
        _id, PXTToken.address, userId,
        to, amount * tokenPrecision.PXTToken, 0, feeAmount, adminExternalWallet);
      break;

    case "USDC":
      await withdrawERC20(connectInstance, populous, { nonce, from: ropsten.ethAddress },
        _id, USDCToken.address, userId,
        to, amount * tokenPrecision.USDCToken, 0, feeAmount, adminExternalWallet);
      break;

    case "TUSD":
      await withdrawERC20(connectInstance, populous, { nonce, from: ropsten.ethAddress },
        _id, TUSDToken.address, userId,
        to,   await connectInstance.utils.toWei(amount.toString(), 'ether'), 0, feeAmount, adminExternalWallet); 
      break;

  }

  return true;
}
