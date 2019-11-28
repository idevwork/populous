import {Meteor} from 'meteor/meteor';
import {
  platformActionTypes,
} from 'meteor/populous:constants';
import Bid from "../model";
import LedgerBalance from '../../ledger_balance/model';
import Invoice from "../../invoices/model";
import Wallet from "../../wallet/model";
import Crowdsale from "../../crowdsale/model";
import roundNumber from "../../helpers/roundNumber";
import PlatformAction from "../../platformActions/model";

Bid.extend({
  meteorMethods:{
    joinOrEditGroupBid(amountStr, isAnonymous){
      if(!this.isGroup()){
        throw new Meteor.Error(400, 'Join available only for group bids');
      }

      const currentUserId = Meteor.userId();
      const amount = roundNumber(amountStr);
      const sumOfBids = this.getRaisedBidAmount();

      if(!currentUserId){
        throw new Meteor.Error(403, 'Access forbidden');
      }

      if((sumOfBids + amount) > this.amount){
        throw new Meteor.Error(400, 'Shared amount above available of this bid');
      }

      const invoice = Invoice.findOne({
        _id: this.invoiceId,
      });

      const crowdsale = Crowdsale.findOne({
        invoiceId: this.invoiceId
      });

      if(!invoice || !crowdsale){
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const balance = LedgerBalance.findOne({
        userId: currentUserId,
        currency: invoice.currency,
      });

      const availableBalance = parseFloat(balance.getBalance().available.toFixed(2));

      if (!balance || availableBalance < amount) {
        throw new Meteor.Error(400, 'The amount must not exceed the existing balance');
      }

      const bidderWallet = Wallet.findOne({userId: currentUserId});
      if(!bidderWallet) {
        throw new Meteor.Error(400, "You don't have a wallet");
      }

      PlatformAction.insert({
        type: platformActionTypes.placeBid,
        data: {
          userId: currentUserId,
          bidId: this._id,
          amount: amount,
          isAnonymous: isAnonymous
        }
      });
    },

    increaseIndividualBid(amountStr){
      const currentUserId = Meteor.userId();
      const amount = roundNumber(amountStr);

      if(currentUserId !== this.userId){
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const invoice = Invoice.findOne({
        _id: this.invoiceId,
      });

      const crowdsale = Crowdsale.findOne({
        invoiceId: this.invoiceId
      });

      if(!invoice || !crowdsale){
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const bidderWallet = Wallet.findOne({userId: currentUserId});
      if(!bidderWallet) {
        throw new Meteor.Error(400, "You don't have a wallet");
      }

      const balance = LedgerBalance.findOne({
        userId: currentUserId,
        currency: invoice.currency,
      });

      const availableBalance = parseFloat(balance.getBalance().available.toFixed(2));

      if (!balance || availableBalance < amount) {
        throw new Meteor.Error(400, 'The amount must not exceed the existing balance');
      }

      PlatformAction.insert({
        type: platformActionTypes.placeBid,
        data: {
          userId: currentUserId,
          bidId: this._id,
          amount: amount
        }
      });
    }
  }
});
