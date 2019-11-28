import {toastr} from 'react-redux-toastr';
import {INVOICE_SET_FORCE_POSSIBLE} from "../index";


export default function checkIsForceInsertPossible(crowdsale) {
  return dispatch => {
    if (!crowdsale) {
      return;
    }

    crowdsale.callMethod('isForceInsertPossible', (error, response) => {
      if (error) {
        return toastr.error(response.message);
      }

      dispatch(setForcePossible(!!response));
    })

  };
}

export function setForcePossible(value){
  return {
    type: INVOICE_SET_FORCE_POSSIBLE,
    payload: {value,},
  }
}
