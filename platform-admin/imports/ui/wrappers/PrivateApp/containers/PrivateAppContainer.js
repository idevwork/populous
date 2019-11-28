import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { User } from 'meteor/populous:api';
import { userRoles } from 'meteor/populous:constants';

import PrivateApp from '../components/PrivateApp';
import {
  APP_READY,
  SET_CURRENT_USER,
} from '../modules';

const reduxData = connect(
  ({ app }) => ({
    currentUser: app.currentUser,
    loading: app.loading,
  }),
  dispatch => ({
    init: user => {
      dispatch({ type: SET_CURRENT_USER, user });
      dispatch({ type: APP_READY });
    },
    logout: () => {
      Meteor.logout(err => {
        if (err) {

        } else {
          dispatch({type: SET_CURRENT_USER, user: null});
          dispatch(push('/login'));
        }
      });
    }
  })
);

// Subscribe to the meteor db and pass the user data
// to the PrivateApp component that will setup the store
const meteorData = withTracker(({ loading, init }) => {

  // Make sure the data for the current user is available
  const user = Meteor.subscribe('accounts.user', Meteor.userId());
  Meteor.subscribe('exchangeRates');
  const dataReady = (
    user.ready() &&  // wait for user subscription
    !Meteor.loggingIn() // wait for Meteor to find current user session
  );

  // If the app state is loading, and the data is ready,
  // init the app with the user data
  if (loading && dataReady) {
    const user = User.findOne(Meteor.userId());
    init(user);
  }

  // We have to return an object for withTracker to work
  return {};
});

// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(PrivateApp);
