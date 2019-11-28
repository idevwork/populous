import { Meteor } from 'meteor/meteor';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Request, User, LedgerLog, DepositLog, ExternalAddress, Wallet, File, Debtor, Bank, ExchangeRate, Invoice } from 'meteor/populous:api';
import { requestTypes, countries, currencySymbols } from 'meteor/populous:constants';

import RequestsPoolList from '../components/RequestsPoolList';
import { onTypeChange, onStatusChange, updateFullTextSearch, onPageChange, onLoadEntriesChange } from '../modules/actionsFilters';
import { closePdfPreview, openPdfPreview } from '../../../../UserProfile/modules/actions';

import {typeToSelector} from "../../tablesComponents/constants";

const reduxData = connect(
  state => ({...state.app, ...state.userProfile, ...state.RequestsList}),
  (dispatch) =>
    bindActionCreators({
      onTypeChange, onStatusChange, updateFullTextSearch,
      onPageChange, onLoadEntriesChange, openPdfPreview,
      closePdfPreview
    }, dispatch)
);

const meteorData = withTracker(({currentUser, filters, currentPage, loadEntries}) => {
  const skip = (currentPage - 1) * loadEntries;
  const limit = loadEntries;
  let requestList = [];
  const query = getQuery(currentUser, filters);
  
  const handler = Meteor.subscribe('requests.type', query, {skip, limit});

  if (handler.ready()) {
    requestList = (typeToSelector[filters.type])(query);
  }

  return {
    loading: !handler.ready(),
    requestList,
  };
});

export default compose(reduxData, meteorData)(RequestsPoolList);

function getQuery(currentUser, filters){
  const query = {
    adminId: {$ne: currentUser._id}
  };

  if (filters.status === 'Completed') {
    query.isComplete = true;
  } else if (filters.status === 'Being processed') {
    query['$and'] = [
      {adminId: {$exists: true,}},
      {adminId: {$ne: ''}},
    ];
    query.isComplete = false;
  } else if (filters.status === 'Opened') {
    query.isComplete = false;
  }

  if (filters.keyword) {
    const fullTextRegExp = new RegExp('^' + filters.keyword, 'i');
    query.$or = query.$or || [];

    query.$or.push(
      {'_id': fullTextRegExp},
      {createdAt: fullTextRegExp},
    );
  }

  query.type = filters.type;

  return query;
}

