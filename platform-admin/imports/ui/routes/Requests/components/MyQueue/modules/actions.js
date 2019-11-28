import { Meteor } from 'meteor/meteor';
import { Request, Debtor } from 'meteor/populous:api';
import { toastr } from 'react-redux-toastr';

const addToMyQueue = (data) => {
  new Request().callMethod('addToMyQueue', data, (err) => {
    if(err) {
      toastr.error('Error', err.reason);
    } else {
      toastr.success('Successfully added to my Queue');
    }
  });
};

const unassign = (data, isReassign) => {
  new Request().callMethod('unassign', data, isReassign, (err) => {
    if(err) {
      toastr.error('Error', err.reason);
    } else if(isReassign) {
      toastr.success('Successfully reassign');
    } else {
      toastr.success('Successfully canceled by assign');
    }
  });
};

const removeWithMyQueue = (id) => {
  new Request().callMethod('removeWithMyQueue', id, (err, res) => {
    if (err) {
      toastr.error('Error', err.reason);
    } else {
      toastr.success('Successfully removed with my Queue');
    }
  });
};

const markComplete = (id) => {
  new Request().callMethod('markComplete', id, (err, res) => {
    if (err) {
      toastr.error('Error', err.reason);
    } else {
      toastr.success('Successfully marked as completed');
    }
  });
};

const decline2FASecret = (user) => {
  user.decline2FASecret((err, newUser) => {
    if (err) {
      toastr.error('Error', err.reason);
    } else {
      toastr.success('Success', 'Two-factor authentication declines successfully.');
    }
  });
};

const updateDebtor = (debtorId, values) => {
  new Debtor().callMethod('updateDebtor', debtorId, values, (err, res) => {
    if (err) {
      toastr.error('Error', err.reason);
    } else {
      toastr.success('Debtor updated successfully.');
    }
  });
};

export {
  addToMyQueue,
  removeWithMyQueue,
  markComplete,
  decline2FASecret,
  updateDebtor,
  unassign
};
