export const CURRENCY_CREATE = 'CURRENCY_CREATE';
export const CURRENCY_MINT = 'CURRENCY_MINT';
export const CURRENCY_DESTROY = 'CURRENCY_DESTROY';
export const CURRENCY_TRANSFER = 'CURRENCY_TRANSFER';
export const HISTORY_CURRENCY_CHANGE = 'HISTORY_CURRENCY_CHANGE';
export const GET_CURRENCY_BALANCE = 'GET_CURRENCY_BALANCE';
export const CHANGE_DATE_PERIOD = 'CHANGE_DATE_PERIOD';
export const SEARCH_VALUE_CHANGE = 'SEARCH_VALUE_CHANGE';

const initialState = {
  currencies: [],
  historyFilters: {
    search: '',
    currency: '',
    fromDate: '',
    toDate: ''
  },
  currenciesBalance: null,
};

const CurrenciesList = (state = {...initialState}, action) => {
  const {type, payload} = action;

  switch (type) {

    case CURRENCY_CREATE:
      return {...state};

    case CURRENCY_MINT:
      return {...state};

    case CURRENCY_DESTROY:
       return {...state};

    case CURRENCY_TRANSFER:
       return {...state};

    case CHANGE_DATE_PERIOD:
      return {...state, historyFilters:{...state.historyFilters, fromDate:payload.fromDate, toDate: payload.toDate}};

    case SEARCH_VALUE_CHANGE:
      return {...state, historyFilters:{...state.historyFilters, search: payload.search}};

    case HISTORY_CURRENCY_CHANGE:
      return {...state, historyFilters:{...state.historyFilters, currency:payload.currency}};

    case GET_CURRENCY_BALANCE:
      return {...state, currenciesBalance: payload.balance};

    default:
      return state;
  }
};

export default CurrenciesList;
