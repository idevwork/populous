import { toastr } from 'react-redux-toastr';

const reorderDocuments = (invoice, documents) => {
  return (dispatch) => {
    invoice.callMethod('reorderDocuments', documents, (error) => {
      if (error) {
        return toastr.error(error.message);
      }

      toastr.success('Documents successfully updated');
    })
  };
};

export default reorderDocuments;
