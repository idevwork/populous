import {Meteor} from 'meteor/meteor';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';
import {User} from 'meteor/populous:api';
import {statuses, userRoles, userProviderStatuses,} from 'meteor/populous:constants';

import UsersList from "../components/UsersList";
import UserActions from "../modules/actions";

const reduxData = connect(
  state => ({...state.app, ...state.UsersList}),
  {
    ...UserActions
  }
);

// Subscribe to the meteor db and init the store


const meteorData = withTracker(({filters}) => {
  let users;
  let filter = [];
  if (filters.status && filters.status !== 'all') {
    if (filters.status === 'unverified') {
      filter.push({
        '$or': [
          {'KYCStatus': {'$exists': false}},
          {'KYCStatus': {$eq: statuses[filters.status]}}
        ]
      });
    } else {
      filter.push({KYCStatus: statuses[filters.status]});
    }
  }
  if (filters.keyword) {
    const fullTextRegExp = new RegExp('^' + filters.keyword, 'i');
    filter.push({
      '$or': [
        {'_id': fullTextRegExp},
        {firstName: fullTextRegExp},
        {lastName: fullTextRegExp},
        {party: fullTextRegExp},
        {'emails.0.address': fullTextRegExp},
        {'KYCStatus': fullTextRegExp},
        {'accountStatus': fullTextRegExp},
        {'companyName': fullTextRegExp},
      ]
    });
  }

  if (filters.role && filters.role !== 'all') {
    if (filters.role === 'provider') {
      filter.push({
        role: userRoles.investor,
        'provider.status': userProviderStatuses.completed,
      })
    } else {
      filter.push({role: filters.role,});
    }
  }

  if (filters.sic && filters.sic !== 'all') {
    filter.push({sic: filters.sic});
  }

  const handle = Meteor.subscribe('accounts.all');
  // When the subscription is ready, find the invoices
  if (handle.ready()) {

    // Find all of the pending invoices
    users = User.find(filter.length ? {$and: filter} : {}).fetch();
  }
  return {
    loading: !handle.ready(),
    users,
  };
});

// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(UsersList);
