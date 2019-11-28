import { toastr } from 'react-redux-toastr';

const verifyDebtor = (debtor, isVerified) => {
  return (dispatch) => {
    debtor.callMethod('verify', isVerified, (error) => {
      if (error) {
        return toastr.error(error.message);
      }

      toastr.success('Debtor status successfully updated');
    })
  };
};

export default verifyDebtor;
