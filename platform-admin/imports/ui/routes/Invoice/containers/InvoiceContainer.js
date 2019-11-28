import { Meteor } from 'meteor/meteor';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import {
  Invoice as InvoiceAPI, Currency, Crowdsale, Bid,
  User, File, Debtor, PlatformAction
} from 'meteor/populous:api';
import {
  invoiceDocumentTypes,
  platformActionTypes,  platformActionStatuses, invoiceStatuses,
} from 'meteor/populous:constants';

import Invoice from '../components/Invoice';
import {
  sendEmail, deleteInvoice, updateInvoiceField, updateDebtorName, verifyDebtor, reorderDocuments,
  getSignedContract, saveDecision, closeAuction, redirectToActivityLogs,
  restartAuction, uploadContract,
  forceInsert, checkIsForceInsertPossible, markAsPaidOrNot
} from '../modules/actions';
import requireConfirmation from '../../../components/ConfirmModal/modules/actions';
import {setForcePossible} from "../modules/actions/checkIsForceInsertPossible";

const reduxData = connect(
  state => ({ ...state.app, ...state.invoiceDetail, }),
  dispatch => ({
    saveAcceptDecision: (invoice) => dispatch(
      requireConfirmation(saveDecision, {
        text: `Are you sure you want to accept Auction?`
      })(invoice, true)
    ),
    ...bindActionCreators({
      reorderDocuments,
      redirectToActivityLogs,
      verifyDebtor,
      updateDebtorName,
      updateInvoiceField,
      saveDecision,
      sendEmail,
      deleteInvoice,
      setForcePossible,
      getSignedContract, closeAuction,
      restartAuction, uploadContract,
      forceInsert, checkIsForceInsertPossible,
      markAsPaidOrNot
    }, dispatch),
  })
);

// Subscribe to the meteor db and init the store
const meteorData = withTracker((props) => {
  const {
    match: { params: { invoiceId } },
  } = props;
  let invoice = null;
  let crowdsale = null;
  const documents = {};

  // Make sure the data for the current invoice is available
  const invoiceSubscription = Meteor.subscribe('invoices.id', invoiceId);
  const platformActionQuery = {
    type: platformActionTypes.startAuction,
    status: {$ne: platformActionStatuses.completed},
    'data.invoiceId': invoiceId,
  };

  const platformActionsHandler = Meteor.subscribe('platformActions.all', platformActionQuery);

  // If the data is ready, init the state with the invoice data
  if (invoiceSubscription.ready() && platformActionsHandler.ready()) {
    let invoice = InvoiceAPI.findOne(invoiceId);
    const currencies = Currency.find({ $and: [{isPending: false}] }).fetch();
    if (invoice) {
      invoice.bids = Bid.find({ invoiceId: invoiceId }).fetch() || [];
      invoice.borrower = User.findOne({ _id: invoice.borrowerId });
      const bidUsers = invoice.getParticipants(invoice.bids);
      crowdsale = Crowdsale.findOne({ invoiceId: invoiceId });
      invoice.debtor = Debtor.findOne(invoice.debtorId) || {};
      invoice.seller = Debtor.findOne(invoice.sellerId) || {};
      const startPending = PlatformAction.findOne(platformActionQuery);

      if (invoice.debtor._id) {
        if (!invoice.debtor.zscore) {
          invoice.debtor.callMethod('getZScore');
        }
      }

      for (const docType in invoice.documents) {
        if (invoice.documents.hasOwnProperty(docType)) {
          documents[docType] = File.findOne({ _id: invoice.documents[docType]});
        }
      }

      if(invoice.status === invoiceStatuses.auctionPending && startPending){
        invoice.status = invoiceStatuses.auctionOpen;
      }

      return {
        loading: false,
        invoice,
        currencies,
        crowdsale,
        documents,
        bidUsers,
        invoiceId,
        startPending,
      };
    } else {
      return {
        loading: false,
        invoice,
        invoiceId,
        documents,
      };
    }
  }
  // We have to return an object for withTracker to work
  return {
    loading: true
  };
});

// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(Invoice);
