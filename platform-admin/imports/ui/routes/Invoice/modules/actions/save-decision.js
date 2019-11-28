import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';

const saveDecision = (invoice, decision, reason = null) => {
  return (dispatch) => {

    if(!invoice){
      return;
    }

    const callback = (error) => {
      if (error) {
        return toastr.error(
          'Invoice update error',
          error.reason
        );
      }

      toastr.success('Invoice status successfully updated');
      dispatch(push('/invoices'));
    };

    if (decision) {
      invoice.callMethod('accept', callback);
    } else {
      invoice.callMethod('decline', reason, callback);
    }
  };
};

export default saveDecision;
