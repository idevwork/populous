import { toastr } from 'react-redux-toastr';
import { File, BlockchainLog, Wallet, BlockchainAction, TermsAndConditions, EmailValidate, Invoice } from 'meteor/populous:api';
import { Config } from 'meteor/populous:config';
import { SubmissionError, reset } from 'redux-form';

import requireConfirmation from '../../../components/ConfirmModal/modules/actions';
import {
  SETTINGS_FILE_LOADING, SETTINGS_FILE_RESET, SETTINGS_FILE_SAVED, SETTINGS_SET_ACTIVE_TAB,
  SETTINGS_SET_REJECTED_FILE, SETTINGS_SET_SAVED_FILE, SETTINGS_SET_UPLOADED_DOCUMENT_ID,
  CHANGE_EMAIL_VALIDATOR_SHOW_MODAL, SETTINGS_SET_BLOCKCHAIN_CONFIG, SET_BALANCE, SET_ACTION_STATUS,
  LOAD_INVOICE_DETAIL, LOAD_INVOICE_DETAIL_FAILURE, LOAD_INVOICE_DETAIL_SUCCESS,
  SETTINGS_RESET_ACCOUNT_TRANSACTIONS, SETTINGS_LOAD_ACCOUNT_TRANSACTIONS
} from "./index";

export const getBlockchainConfig = () => {
  return (dispatch) => {
    new Config().callMethod('getBlockchainConfig', (error, response) => {
      if (!error) {
        dispatch({ type: SETTINGS_SET_BLOCKCHAIN_CONFIG, config: response });
      }
    });
  }
};

export const updateBlockchain = (data, formName, needReset = true, title = 'Blockchain') => {
  return (dispatch) => {
    // if (!gasPrice) {
    //   toastr.error('Error', 'Required Gas Price');
    //   return;
    // }

    new BlockchainLog().callMethod('updateBlockchain',
      data,
      (err) => {
        if (err) {
          toastr.error('Error', err.reason);
        } else {
          toastr.success(`${title} is saved!`);
          if (needReset) {
            dispatch(reset(formName));
          }
          dispatch(getBlockchainConfig());
        }
      });
  }
};

export const updateBlockchainSignerKey = (signerKey, formName) => {
  return (dispatch) => {
    if (!signerKey) {
      toastr.error('Error', 'Required security signer key');
      return;
    }

    new BlockchainLog().callMethod('updateBlockchainSignerKey', signerKey,
      (err) => {
        if (err) {
          toastr.error('Error', err.reason);
        } else {
          toastr.success('Blockchain is saved!');
          dispatch(reset(formName));
          dispatch(getBlockchainConfig());
        }
      });
  }
};

export const getBalanceOfAddress = (address) => {
  return (dispatch) => {
    if (!address) {
      toastr.error('Error', 'Required address');
      return;
    }

    new Wallet().callMethod('getBalanceOfAddress', address,
      (err, balance) => {
        if (err) {
          toastr.error('Error', err.reason);
          dispatch({ type: SET_BALANCE, address, balance: null});
        } else {
          dispatch({ type: SET_BALANCE, address, balance});
        }
    });
  }
};

export const checkActionStatus = (id) => {
  return (dispatch) => {
    if (!id) {
      toastr.error('Error', 'Required ID');
      return;
    }

    new BlockchainAction().callMethod('checkActionStatus', id,
      (err, result) => {
        if (err) {
          toastr.error('Error', err.reason);
        } else {
          dispatch({ type: SET_ACTION_STATUS, result});
        }
    });
  }
};

export const setActiveTab = (tab) => {
  return {
    type: SETTINGS_SET_ACTIVE_TAB,
    payload: tab
  };
};

export const uploadDocumentFile = (acceptedFiles, rejectedFiles) => {
  return (dispatch) => {

    if (rejectedFiles.length > 0) {
      const file = rejectedFiles[0];
      dispatch({ type: SETTINGS_SET_REJECTED_FILE, file });
      return;
    }

    dispatch({ type: SETTINGS_SET_REJECTED_FILE, file: null });

    if (acceptedFiles.length === 0) {
      return;
    }

    dispatch({ type: SETTINGS_FILE_LOADING, loading: true });

    const documentFile = acceptedFiles[0];
    // upload file to server
    const upload = File.insert(
      {
        file: documentFile,
        streams: 'dynamic',
        chunkSize: 'dynamic'
      },
      false
    );
    upload.on('end', function (error, fileObj) {
      dispatch({ type: SETTINGS_FILE_LOADING, loading: false });
      if (error) {
        toastr.error('Error', 'File uploading failed. Please try again');
      } else {
        dispatch({ type: SETTINGS_FILE_SAVED, saved: true });
        dispatch({ type: SETTINGS_SET_SAVED_FILE, file: fileObj });
      }
    });
    upload.start();
  };
};

export const resetFile = requireConfirmation(() => {
  return (dispatch, getState) => {
    const {settings: {savedFile: document}} = getState();

    File.remove({_id: document._id}, (error) => {
      if (error) {
        return toastr.error(error.reason);
      }
      dispatch({ type: SETTINGS_FILE_RESET });
    });
  }
}, {
  text: 'Are you sure that you are going to delete this file?'
});

export const deleteClosest = requireConfirmation((document) => {
  return dispatch => {
    document.callMethod('delete', document._id, (err) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Maintenance schedule removed!');
      }
    });
  }
}, {
  text: 'Are you sure that you are going to delete this data?'
});


export const removeSectionTC = requireConfirmation((document) => {
  return (dispatch) => {
    document.callMethod('removeSection', document._id, (err) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Section removed!');
      }
    });
  }
}, {
  text: 'Are you sure that you are going to delete this data?'
});

export const saveSectionTC = (newData, isUpdatedPosition, isNewSection, isIncremetPosition = false, document = new TermsAndConditions()) => {
  return (dispatch) => {
    document.callMethod('saveSection', newData, isNewSection, isUpdatedPosition, isIncremetPosition, (err) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Section saved!');
      }
    });
  }
};

export const saveEmailValidate = ({subject, url, model = new EmailValidate()}) => {
  return (dispatch) => {
    if(!subject || !subject.trim()) {
      throw new SubmissionError({
        subject: 'Required',
      });
    }
    if(!url || !url.trim()) {
      throw new SubmissionError({
        url: 'Required',
      });
    }

    model.callMethod('saveEmailValidate', subject, url, (err) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Successfully saved!');
        dispatch(reset('EmailValidatorForm'));
      }
    });
  }
};

export const removeEmailValidate = requireConfirmation((model) => {
  return (dispatch) => {
    model.callMethod('removeEmailValidate', (err) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Successfully removed!');
      }
    });
  }
}, {
  text: 'Are you sure that you are going to delete this data?'
});

export const loadInvoiceDetail = (invoiceId) => {
  return (dispatch) => {
    dispatch({ type: LOAD_INVOICE_DETAIL });

    new Invoice().callMethod('getInvoiceDetail', invoiceId,
      (err, response) => {
        if (err) {
          console.error('HALA--', err)
          toastr.error('Error', err.reason);
          dispatch({ type: LOAD_INVOICE_DETAIL_FAILURE });
        } else {
          // toastr.error('Response', response);
          if (response.success) {
            dispatch({ type: LOAD_INVOICE_DETAIL_SUCCESS, data: response.data, invoiceId: response.invoiceId });
          } else {
            toastr.error('Error', response.message);
            dispatch({ type: LOAD_INVOICE_DETAIL_FAILURE });
          }
        }
      });
  }
};

export const loadTransactionsForAccount = (tideAccountID) => {
  return dispatch => {
    dispatch({type: SETTINGS_RESET_ACCOUNT_TRANSACTIONS});

    Meteor.call('getTransactionsForAccount', tideAccountID, (error, response) => {
      if (error) {
        return toastr.error('Error', error.reason);
      }
      dispatch({type: SETTINGS_LOAD_ACCOUNT_TRANSACTIONS, payload: response, tideAccountID});
    });
  }
};
