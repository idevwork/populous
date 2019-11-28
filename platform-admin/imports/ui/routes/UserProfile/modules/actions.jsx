import { Meteor } from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { File, Invoice } from 'meteor/populous:api';

import {
  USER_PROFILE_SET_ACTIVE_TAB,
  USER_PROFILE_RESET,
  USER_PROFILE_TOGGLE_NICKNAME_MODAL,
  USER_PROFILE_TOGGLE_TIMEZONE_MODAL,
  USER_PROFILE_TOGGLE_PASSWORD_MODAL,
  USER_PROFILE_TOGGLE_CHANGE_FEE_MODAL,
  USER_PROFILE_SELECT_BANK,
  USER_PROFILE_PDF_OPEN,
  USER_PROFILE_PDF_CLOSE,
  USER_PROFILE_TWO_FA_FLAG,
  ACTIVITY_UPDATE_FILTER,
  TOGGLE_WALLET_ADDRESS_EDIT,
  SELECT_WALLET_ADDRESS,
  TOGGLE_ADD_WALLET_ADDRESS,
  INIT_EXTERNAL_WALLET,
  UPDATE_TRANSACTION_HISTORY_FILTERS,
  RESET_TRANSACTION_HISTORY_FILTERS,
} from './index';
import requireConfirmation from '../../../components/ConfirmModal/modules/actions';

export const setActiveTab = (tab) => {
  return {
    type: USER_PROFILE_SET_ACTIVE_TAB,
    payload: tab
  };
};

export const reset = (userId) => {
  return {
    type: USER_PROFILE_RESET,
    payload: userId
  };
};

export const toggleWalletAddressEdit = (open) => {
  return {
    type: TOGGLE_WALLET_ADDRESS_EDIT,
    payload: open
  };
};

export const selectExternalAddress = id => {
  return {
    type: SELECT_WALLET_ADDRESS,
		payload: id
	};
};

export const toggleAddWalletAddress = (open) => {
  return {
    type: TOGGLE_ADD_WALLET_ADDRESS,
    payload: open
  };
};

export const toggleNicknameModal = () => {
  return {
    type: USER_PROFILE_TOGGLE_NICKNAME_MODAL
  };
};

export let removeNickname = (user) => {
  return dispatch => {
    user.removeNickname(function(err, newUser) {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'Nickname has been deleted successfully.');
      }
    });
  };
};
removeNickname = requireConfirmation(removeNickname, {
  text: 'Are you sure you want to delete the nickname for this user?'
});

export const toggleTimezoneModal = () => {
  return {
    type: USER_PROFILE_TOGGLE_TIMEZONE_MODAL
  };
};

export const togglePasswordModal = () => {
  return {
    type: USER_PROFILE_TOGGLE_PASSWORD_MODAL
  };
};

export const toggleChangeFeeModal = () => {
  return {
    type: USER_PROFILE_TOGGLE_CHANGE_FEE_MODAL
  };
};

export const changePassword = (user, newPassword) => {
  return (dispatch) => {
    user.changePassword(newPassword, (err, res) => {
      if(res) {
        toastr.success('Success', 'Password has been changed');
      } else {
        toastr.error('Error', 'Incorrect password');
      }
    });
  }
};

export const changeFee = (user, newFee) => {
  return (dispatch) => {
    user.changeFee(newFee, (err, res) => {
      if(res) {
        toastr.success('Success', 'Fees has been updated');
      } else {
        toastr.error('Error', 'Something went wrong');
      }
    });
  }
};

export let reset2FA = (user) => {
  return dispatch => {
    user.remove2FASecret((err, newUser) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        dispatch({ type: USER_PROFILE_TWO_FA_FLAG });
        toastr.success('Success', 'Two-factor authentication reset successfully.');
      }
    });
  }
};
reset2FA = requireConfirmation(reset2FA, {
  text: 'Are you sure you want to reset 2FA for this user?'
});

export let suspendAccount = (user) => {
  return dispatch => {
    user.suspendAccount((err, newUser) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'Account is suspended.');
      }
    });
  };
};
suspendAccount = requireConfirmation(suspendAccount, {
  text: 'Are you sure that you are going to suspend this account?'
});

export const activateAccount = (user) => {
  return dispatch => {
    user.activateAccount((err, newUser) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'Account is activated.');
      }
    });
  };
};

export let destroyAccount = (user) => {
  return (dispatch, getState) => {
    const { app: { currentUser } } = getState();
    if(currentUser._id == user._id) {
      toastr.error('Error', "You can't delete logged-in account.")
    } else {
      user.destroy((err, res) => {
        if (err) {
          toastr.error('Error', err.reason);
        } else {
          toastr.success('Success', 'Account is deleted successfully.');
          dispatch(push('/users'));
        }
      });
    }
  }
};
destroyAccount = requireConfirmation(destroyAccount, {
  text: 'Are you sure that you are going to delete this account?'
});

export const changeBank = (bank) => {
  return {
    type: USER_PROFILE_SELECT_BANK,
    payload: bank
  };
};

export const openPdfPreview = (fileId, fileType, ownerId) => {
  return dispatch => {
    Meteor.call('file.getDecryptFile', fileId, fileType, ownerId, (error, responce) => {
      if (error) {
        return toastr.error('Error', error.reason);
      }

      dispatch({type: USER_PROFILE_PDF_OPEN, payload: responce});

    });
  }
};

export const closePdfPreview = () => {
  return {
    type: USER_PROFILE_PDF_CLOSE
  };
};

export const updateUserAvatar = (user, files) => {
  return (dispatch) => {
    if(!files || files.length == 0) {
      toastr.warning('You need to upload the image!');
    } else {
      const upload = File.insert(
        {
          file: files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
        },
        false
      ).on('end', (error, fileObj) => {
        if (error) {
          toastr.error('Error', 'File reading failed. Please try again');
        } else {
          user.saveAvatar(fileObj._id, (err) => {
            if (err) {
              toastr.error('Error while saving', err.reason);
            } else {
              toastr.success('Avatar is saved!');
            }
          });
        }
      }).start();
    }
  };
};

// This thunk saves changes to the users personal details
export const savePersonalDetails = (user, updates) => {
  return (dispatch, getState) => {
    user.updatePersonalDetails(updates, (err, user) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'User details have been updated');
      }
    });
  };
};

export const transferFunds = (userId, currency, amount, invoiceId) => {
  return (dispatch) => {
    new Invoice().callMethod('repayment', userId, currency, amount, invoiceId, (err) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Transfer funds successfully');
      }
    });
  }
};

export const updateActivityFilter = (filterType, newValue) => {
  return {type: ACTIVITY_UPDATE_FILTER, payload: {filterType, newValue}};
};


export const initWalletAddresses = () => {
  return {
    type: INIT_EXTERNAL_WALLET
  }
}

export const updateFilters = (filters) => {
  return {
    type: UPDATE_TRANSACTION_HISTORY_FILTERS,
    payload: filters,
  }
};

export const resetFilters = () => {
  return {type: RESET_TRANSACTION_HISTORY_FILTERS}
};
