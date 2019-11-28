import { toastr } from 'react-redux-toastr';

const updateInvoiceField = (invoice, field, value) => {
  return (dispatch) => {
    invoice.callMethod('updateInvoiceField', field, value, (error) => {
      if (error) {
        return toastr.error(error.message);
      }

      toastr.success('Invoice successfully updated');
    })
  };
};

export default updateInvoiceField;
