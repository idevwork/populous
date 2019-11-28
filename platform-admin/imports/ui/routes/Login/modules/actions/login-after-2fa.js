import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';

import {
  APP_READY,
  SET_CURRENT_USER,
} from '../../../../wrappers/PrivateApp/modules';

// This thunk takes the email and password submitted
// at login and logs them into the application
const loginAfter2FA = (user, password) => {
  return dispatch => {
    Meteor.loginWithPassword(
      { email: user.emailAddress() },
      password,
      err => {
        // They should definitely be valid login credentials
        // as they've come through the check-credentials thunk
        // but let's keep this for safety
        if (err) {
          toastr.error(
            'Error',
            'Login failed, please try again'
          );
          return;
        }

        dispatch({ type: SET_CURRENT_USER, user });
        dispatch({ type: APP_READY });
        dispatch(push('/invoices'));
      }
    );
  };
};

export default loginAfter2FA;
