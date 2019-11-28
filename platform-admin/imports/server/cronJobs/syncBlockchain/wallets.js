import { Meteor } from 'meteor/meteor';
import { Wallet, User, LedgerBalance } from 'meteor/populous:api';
import { Config, configKeys } from 'meteor/populous:config';
import connectInstance from '../../ethConnect/connectInstance';
//import PopulousEmitter from "../../../server/PopulousEmitter";
import ethConnect from 'meteor/populous:eth-connect';
import {
  userRoles,
  populousEvents,
  tokenPrecision
} from 'meteor/populous:constants';

const {
  config: {
    network: { ropsten },
    contract: { populousToken, ERC1155 },
  },
  contracts: { populousToken: { balanceOf }, currencyToken: { balanceOfForEth }, ERC1155: { balanceOf: balanceOfXAUp },
    PXTToken: { balanceOfForPXT }, TUSDToken: { balanceOfForTUSD }, USDCToken: { balanceOfForUSDC }, GBPPToken: { balanceOfForGBP }
  },
} = ethConnect;

const syncWallets = async () => {
  // Find users who logged in within 48 hours
  try {
    let today = new Date()
    let twodaysEarlier = new Date(today.getTime() - (168 * 60 * 60 * 1000)); // 168 hours before
    let users = User.find({ "status.lastLogin.date": { $gte: twodaysEarlier }, role: userRoles.investor }, { _id: 1 }).fetch()
    let userIds = users.map(user => user._id)
    let wallets = Wallet.find({ userId: { $in: userIds }, address: { $exists: true } }).fetch()
    for (i = 0; i < wallets.length; i++) {
      //pause for 0.5 second for each request
      // NEED TO HANDLE IT DIFFERENTLY
      try {
        let wallet = wallets[i]
        await wallet.getBalance()
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true)
          }, 500);
        })
      } catch (error) {
        // This try/catch is to prevent, other wallets not get updated due to errors in previous wallet
      }
    }

    //SYNC ADMIN USDC & XAUp balance in config
    let ETH_ADDRESS = process.env.ETH_ADDRESS,
      xaupSeries = process.env.XAUP_TOKENID,
      signerUSDC = (await balanceOfForUSDC(ETH_ADDRESS)) / tokenPrecision.USDCToken,
      signerXAUp = Number(await balanceOfXAUp(connectInstance, ERC1155, { XAUP_TOKENID: xaupSeries, address: ETH_ADDRESS }));


    const blockchainConfig = Config.findOne({ key: configKeys.blockchain })
    if (blockchainConfig) {
      blockchainConfig.value.signerUSDC = signerUSDC;
      blockchainConfig.value.signerXAUp = signerXAUp;

      blockchainConfig.save();
     // console.log(blockchainConfig)
    }
  } catch (error) {
    console.error('Error', error)
  }
}

export default syncWallets;