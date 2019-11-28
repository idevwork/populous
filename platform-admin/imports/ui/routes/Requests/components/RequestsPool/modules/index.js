import {requestTypes} from "../../tablesComponents/constants";


export const RESET_UPDATE_FILTER_KEYWORD = 'RESET_UPDATE_FILTER_KEYWORD';
export const REQUEST_UPDATE_FILTER_TYPE = 'REQUEST_UPDATE_FILTER_TYPE';
export const REQUEST_UPDATE_FILTER_STATUS = 'REQUEST_UPDATE_FILTER_STATUS';

export const REQUEST_UPDATE_PAGE = 'REQUEST_UPDATE_PAGE';
export const REQUEST_UPDATE_LOAD_ENTRIES = 'REQUEST_UPDATE_LOAD_ENTRIES';
export const REQUEST_SET_TOTAL = 'REQUEST_SET_TOTAL';


const initialFilters = {
  keyword: '',
  type: requestTypes.withdraw,
  status: 'all'
};

const initialState = {
  filters: {...initialFilters},
  currentPage: 1,
  loadEntries: 5,
  totalRequests: 0,
};

const ResetList = (state = {...initialState}, action) => {
  const {type, payload} = action;
  let newFilters = {...state.filters};

  switch (type) {
    case REQUEST_UPDATE_FILTER_TYPE:
      newFilters = {
        ...state.filters,
        type: payload,
      };
      return {
        ...state,
        filters: newFilters,
        currentPage: 1
      };

    case REQUEST_UPDATE_FILTER_STATUS:
      newFilters = {
        ...state.filters,
        status: payload
      };
      return {
        ...state,
        filters: newFilters
      };

    case RESET_UPDATE_FILTER_KEYWORD:
      newFilters = {
        ...state.filters,
        keyword: payload
      };
      return {
        ...state,
        filters: newFilters
      };

    case REQUEST_UPDATE_PAGE:
      return {
        ...state,
        currentPage: payload
      };

    case REQUEST_UPDATE_LOAD_ENTRIES:
      return {
        ...state,
        loadEntries: payload
      };

    case REQUEST_SET_TOTAL:
      return {
        ...state,
        totalRequests: payload
      };

    default:
      return state;
  }
};

export default ResetList;
