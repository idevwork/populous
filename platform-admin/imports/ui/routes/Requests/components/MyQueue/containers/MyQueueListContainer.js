import {Meteor} from 'meteor/meteor';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';
import {
  Request, User, LedgerLog, Invoice, Bank, Debtor,
  DepositLog, ExternalAddress, File, ExchangeRate
} from 'meteor/populous:api';
import {countries, currencySymbols} from 'meteor/populous:constants';

import {requestTypes, typeToSelector} from '../../tablesComponents/constants';
import {updateTypeFilter, updateFullTextSearch} from '../modules/actionsFilters';
import {closePdfPreview, openPdfPreview, reset2FA} from '../../../../UserProfile/modules/actions';
import MyQueueList from '../components/MyQueueList';

const reduxData = connect(
  state => ({...state.app, ...state.userProfile, ...state.MyQueue,}),
  (dispatch) =>
    bindActionCreators({
      updateTypeFilter, updateFullTextSearch, openPdfPreview, closePdfPreview, reset2FA
    }, dispatch)
);

const meteorData = withTracker(({currentUser, filters}) => {
  let requests = [];
  const query = getQuery(currentUser, filters);
  const handler = Meteor.subscribe('requests.type', query);

  if (handler.ready()) {
    requests = (typeToSelector[filters.type])(query);
  }

  return {
    requests,
  };
});

export default compose(reduxData, meteorData)(MyQueueList);


function getQuery(currentUser, filters){
  const query = {
    adminId: currentUser._id,
    isComplete: false,
    type: filters.type,
  };

  if (filters.keyword) {
    const fullTextRegExp = new RegExp('^' + filters.keyword, 'i');
    query['$or'] = [
      {'_id': fullTextRegExp},
      {type: fullTextRegExp},
      {createdAt: fullTextRegExp},
    ];
  }

  return query;
}
