import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';

// This thunk sets the users new password
const resetPassword = (password, passwordConfirm, token) => {
  return dispatch => {

    if (password !== passwordConfirm) {
      toastr.error('Error', 'Your new passwords do not match');
      return;
    }

    Accounts.resetPassword(token, password, err => {
      if (err) {
        toastr.error('Error', err.reason);
        return;
      }
      Meteor.logout(() => {
        dispatch(push('/login'));
        toastr.success(
          'Success',
          'Your new password has been set'
        );
      });

    });
  };
};

export default resetPassword;
