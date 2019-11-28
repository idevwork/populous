import { connect } from 'react-redux';
import ResetTwoFAKey from '../components/ResetTwoFAKey';

import resetTwoFAKeyActions from '../modules/actions';

const reduxData = connect(
  ({ app, confirmReset, requires2FA }) => ({
    currentUser: app.currentUser,
    fileSaved: confirmReset.savedFile,
    loginData: requires2FA.args
  }),
  { ...resetTwoFAKeyActions }
);

export default reduxData(ResetTwoFAKey);
