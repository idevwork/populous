import {
  invoiceStatuses,
} from 'meteor/populous:constants';

export const SET_INVOICES = 'INVOICES/SET_INVOICES';
export const SET_INVOICES_STATUS_GROUP = 'INVOICES/SET_INVOICES_STATUS_GROUP';
export const INVOICES_READY = 'INVOICES/INVOICES_READY';
export const SET_STATUS_FILTER = 'INVOICES/SET_STATUS_FILTER';
export const SET_KEYWORD_FILTER = 'INVOICES/SET_KEYWORD_FILTER';
export const SET_DUE_FILTER = 'INVOICES/SET_DUE_FILTER';
export const TOGGLE_SORT_FILTER = 'INVOICES/TOGGLE_SORT_FILTER';

export const invoicesStatusGroups = {
  pending : [invoiceStatuses.auctionPending],
  crowdsale: [
    invoiceStatuses.auctionOpen,
    invoiceStatuses.repaymentPending,
    invoiceStatuses.auctionRejected,
    invoiceStatuses.auctionClosed,
    invoiceStatuses.awaitingContract,
    invoiceStatuses.repaymentLate,
  ],
};


const initialState = {
  invoices: [],
  filters: {
    status: 'all',
    due: 'all',
    keyword: '',
  },
  sortField: 'createdAt',
  sortOrder: -1
};

const invoices = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICES:
      return {
        ...state,
        invoices: action.payload
      };
      break;
    case SET_STATUS_FILTER:
      let filters = {
        ...state.filters,
        status: action.payload
      };
      return {
        ...state,
        filters
      };
      break;
    case SET_KEYWORD_FILTER:
      filters = {
        ...state.filters,
        keyword: action.payload
      };
      return {
        ...state,
        filters
      };
      break;
    case SET_DUE_FILTER:
      filters = {
        ...state.filters,
        due: action.payload
      };
      return {
        ...state,
        filters
      };
      break;

    case TOGGLE_SORT_FILTER:
      const sortField = action.payload;

      return {
        ...state,
        sortField,
        sortOrder: state.sortField === sortField
          ? (state.sortOrder < 0 ? 1 : -1)
          : -1
      };
    default:
      return state;
  }
};

export default invoices;
