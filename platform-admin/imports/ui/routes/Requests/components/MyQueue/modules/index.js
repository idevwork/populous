import {requestTypes} from "../../tablesComponents/constants";

export const REQUEST_UPDATE_FILTER_TYPE_MY_QUEUE = 'REQUEST_UPDATE_FILTER_TYPE_MY_QUEUE';
export const REQUEST_UPDATE_FILTER_KEYWORD = 'REQUEST_UPDATE_FILTER_KEYWORD';

const initialFilters = {
  type: requestTypes.withdraw,
  keyword: '',
};

const initialState = {
  filters: {...initialFilters}
};

const RequestsList = (state = {...initialState}, action) => {
  const {type, payload} = action;
  let newFilters = {...state.filters};

  switch (type) {
    case REQUEST_UPDATE_FILTER_TYPE_MY_QUEUE:
      newFilters = {
        ...state.filters,
        type: payload
      };
      return {
        ...state,
        filters: newFilters
      };

    case REQUEST_UPDATE_FILTER_KEYWORD:
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

export default RequestsList;
