import { populousEvents, platformActionStatuses } from "meteor/populous:constants";
import Wallet from "../../../wallet/model";
import LedgerBalance from "../../../ledger_balance/model";
import Invoice from "../../../invoices/model";
import Bid from "../../../bid/model";
import Crowdsale from "../../../crowdsale/model";
import User from '../../../accounts/model';
import roundNumber from "../../../helpers/roundNumber";
import PopulousEmitter from "../../../../server/PopulousEmitter";
import moment from 'moment';

const bidFromAdmin = async (invoice, userId, params = {
  groupName: undefined,
  goal: undefined,
  amount: undefined,
  isGroup: undefined,
  isAnonymous: undefined,
}) => {
  const user = await User.findOne(userId);

  if (!user) {
    throw new Meteor.Error(403, 'Access forbidden');
  }

  const crowdsale = await Crowdsale.findOne({
    invoiceId: invoice._id
  });

  if (!crowdsale) {
    throw new Meteor.Error(500, 'Internal server error');
  }

  const bidderWallet = Wallet.findOne({ userId: user._id });
  if (!bidderWallet) {
    throw new Meteor.Error(400, "You don't have a wallet");
  }

  if (await Bid.findOne({
    invoiceId: invoice._id,
    userId: user._id,
  })) {
    throw new Meteor.Error(403, "You are not able to place more than one bid");
  }

  params.names = {
    isGroup: !!params.isGroup,
    groupName: params.groupName || undefined,
  };

  params.amount = roundNumber(params.amount);

  const balance = LedgerBalance.findOne({
    userId: user._id,
    currency: invoice.currency,
  });

  const availableBalance = parseFloat(balance.getBalance().available.toFixed(2));

  if (!balance || availableBalance < params.amount) {
    throw new Meteor.Error(400, 'The amount must not exceed the existing balance');
  }

  if (params.isGroup) {
    const currentDate = moment().utc().toDate();

    params.bidders = [{
      userId: user._id,
      isAnonymous: params.isAnonymous,
      amount: params.amount,
      createdAt: currentDate,
      updatedAt: currentDate,
    }];

    balance.amount -= params.amount;

    params.amount = roundNumber(params.goal);
  } else {
    balance.amount = roundNumber(balance.amount - params.amount);
  }

  delete params.goal;
  delete params.isGroup;
  delete params.groupName;

  const bidDocument = new Bid({
    crowdsaleId: crowdsale._id,
    userId: user._id,
    invoiceId: invoice._id,
    ...params,
    isPending: false,
  });

  if (bidDocument.names.isGroup) {
    bidDocument.sortAmount = params.bidders[0].amount;
  } else {
    bidDocument.sortAmount = params.amount;
  }

  if (!bidDocument.save()) {
    throw new Meteor.Error(403, "We are not able to place bid");
  }

  balance.save();

  // Is winner:
  await invoice.updateReturnPercentage();
  if (bidDocument.sortAmount === bidDocument.amount && bidDocument.sortAmount === invoice.salePrice) {
    await crowdsale.closeAuctionsByWinnderBid(bidDocument, invoice);
  } else {
    // Create notification
    const bids = await Bid.find({ crowdsaleId: crowdsale._id, }, { sort: { sortAmount: -1 } }).fetch();

    if (bids.length > 1) {
      const isHighestBid = bids[0];
      const loserBid = bids[1];

      if (bidDocument._id === isHighestBid._id) {
        if (!loserBid.bidders.length) {
          const competitor = User.findOne(isHighestBid.userId);
          PopulousEmitter.emit(populousEvents.beatBid, invoice, loserBid.userId, false, isHighestBid.isAnonymous, competitor);
        } else {
          loserBid.bidders.forEach((bidder) => {
            PopulousEmitter.emit(populousEvents.beatBid, invoice, bidder.userId, true);
          });
        }
      }
    }
  }
  PopulousEmitter.emit(populousEvents.bidPlaced, { ...bidDocument }, { ...invoice })
}


const joinOrEditGroupBidFromAdmin = async (bid, currentUserId, amountStr, isAnonymous) => {
  if (!bid.isGroup()) {
    throw new Meteor.Error(400, 'Join available only for group bids');
  }

  if (!currentUserId) {
    throw new Meteor.Error(403, 'Access forbidden');
  }

  const amount = roundNumber(amountStr);
  const sumOfBids = bid.getRaisedBidAmount();

  if ((sumOfBids + amount) > bid.amount) {
    throw new Meteor.Error(400, 'Shared amount above available of this bid');
  }

  const isJoined = bid.isJoined(currentUserId);

  const currentDate = moment().utc().toDate();

  const invoice = Invoice.findOne({
    _id: bid.invoiceId,
  });

  const crowdsale = Crowdsale.findOne({
    invoiceId: bid.invoiceId
  });

  if (!invoice || !crowdsale) {
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

  const bidderWallet = Wallet.findOne({ userId: currentUserId });
  if (!bidderWallet) {
    throw new Meteor.Error(400, "You don't have a wallet");
  }
  let event;

  const query = { _id: bid._id };
  const updateObject = {};

  // We include the changes for both (class instance and direct mongo update)
  // for calculate sortAmount and other logic that works after document update in DB
  if (isJoined) {
    query['bidders.userId'] = currentUserId;

    bid.bidders = bid.bidders.map((bidder) => {
      if (bidder.userId !== currentUserId) {
        return bidder;
      }
      bidder.amount += amount;
      bidder.updatedAt = currentDate;
      updateObject.$set = {
        'bidders.$.amount': bidder.amount,
        'bidders.$.updatedAt': bidder.updatedAt
      };
      return bidder;
    });

    event = populousEvents.bidIncreased;
  } else {
    const newBidder = {
      userId: currentUserId,
      amount,
      isAnonymous,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    event = populousEvents.bidJoined;

    bid.bidders.push(newBidder);
    updateObject.$push = { bidders: newBidder };
  }

  const currentHighestBid = Bid.findOne({ crowdsaleId: crowdsale._id, }, { sort: { sortAmount: -1 } });

  balance.amount -= amount;
  bid.sortAmount = bid.calculateSortAmount();

  if (updateObject.$set) {
    updateObject.$set.sortAmount = bid.sortAmount;
  } else {
    updateObject.$set = { sortAmount: bid.sortAmount };
  }

  Bid.update(query, updateObject);
  balance.save();

  PopulousEmitter.emit(event, { ...bid }, currentUserId, amount);
  // Is winner:
  if (bid.sortAmount === bid.amount && bid.sortAmount === invoice.salePrice) {
    await crowdsale.closeAuctionsByWinnderBid(bid, invoice);
  } else if (bid._id !== currentHighestBid._id) {
    // Create notification
    const bids = Bid.find({ crowdsaleId: crowdsale._id, }, { sort: { sortAmount: -1 }, limit: 2 }).fetch();

    if (bids.length > 1) {
      const isHighestBid = bids[0];
      const loserBid = bids[1];

      if (bid._id === isHighestBid._id) {
        if (!loserBid.bidders.length) {
          PopulousEmitter.emit(populousEvents.beatBid, invoice, loserBid.userId, true);
        } else {
          loserBid.bidders.forEach((bidder) => {
            PopulousEmitter.emit(populousEvents.beatBid, invoice, bidder.userId, true);
          });
        }
      }
    }
  }
}

const increaseIndividualBidFromAdmin = async (bid, currentUserId, amountStr) => {
  const amount = roundNumber(amountStr);

  if (currentUserId !== bid.userId) {
    throw new Meteor.Error(403, 'Access forbidden');
  }

  const invoice = Invoice.findOne({
    _id: bid.invoiceId,
  });

  const crowdsale = Crowdsale.findOne({
    invoiceId: bid.invoiceId
  });

  if (!invoice || !crowdsale) {
    throw new Meteor.Error(403, 'Access forbidden');
  }

  const bidderWallet = Wallet.findOne({ userId: currentUserId });
  if (!bidderWallet) {
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

  const currentHighestBid = Bid.findOne({ crowdsaleId: crowdsale._id, }, { sort: { sortAmount: -1 } });

  balance.amount -= amount;
  bid.amount += amount;
  bid.sortAmount = bid.calculateSortAmount();
  Bid.update(
    { _id: bid._id },
    {
      $set: {
        amount: bid.amount,
        sortAmount: bid.sortAmount,
      }
    }
  );
  balance.save();

  // Is winner:

  PopulousEmitter.emit(populousEvents.bidIncreased, { ...bid }, currentUserId, amount);

  if (bid.sortAmount === bid.amount && bid.sortAmount === invoice.salePrice) {
    await crowdsale.closeAuctionsByWinnderBid(bid, invoice);
  } else if (bid._id !== currentHighestBid._id) {
    // Create notification
    const bids = Bid.find({ crowdsaleId: crowdsale._id, }, { sort: { sortAmount: -1 }, limit: 2 }).fetch();

    if (bids.length > 1) {
      const isHighestBid = bids[0];
      const loserBid = bids[1];

      if (bid._id === isHighestBid._id) {
        const competitor = User.findOne(isHighestBid.userId);

        if (!loserBid.bidders.length) {
          PopulousEmitter.emit(populousEvents.beatBid, invoice, loserBid.userId, false, isHighestBid.isAnonymous, competitor);
        } else {
          loserBid.bidders.forEach((bidder) => {
            PopulousEmitter.emit(populousEvents.beatBid, invoice, bidder.userId, false, isHighestBid.isAnonymous, competitor);
          });
        }
      }
    }
  }
}

const placeBid = async (action) => {
  const { data } = action
  const { bidId } = data

  // bidId not null means, the user wants to do something to existing bid.
  // This means, we should follow joinOrEditGroupBid or increaseIndividualBid
  // if bidId is null, then user wants to create a new bid

  // CHECK IF THE USER HAS EVER BID ON THIS INVOICE BEFORE
  // We need to check if user is belong to group bid or created his own bid before


  /**
 * case 1 - If the user has never bid on this invoice before, then this would be his first ever bid. From this case,
 * we would follow this implementation: packages/populous-api/lib/database/invoices/server/model.js FROM line 266
 *
 * case 2 - If the user has bid on a this invoice before, if his bid is part of a group bid, then we would follow this case: "joinOrEditGroupBid" —
 * packages/populous-api/lib/database/bid/server/model.js FROM line 17 to 140
 *
 * case 3 - If the user has bid on this invoice before, if his bid is an individual bid, then we would follow this case: "increaseIndividualBid" —
 * packages/populous-api/lib/database/bid/server/model.js FROM line 142 to 220
 *
 *
 * For each case, could you leave a comment for when case 1, 2, 3 begins as a title before the code
 * */

  if (bidId) {
    const prevBid = Bid.findOne({
      _id: bidId
    });
    const { userId, amount, isAnonymous } = data
    if (prevBid.isGroup()) {
      await joinOrEditGroupBidFromAdmin(prevBid, userId, amount, isAnonymous)
    } else {
      await increaseIndividualBidFromAdmin(prevBid, userId, amount)
    }
  } else {
    const { userId, amount, isAnonymous, invoiceId, groupName, goal, isGroup } = data

    const invoice = Invoice.findOne({
      _id: invoiceId,
    });
    await bidFromAdmin(invoice, userId, {
      groupName,
      goal,
      amount,
      isGroup,
      isAnonymous,
    })
  }
  action.status = platformActionStatuses.completed;
  await action.save()
}

export default placeBid;
