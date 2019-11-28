import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { User } from 'meteor/populous:api';

import GeneralSettings from '../components/GeneralSettings';
import {
  toggleNicknameModal,
  toggleTimezoneModal,
  togglePasswordModal,
  toggleChangeFeeModal,
  changePassword,
  changeFee,
  reset2FA,
  suspendAccount,
  activateAccount,
  destroyAccount,
  updateUserAvatar,
  savePersonalDetails,
  closePdfPreview,
  openPdfPreview,
  removeNickname
} from '../modules/actions';
import {showEmailForm} from '../../SendEmail/modules/actions';

const reduxData = connect(
  state => ({ ...state.userProfile, history }),
  dispatch => ({
    toggleNicknameModal: (open) => dispatch(toggleNicknameModal(open)),
    toggleTimezoneModal: (open) => dispatch(toggleTimezoneModal(open)),
    togglePasswordModal: () => dispatch(togglePasswordModal()),
    toggleChangeFeeModal: () => dispatch(toggleChangeFeeModal()),
    changePassword: (user, newPassword) => dispatch(changePassword(user, newPassword)),
    changeFee: (user, newFee) => dispatch(changeFee(user, newFee)),
    reset2FA: (user) => dispatch(reset2FA(user)),
    suspendAccount: (user) => dispatch(suspendAccount(user)),
    activateAccount: (user) => dispatch(activateAccount(user)),
    destroyAccount: (user) => dispatch(destroyAccount(user)),
    sendEmail: (users) => {
      dispatch(showEmailForm(users));
      dispatch(push('/send-email'));
    },
    updateUserAvatar: (user, files) => dispatch(updateUserAvatar(user, files)),
    saveGeneralSetting: (user, setting) => dispatch(savePersonalDetails(user, setting)),
    closePdfPreview: () => dispatch(closePdfPreview()),
    openPdfPreview: (fileId, fileType, ownerId) => dispatch(openPdfPreview(fileId, fileType, ownerId)),
    removeNickname: (user) => dispatch(removeNickname(user)),
  })
);

const meteorData = withTracker((props) => {
  const { userId } = props;
  if(!userId) {
    return {
      loading: true
    };
  }
  const handler = Meteor.subscribe('accounts.user', userId);
  const user = User.findOne({ _id: userId });

  return {
    loading: !handler.ready(),
    user
  };
});

export default compose(reduxData, meteorData)(GeneralSettings);
