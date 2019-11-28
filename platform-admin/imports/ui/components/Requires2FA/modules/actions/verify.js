import { toastr } from 'react-redux-toastr';
import {helpers} from 'meteor/populous:ui';


// This thunk verifies the users 2FA code and calls
// the child thunk if successful
const verify = token => {
  return (dispatch, getState) => {
    const {
      requires2FA: { onSuccess, args = [] },
    } = getState();

    helpers.TwoFactorHelpers
      .verifycode({
        user: args[0],
        resetPasswordToken: args[2],
        token,
      })
      .then(onSuccess)
      .catch(() => {
        toastr.error(
          'Error',
          'That code is invalid, please try again'
        );
      });
  };
};

export default verify;
