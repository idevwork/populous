import { Meteor } from 'meteor/meteor';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Invoice, Crowdsale, Currency } from 'meteor/populous:api';
import { invoiceStatuses } from 'meteor/populous:constants';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import UserInvoices from "../components/UserInvoices";
import { transferFunds } from '../modules/actions';

const reduxData = connect(
  state => ({ ...state.userProfile }),
  (dispatch) => bindActionCreators({
    transferFunds
  }, dispatch)
);

const meteorData = withTracker(({userId}) => {
  const handleCurrencies = Meteor.subscribe('currencies');
  const borrowerInvoices = Meteor.subscribe('invoices.user', userId);
  const invoicesInfo = {
    open: 0,
    closed: 0,
    awaitingPayment: 0,
    overdue: 0,
    total: 0,
    principalDebt: 0,
    penalties: 0,
    totalDebt: 0,
  };

  let allInvoices = [],
      openedInvoices = [],
      closedInvoices = [],
      awaitingPaymentInvoices = [],
      overdueInvoices = [];

  let currencies = [];
  if (handleCurrencies.ready()) {
    currencies = Currency.find({isPending: false}).fetch();
  }

  if(borrowerInvoices.ready()){
    const invoicesResource = Invoice.find({borrowerId: userId});

    invoicesResource.forEach(invoice => {

      if (invoice.penaltyPrice) {
        invoicesInfo.penalties += invoice.penaltyPrice;
      }

      invoice.crowdsale = Crowdsale.findOne({invoiceId: invoice._id});

      if (invoice.status === invoiceStatuses.auctionOpen) {
        invoicesInfo.open++;
        openedInvoices.push(invoice);
      }
      if (invoice.status === invoiceStatuses.auctionClosed) {
        invoicesInfo.closed++;
        closedInvoices.push(invoice);
      }
      if (invoice.status === invoiceStatuses.repaymentPending) {
        invoicesInfo.awaitingPayment++;
        awaitingPaymentInvoices.push(invoice);
      }
      if (invoice.status === invoiceStatuses.repaymentPending && (moment().utc()).isAfter(invoice.dueDate)) {
        invoicesInfo.overdue++;
        overdueInvoices.push(invoice);
      }

      allInvoices.push(invoice);

      invoicesInfo.total++;

    });

  }

  return {
    invoicesInfo,
    allInvoices,
    openedInvoices,
    closedInvoices,
    awaitingPaymentInvoices,
    overdueInvoices,
    currencies
  };
});

export default compose(reduxData, meteorData)(UserInvoices);