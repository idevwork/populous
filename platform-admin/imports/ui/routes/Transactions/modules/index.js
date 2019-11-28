export const TRANSACTION_UPDATE_FILTER_TYPE = 'TRANSACTION_UPDATE_FILTER_TYPE';
export const TRANSACTION_UPDATE_FILTER_STATUS = 'TRANSACTION_UPDATE_FILTER_STATUS';
export const TRANSACTION_UPDATE_FILTER_KEYWORD = 'TRANSACTION_UPDATE_FILTER_KEYWORD';

const initialFilters = {
	type: 'all',
  status: 'all',
  keyword: ''
};

//Todo: get info

const initialState = {
  filters: {...initialFilters}
};

const TransitionList = (state = {...initialState}, action) => {
  const {type, payload} = action;

  switch (type) {
    case TRANSACTION_UPDATE_FILTER_TYPE:
      let newFilters = {
        ...state.filters,
        type: payload
      };
      return {
        ...state,
        filters: newFilters
      };
    case TRANSACTION_UPDATE_FILTER_STATUS:
      newFilters = {
        ...state.filters,
        status: payload
      };
      return {
        ...state,
        filters: newFilters
      };
    case TRANSACTION_UPDATE_FILTER_KEYWORD:
      newFilters = {
        ...state.filters,
        keyword: payload
      };
      return {
        ...state,
        filters: newFilters
      };
    default:
      return state;
  }
};


export default TransitionList;
