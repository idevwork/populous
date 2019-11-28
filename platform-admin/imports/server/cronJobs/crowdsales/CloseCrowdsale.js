import {Meteor} from 'meteor/meteor';
import {User} from 'meteor/populous:api';
import {Crowdsale, Invoice, Bid, LedgerBalance} from 'meteor/populous:api';
import {crowdsaleStatuses, invoiceStatuses, populousEvents} from 'meteor/populous:constants';
import moment from 'moment';

const closeCrowdsale = async() => {
  const crowdsales = Crowdsale.find({
    status: crowdsaleStatuses.open,
    closeAt: {$lte: new Date()},
  }).fetch();

  if (crowdsales.length) {
    crowdsales.forEach((crowdsale) => {
      const invoice = Invoice.findOne({
        _id: crowdsale.invoiceId,
      });

      const bids = Bid.find({
        invoiceId: invoice._id,
      }).fetch();

      if (invoice.status === invoiceStatuses.auctionOpen) {
        invoice.status = invoiceStatuses.auctionClosed;
        invoice.save();

        if (bids.length) {
          // Create notification (closedAuction)
          bids.forEach((bid) => {
            if (bid.names.isGroup) {
              bid.bidders.forEach(({userId}) => {
                Meteor.call('emit.event', populousEvents.closedAuction, {invoice, userId});
              });
            } else {
              Meteor.call('emit.event', populousEvents.closedAuction, {invoice, userId: bid.userId});
            }
          });
        }
        Meteor.call('emit.event', populousEvents.closedAuction, {invoice, userId: invoice.borrowerId});
      }

      const winnerBid = Bid.findOne({
        crowdsaleId: crowdsale._id,
        sortAmount: {$gte: invoice.salePrice}
      });

      if (!winnerBid) {
        // after 5 hours of the crowdsale closing (i.e. 24+5)
        const currentDate = moment().utc();
        const closeCrowdsale = moment(crowdsale.closeAt).add(5, 'hours');

        if (currentDate.isAfter(closeCrowdsale)) {
          // close crowdsale and return amount to investors
          bids.forEach((bid)=> {
            const {names, bidders, userId, amount} = bid;
            if (names.isGroup) {

              // Group:
              bidders.forEach(({userId, amount}) => {
                const balance = LedgerBalance.findOne({
                  userId: userId,
                  currency: invoice.currency,
                });

                balance.amount += amount;
                balance.save();

                Meteor.call('emit.event', populousEvents.canceledAuction, {invoice, userId});
              });

            } else {
              // Individual:
              const balance = LedgerBalance.findOne({
                userId: userId,
                currency: invoice.currency,
              });

              balance.amount += amount;
              balance.save();

              Meteor.call('emit.event', populousEvents.canceledAuction, {invoice, userId: bid.userId});
            }

            bid.isReturned = true;
            bid.save();
          });

          crowdsale.status = crowdsaleStatuses.closed;
          invoice.status = invoiceStatuses.auctionFailed;
          crowdsale.save();
          invoice.save();

          Meteor.call('emit.event', populousEvents.canceledAuction, {invoice, userId: invoice.borrowerId});
        }
      }
    })
  }
};

export default closeCrowdsale;
