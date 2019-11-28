import {toastr} from 'react-redux-toastr';
import moment from 'moment';
import { push } from 'react-router-redux';

import requireConfirmation from '../../../../components/ConfirmModal/modules/actions';
import { showEmailForm } from '../../../SendEmail/modules/actions';

export let closeAuction = (invoice) => {
  return (dispatch) => {
    toastr.success('Auction close request submitted');

    invoice.callMethod('closeAuction', (error, response) => {
      if (error) {
        return toastr.error(error.message);
      }

      toastr.success('Auction is successfully closed');
    })
  };
};
closeAuction = requireConfirmation(closeAuction, {
  text: 'Are you sure you want to close Auction?'
});

export let restartAuction = (invoice) => {
  return (dispatch) => {
    const currentDate = moment().utc();
    const dueDate = moment(invoice.dueDate);
    if (currentDate.isAfter(dueDate)) {
      return toastr.error('Incorrect due date.');
    }

    toastr.success('Auction close request submitted');

    invoice.callMethod('restartAuction', (error, response) => {
      if (error) {
        return toastr.error(error.message);
      }

      toastr.success('Auction is successfully restarted');
    })
  };
}
restartAuction = requireConfirmation(restartAuction, {
  text: 'Are you sure you want to restart Auction?'
});


export function forceInsert(crowdsale) {
  return (dispatch) => {
    toastr.success('Invoice block force insert is initiated');
    crowdsale.callMethod('forceInsert', (error, result) => {
      if (error) {
       return toastr.error(error.message);
      }
    });
  }
}

export function sendEmail(users) {
  return (dispatch, getState) => {
    dispatch(showEmailForm(users));
    dispatch(push('/send-email'));
  };
}

const _deleteInvoice = (invoice) => {
  return (dispatch) => {
    toastr.success('Invoice delete request submitted');
    dispatch(push('/invoices'));
    invoice.callMethod('delete', (error, response) => {
      if (error) {
        return toastr.error(error.message);
      }
      toastr.success('Invoice is successfully deleted');
    })
  };
};

export const deleteInvoice = requireConfirmation(_deleteInvoice, {
  text: 'Are you sure you want to delete the invoice?'
});

export const markAsPaidOrNot = (invoice, newStatus) => {
  return (dispatch) => {
    toastr.success('Withdraw status change request submitted');
    invoice.callMethod('updateWidthdrawStatus', newStatus, (error, response) => {
      if (error) {
        return toastr.error(error.message);
      }
      toastr.success('Withdraw status updated');
    })
  };
};
