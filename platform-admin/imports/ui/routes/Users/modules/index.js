export const INVOICE_UPDATE_FILTERS = 'INVOICE_UPDATE_FILTERS';
export const INIT_USER_FILTER = 'INIT_USER_FILTER';
export const INVOICE_SET_SALE_PRICE_LIMITS = 'INVOICE_SET_SALE_PRICE_LIMITS';
export const INVOICE_UPDATE_FILTERS_VISIBILITY = 'INVOICE_UPDATE_FILTERS_VISIBILITY';
export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const FIRSTNAME_CHANGED = 'FIRSTNAME_CHANGED';
export const LASTNAME_CHANGED = 'LASTNAME_CHANGED';
export const USER_LOADMORE = 'USER_LOADMORE';
export const SET_STATUS_FILTER = 'SET_STATUS_FILTER';
export const SET_KEYWORD_FILTER = 'SET_KEYWORD_FILTER';
export const REQUEST_UPDATE_FILTER_TYPE = 'REQUEST_UPDATE_FILTER_TYPE';
export const SET_ROLE_FILTER = 'SET_ROLE_FILTER';
export const SET_SIC_FILTER = 'SET_SIC_FILTER';

const initialFilters = {
	status: 'all',
  keyword: '',
  role: 'all',
  sic: 'all',
};

const initialState = {
  filters: {...initialFilters},
  showFilters: false,
  salePriceLimits:{min: null, max: null,},
  loadMoreUser: 1
};

const UsersList = (state = {...initialState}, action) => {
  const {type, payload} = action;
  let filters = {...state.filters};

  switch (type) {
    case SET_STATUS_FILTER:
      filters = {
        ...filters,
        status: action.payload || initialFilters.status,
      };
      return {
        ...state,
        filters
      };
      break;
    case SET_KEYWORD_FILTER:
      filters = {
        ...filters,
        keyword: action.payload
      };
      return {
        ...state,
        filters
      };
      break;
    case SET_ROLE_FILTER:
      filters = {
        ...filters,
        role: action.payload || initialFilters.role
      };
    case SET_SIC_FILTER:
      filters = {
        ...filters,
        sic: action.payload || initialFilters.sic
      };
      return {
        ...state,
        filters
      };
      break;
    case INIT_USER_FILTER:
      return {
        ...state,
        filters: JSON.parse(JSON.stringify(initialFilters)),
      };
      break;
    case EMAIL_CHANGED:
      return {...state, filters: {...filters, [payload.key]: payload.value}}
    case FIRSTNAME_CHANGED:
      return {...state, filters: {...filters, [payload.key]: payload.value}}
    case LASTNAME_CHANGED:
      return {...state, filters: {...filters, [payload.key]: payload.value}}
    case USER_LOADMORE:
      return {...state, filters: {...filters}, loadMoreUser:  state.loadMoreUser + 1}
    default:
      return state;
  }
};

export default UsersList;
