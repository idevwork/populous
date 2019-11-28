import React from 'react';
import {Meteor} from 'meteor/meteor';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {
  invoiceStatuses,
  ledgerActionsTypes,
  crowdsaleStatuses,
  blockchainActionTypes,
  blockchainActionStatuses
} from 'meteor/populous:constants';
import {withTracker} from 'meteor/react-meteor-data';
import moment from 'moment';
import floor from "../../../../helpers/formatters/floor";
import {
  Wallet as WalletApi,
  Currency,
  Bid,
  Invoice,
  LedgerBalance,
  LedgerLog,
  DepositLog,
  BlockchainAction
} from 'meteor/populous:api';

import {
  updateFilters,
  resetFilters,
} from '../modules/actions';

import WalletPane from "../components/WalletPane";

const reduxData = connect(
  state => ({...state.userProfile}),
  dispatch => ({
    updateFilters: (filter) => dispatch(updateFilters(filter)),
    resetFilters: () => dispatch(resetFilters()),
  })
);

const meteorData = withTracker(({userId, transactionHistoryFilters: filters}) => {

  const wallet = WalletApi.findOne({userId: userId});
  const userBalance = Meteor.subscribe('ledger_balance', userId);
  const userBlockchainAction = Meteor.subscribe('blockchainAction.user', userId);

  const query = {
    type: {
      $in: [
        ledgerActionsTypes.exchange,
        ledgerActionsTypes.deposit,
        ledgerActionsTypes.withdraw,
        ledgerActionsTypes.crowdsale,
      ]
    }, '$and': []
  };
  const depositLedgerLogs = new DepositLog().getAllActiveLogs(userId);
  const invoicesSubscription = Meteor.subscribe('invoices.investor', userId);
  const formatLogDescription = (log) => {
    switch (log.type) {
      //case ledgerActionsTypes.repayment:
      //  return `Invoice ${log.dataId} is repaid`;
      case ledgerActionsTypes.withdraw:
        return `${floor(log.fromValue)} ${floor(log.fromCurrency)}p to bank account`;
      case ledgerActionsTypes.crowdsale:
        return `Invoice ${log.invoiceId} is repaid`;
      case ledgerActionsTypes.exchange:
        return `${floor(log.fromValue)} ${log.fromCurrency}p to ${floor(log.toValue)} ${log.toCurrency}p`;
      case ledgerActionsTypes.deposit:
        return `${floor(log.fromValue)} ${log.fromCurrency}p from external wallet`;
      default:
        return `${floor(log.fromValue)} ${log.fromCurrency}p to ${floor(log.toValue)} ${log.toCurrency}p`;
    }
  };

  let pokens = [];
  let pptAdnPxt = [];
  let xaupAdnEth = [];
  let transactionHistory = [];
  let reservedBalance = {};
  let xaupBlockchainActions = [];

  if (invoicesSubscription.ready()) {
    let invoiceIdToCurrency = {};

    Invoice.find({
      status: {
        $in: [
          invoiceStatuses.auctionOpen,
        ]
      }
    }).forEach((invoice) => {
      invoiceIdToCurrency[invoice._id] = invoice.currency;
    });

    const userBids = Bid.find({
      $and: [
        {invoiceId: {$in: Object.keys(invoiceIdToCurrency)}},
        {
          $or: [
            {
              bidders: {$elemMatch: {userId: userId}}
            },
            {userId: userId}
          ]
        }]
    }).fetch();

    userBids.forEach(bid => {
      let bidAmount = bid.amount;
      if (bid.bidders.length) {
        bid.bidders.some(bidder => {
          if (bidder.userId === userId) {
            bidAmount = bidder.amount;
            return true;
          }
        });
      }

      if (reservedBalance[invoiceIdToCurrency[bid.invoiceId]] === undefined) {
        reservedBalance[invoiceIdToCurrency[bid.invoiceId]] = 0;
      }

      reservedBalance[invoiceIdToCurrency[bid.invoiceId]] += bidAmount;
    });
  }

  if (userBalance.ready()) {
    pokens = LedgerBalance.find({
      userId: userId,
    }).fetch().map(poken => ({
      currency: `${poken.currency}p`,
      available: floor(poken.amount),
      withdrawable: floor(poken.withdrawableAmount),
      reserved: floor(reservedBalance[poken.currency]),
    }));
  }

  if (userBlockchainAction.ready()) {
    xaupBlockchainActions = BlockchainAction.find({
      userId,
      type: blockchainActionTypes.exchangeXaup,
      status: blockchainActionStatuses.complete,
    }).fetch();
  }

  if (wallet) {
    pptAdnPxt.push({
      currency: "PPT",
      available: wallet.availableBalance,
      exchanged: wallet.balance - wallet.availableBalance,
      total: wallet.balance,
    }, {
      currency: "PXT",
      total: wallet.balancePXT || 0,
    });

    xaupAdnEth.push({
      currency: "XAUp",
      withdrawable: 0,
      total: wallet.balanceXAU || 0,
    }, {
      currency: "ETH",
      total: wallet.balanceETH || 0,
    })
  }

  if (userId) {
    let subquery = {};
    subquery['$or'] = [
      {fromUserId: userId},
      {toUserId: userId},
    ];
    query['$and'].push(subquery);

    if (filters.startDate && filters.endDate) {
      query.createdAt = {
        $gte: filters.startDate.startOf('day').toDate(),
        $lte: filters.endDate.endOf('day').toDate()
      };
    } else {
      if (filters.startDate) {
        query.createdAt = {$gte: filters.startDate.startOf('day').toDate()};
      } else if (filters.endDate) {
        query.createdAt = {$lte: filters.endDate.endOf('day').toDate()};
      }
    }

    if (filters.transactionType) {
      query.type = filters.transactionType;
    }
  }

  transactionHistory = LedgerLog.find(query, {
    sort: {createdAt: -1},
  }).fetch().map(log => {

    let details = log;

    if (log.type === ledgerActionsTypes.crowdsale) {
      const crowdsale = log.crowdsale();

      if (crowdsale) {
        const crowdsaleInvoice = Invoice.findOne(crowdsale.invoiceId);

        details = {
          _id: log._id,
          type: 'Invoice repayment',
          invoiceId: crowdsaleInvoice._id,
          fromValue: log.fromValue,
          toValue: log.toValue,
          fromCurrency: log.fromCurrency,
          toCurrency: log.toCurrency,
          penalty: crowdsaleInvoice.penaltyPrice,
          status: crowdsale.status === crowdsaleStatuses.closed ? 'completed' : crowdsale.status,
          ethereumAddress: log.fromUserAddress,
          buyerId: log.fromUserId,
        };
        log.invoiceId = crowdsaleInvoice._id;
      }
    }

    return {
      type: log.type === ledgerActionsTypes.crowdsale ? 'Invoice repayment' : log.type,
      description: formatLogDescription(log),
      logDetails: details,
      date: moment(log.createdAt).format('MM-DD-YYYY, h:mm:ss a'),
    }
  });

  if (filters.search) {
    transactionHistory = transactionHistory.filter(log => {
      return log.description.includes(filters.search)
    });
  }

  return {
    wallet,
    pokens,
    pptAdnPxt,
    xaupAdnEth,
    transactionHistory,
    depositLedgerLogs,
    xaupBlockchainActions
  };
});

export default compose(reduxData, meteorData)(WalletPane);
