export const INVOICE_SET_FORCE_POSSIBLE = 'INVOICE_SET_FORCE_POSSIBLE';

const initialState = {
  isForceInsertPossible: false,
};

const invoiceDetail = (state = {...initialState}, action) => {
  switch (action.type) {
    case INVOICE_SET_FORCE_POSSIBLE:
      return {...state, isForceInsertPossible: action.payload.value};
    default:
      return state;
  }
};

export default invoiceDetail;
