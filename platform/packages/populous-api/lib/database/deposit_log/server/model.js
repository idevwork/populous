import { Meteor } from 'meteor/meteor';
import {
  ledgerActionsTypes,
  requestTypes,
  populousEvents,
  platformActionTypes,
  platformActionStatuses,
  depositLogTypes,
  blockchainActionTypes,
  blockchainActionStatuses
} from 'meteor/populous:constants';
import { Config, configKeys } from 'meteor/populous:config';

import DepositLog from "../model";
import checkAuth from "../../helpers/checkAuth";
import LedgerBalance from "../../ledger_balance/model";
import LedgerLog from "../../ledger_log/model";
import Wallet from "../../wallet/model";
import BlockchainAction from "../../blockchainAction/model";
import PopulousEmitter from "../../../server/PopulousEmitter";
import PlatformAction from "../../platformActions/model";


DepositLog.extend({
  meteorMethods: {
    async returnDeposit() {
      // PPT/USDC refund
      const userId = checkAuth();
      const notEnoughBalanceException = new Meteor.Error(400, `You cannot release these ${this.type || 'PPT'} at this time, select another batch`);

      if(this.returned) {
        throw new Meteor.Error(400, 'Deposit already returned');
      }
      const relatedLedgerLog = await LedgerLog.findOne({
        type: ledgerActionsTypes.deposit,
        dataId: this._id,
      });

      const userCurrencyLedger = await LedgerBalance.findOne({ userId, currency: relatedLedgerLog.toCurrency });
      const ledgerLogToValue = parseFloat(relatedLedgerLog.toValue.toFixed(2));
      const userCurrencyAmount = parseFloat(userCurrencyLedger.getBalance().available.toFixed(2));

      if (ledgerLogToValue > userCurrencyAmount) {
        throw notEnoughBalanceException;
      }

      const userWallet = Wallet.findOne({ userId });

      if (!userWallet) {
        throw new Meteor.Error(500, 'Oops! Something goes wrong');
      }

      if (this.type === depositLogTypes.PPT) {
        const existingRefund = PlatformAction.findOne({
          type: platformActionTypes.GBPptoPPT,
          'data.depositLogId': this._id
        })
        if (existingRefund) {
          throw new Meteor.Error(400, 'Refund is already in progress')
        }
        PlatformAction.insert({
          type: platformActionTypes.GBPptoPPT,
          status: platformActionStatuses.new,
          data: {
            depositLogId: this._id,
          }
        });
      } else {
        if (relatedLedgerLog.isPending) {
          throw new Meteor.Error(400, 'You can not refund pending transaction')
        }
        const existingRefund = BlockchainAction.findOne({
          userId,
          type: blockchainActionTypes.usdpToUsdc,
          'data.depositLogId': this._id
        })
        if (existingRefund) {
          throw new Meteor.Error(400, 'Refund is already in progress')
        }
        const blockchainAction = new BlockchainAction({
          userId,
          type: blockchainActionTypes.usdpToUsdc,
          amount: relatedLedgerLog.fromValue,
          status: blockchainActionStatuses.pending,
          data: { depositLogId: this._id },
          version: userWallet.version,
        });

        await blockchainAction.save();
      }

      // The rest of the logic is ported to "platformActions/server/processingMethods/refundPPT.js"
    },
    async getAllActiveLogsNotReturned(userId){
      const depositLogIds = await DepositLog
        .find({
          userId,
          returned: false,
        })
        .map(({logId}) => logId);

      return LedgerLog.find({
        type: ledgerActionsTypes.deposit,
        _id:{$in: depositLogIds}
      }).fetch();
    },
  }
});
