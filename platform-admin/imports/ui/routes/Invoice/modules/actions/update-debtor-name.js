import { toastr } from 'react-redux-toastr';

const updateDebtorName = (debtor, name) => {
  return (dispatch) => {
    debtor.callMethod('updateDebtorName', name, (error) => {
      if (error) {
        return toastr.error(error.message);
      }

      toastr.success('Debtor name successfully updated');
    })
  };
};

export default updateDebtorName;
