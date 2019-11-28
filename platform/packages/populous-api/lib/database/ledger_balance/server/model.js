import {
  invoiceStatuses,
  depositLogTypes,
  blockchainActionTypes,
  blockchainActionStatuses,
  ledgerActionsTypes,
  requestTypes
} from 'meteor/populous:constants';

import LedgerBalance from "../model";
import Bid from "../../bid/model";
import Invoice from "../../invoices/model";
import roundNumber from "../../helpers/roundNumber";
import DepositLog from "../../deposit_log/model";
import LedgerLog from "../../ledger_log/model";
import Request from "../../requests/model";
import User from "../../accounts/model";
import BlockchainAction from "../../blockchainAction/model";

LedgerBalance.extend({

  meteorMethods: {
    getBalance(shouldSave = true) {
      const userId = this.userId
      let activeLogs = new DepositLog().getAllActiveLogsNotReturned(userId);
      let amount = 0;
      let totalPrinciple = 0;
      let totalBid = 0;

      if (activeLogs && activeLogs.length > 0) {
        activeLogs.forEach((activeLog) => {
          if (activeLog.fromCurrency === depositLogTypes.PPT) {
            amount += activeLog.toValue
          } else if (activeLog.fromCurrency === depositLogTypes.USDC) {
            if (!activeLog.isPending) { // ledgerLog isPending = false is equal with blockchain status complete
              amount += activeLog.toValue
            }
          }
        });
      }

      let pendingInvoices = Invoice.find(
        { status: invoiceStatuses.repaymentPending, currency: this.currency },
        { _id: 1, repayedPrice: 1, salePrice: 1 }
      ).fetch();
      let pendingInvoiceIds = pendingInvoices.map(invoice => invoice._id);

      let openInvoiceIds = Invoice.find(
        { status: invoiceStatuses.auctionOpen, currency: this.currency },
        { _id: 1 }
      ).fetch().map(invoice => invoice._id);

      let totalBidAmount = 0;
      Bid.find({
        isWinner: true,
        invoiceId: { $in: pendingInvoiceIds },
        $or: [
          { userId },
          { bidders: { $elemMatch: { userId } } },
        ]
      }).map(bid => {
        const invoice = pendingInvoices.find(pendingInvoice => pendingInvoice._id === bid.invoiceId)
        let bidAmount = 0
        if (bid.isGroup()) {
          bid["bidders"].map(userBid => {
            if (userBid.userId == userId) {
              bidAmount = userBid.amount;
            }
          })
        } else {
          bidAmount = bid.amount;
        }
        totalBidAmount += bidAmount;
        if (invoice) {
          const transferAmount = invoice.repayedPrice > invoice.salePrice ? invoice.salePrice : invoice.repayedPrice
          const principle = roundNumber(bidAmount * (transferAmount / invoice.salePrice));
          totalPrinciple += principle
        }
      });
      Bid.find({
        invoiceId: { $in: openInvoiceIds },
        $or: [
          { userId },
          { bidders: { $elemMatch: { userId } } },
        ]
      }).map(bid => {
        if (bid.isGroup()) {
          bid["bidders"].map(userBid => {
            if (userBid.userId == userId) {
              totalBidAmount += userBid.amount;
            }
          })
        } else {
          totalBidAmount += bid.amount;
        }
      });

      this.amount = amount;
      let withdrawable = this.getWithdrawableAmount()
      if (shouldSave) {
        this.withdrawable = withdrawable;
        this.totalBidAmount = totalBidAmount;
        this.totalPrinciple = totalPrinciple;
        this.save();
      }
      return { amount, withdrawable, inEscrow: totalBidAmount - totalPrinciple, available: amount + totalPrinciple - totalBidAmount }
    },

    getWithdrawableAmount() {
      const user = User.findOne(this.userId)
      if (!user) {
        return 0;
      }
      let withdrawable = this.interestAmount;
      if (user.isInvestor()) {
        withdrawable += this.externalWalletAmount;

        // subtract previous pending poken withdraw BA
        withdrawable -= BlockchainAction
          .find({
            userId: user._id,
            type: blockchainActionTypes.withdraw,
            title: this.currency,
          })
          .fetch()
          .reduce((a, b) => {
            if (typeof b.amount === 'object') {
              let result = a;

              if (b.status === blockchainActionStatuses.pending) {
                result += Number(b.amount.externalInterest);
              }

              return (result + Number(b.amount.internalInterest));
            }

            return (a + Number(b.amount));
          }, 0);
      } else {
        withdrawable += this.amount;

        const requests = Request
          .find({
            userId: user._id,
            type: requestTypes.withdraw,
            isComplete: false,
          }).fetch();

        // subtract previous pending poken withdraw request
        withdrawable -= LedgerLog.find({
          fromUserId: user._id,
          type: ledgerActionsTypes.withdraw,
          fromCurrency: this.currency,
          dataId: { '$in': requests.map(request => request._id) },
        })
          .fetch()
          .reduce((previousValue, logDoc) => (previousValue + Number(logDoc.toValue)), 0);
      }
      return withdrawable;
    },
    async updateWithdrawableAmount() {
      this.withdrawableAmount = await this.getWithdrawableAmount();
      this.save();
    }
  }
});
