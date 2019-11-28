import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Invoice, Crowdsale, EthId, User, Debtor } from 'meteor/populous:api';
import { invoiceStatuses, countries } from 'meteor/populous:constants';
import moment from "moment";

import Invoices from '../components/Invoices';
import {SET_KEYWORD_FILTER, SET_STATUS_FILTER, SET_DUE_FILTER, TOGGLE_SORT_FILTER, sortableFields,} from '../modules';

// Subscribe to the meteor db and pass the invoices
// to the component.
// NOTE: This is not pushing the data into redux

const reduxData = connect(
  ({ invoicesList }) => ({
    ...invoicesList,
  }),
  dispatch => ({
    onStatusChange: (status) => dispatch({ type: SET_STATUS_FILTER, payload:status }),
    onKeywordChange: (keyword) => dispatch({ type: SET_KEYWORD_FILTER, payload: keyword }),
    onDueChange: (due) => dispatch({ type: SET_DUE_FILTER, payload: due }),
    onSortOrderChange: (field) => dispatch({ type: TOGGLE_SORT_FILTER, payload: field }),
  })
);

const meteorData = withTracker(({filters, sortField, sortOrder}) => {
  let filter = {$and : [{}]};
  let invoices = [];

  if (filters.status && filters.status !== 'all') {
    filter['$and'].push( { $and : [{ status: invoiceStatuses[filters.status] }]});
  }

  if (filters.due && filters.due !== 'all') {
    if (filters.due === 'today') {
      filter['$and'].push( { $and : [
        {dueDate: {
          $gte: moment.utc().startOf('day').toDate(),
          $lte: moment.utc().endOf('day').toDate()}
        }
      ]});
    } else if (filters.due === 'week') {
      filter['$and'].push( { $and : [{
        dueDate: {
          $gte: moment.utc().startOf('week').toDate(),
          $lte: moment.utc().endOf('week').toDate()
        },
      }]});
    } else if (filters.due === 'month') {
      filter['$and'].push( { $and : [{
        dueDate: {
          $gte: moment.utc().startOf('month').toDate(),
          $lte: moment.utc().endOf('month').toDate()
        },
      }]});
    }
  }

  if (filters.keyword) {
    const fullTextRegExp = new RegExp('.*' + filters.keyword + '.*', 'i');
    const query = [
      { _id: fullTextRegExp },
      { invoiceNumber: fullTextRegExp },
      { crowdsaleAddress: fullTextRegExp },
      { ethAddress: fullTextRegExp },
      { amount: filters.keyword * 1 },
      { createdAt: fullTextRegExp }
    ];
    if (filters.status !== 'all' && filters.status !== null) {
      filter['$and'].push({'$or': query});
    }
    else {
      filter['$or'] = query;
    }
  }

  const handler = Meteor.subscribe('invoices.all');

  // Subscribe to the invoice data
  // When the subscription is ready, find the invoices
  if (handler.ready()) {
// Find all of the invoices
    invoices = Invoice.find(
      filter,
      {
        sort: {
          [sortField]: sortOrder,
        }
      }).fetch();
    for (let invoice of invoices) {
      const crowdsaleDocument = Crowdsale.findOne({invoiceId: invoice._id});
      const borrower = User.findOne({ _id: invoice.borrowerId});
      const debtor = Debtor.findOne({ _id: invoice.debtorId});
      if (borrower) {
        const country = countries.filter((country)=> country.key === borrower.country)[0];
        invoice.companyNumber = borrower.companyNumber;
        invoice.companyName = borrower.companyName;
        invoice.companyPhoneNumber = borrower.getPhoneNumber();
        invoice.companyCountry = country ? country.name : ('Deprecated ' +  borrower.country);
      }
      if (debtor) {
        invoice.debtorName = debtor.name;
        invoice.debtorNumber = debtor.companyNumber;
      }
      if (crowdsaleDocument) {
        invoice.crowdsaleId = crowdsaleDocument._id;
      }
      const ethId = EthId.findOne({userId: invoice.borrowerId});
      if (ethId) {
        invoice.ethAddress = ethId.ethId;
      }
    }
  }

  if(sortField === 'companyName'){
    invoices = invoices.sort((a, b) => (a[sortField] < b[sortField] ? -1 : 1)* sortOrder)
  }

  return {
    loading: !handler.ready(),
    invoices
  };
});

export default compose(reduxData, meteorData)(Invoices)
