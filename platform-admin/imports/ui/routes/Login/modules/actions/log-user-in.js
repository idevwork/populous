import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { toastr } from 'react-redux-toastr';
import { User } from 'meteor/populous:api';

import { loginAfter2FA } from './';
import { requires2FA } from '../../../../components/Requires2FA/modules/actions';

// This thunk takes the email and password submitted
// in the login form and attempts to log the user into
// the application.
const logUserIn = (email, password) => {
  return dispatch => {
    Meteor.loginWithPassword(
      { email },
      password,
      err => {
        if (err) {
          toastr.error('Error', 'Login failed, please check your credentials');
          return;
        }

        // At this stage we know they're a valid user but
        // Meteor has logged them and we still need to check thier
        // 2FA token before we allow them access to the app
        Meteor.logout();

        // Find the user by email
        new User().callMethod('findUserByEmail', email, (err, user) => {
          if (user && user.is_block) {
            toastr.error('Error', 'Populous has blocked your account. Please contact support for more detail');
            return;
          }
          else if (user) {
            // Check to see if the user is an admin
            // To-Do need to check 'user.isAdminVerified'
            if (user.twoFAKey) {
              dispatch(requires2FA(loginAfter2FA, null, {type: 'login'})(user, password));
            } else {
              // If they don't have 2FA yet, let them through so
              // they can set it up
              dispatch(loginAfter2FA(user, password));
            }
          }
          else if (!user) {
            toastr.error('Error', 'You are not registered, Please sign up');
            return;
          }
          else {
            // They shouldn't be here
            toastr.error('Error', 'Login failed, please check your credentials');
            return;
          }
        });
      }
    );
  };
};

export default logUserIn;
