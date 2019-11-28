export const SETTINGS_SET_ACTIVE_TAB = 'SETTINGS_SET_ACTIVE_TAB';
export const SETTINGS_FILE_SAVED = 'SETTINGS/FILE_SAVED';
export const SETTINGS_FILE_RESET = 'SETTINGS_FILE_RESET';
export const SETTINGS_FILE_LOADING='SETTINGS_FILE_LOADING';
export const SETTINGS_SET_SAVED_FILE='SETTINGS_SET_SAVED_FILE';
export const SETTINGS_SET_REJECTED_FILE='SETTINGS_SET_REJECTED_FILE';

export const SETTINGS_MAINTENANCE = 'SETTINGS_MAINTENANCE';
export const SETTINGS_WALLET = 'SETTINGS_WALLET';
export const SETTINGS_BLOCKCHAIN = 'SETTINGS_BLOCKCHAIN';
export const SETTINGS_TERMS_AND_CONDITIONS = 'SETTINGS_TERMS_AND_CONDITIONS';
export const SETTINGS_EMAIL_VALIDATOR_TOOL = 'SETTINGS_EMAIL_VALIDATOR_TOOL';
export const SETTINGS_INVOICE_SEARCH_TOOL = 'SETTINGS_INVOICE_SEARCH_TOOL';
export const SETTINGS_BANK_PAGES = 'SETTINGS_BANK_PAGES';

export const SETTINGS_CERTIFICATE_PDF_OPEN = 'SETTINGS_CERTIFICATE_PDF_OPEN';
export const SETTINGS_CERTIFICATE_PDF_CLOSE = 'SETTINGS_CERTIFICATE_PDF_CLOSE';

export const SETTINGS_SET_BLOCKCHAIN_CONFIG = 'SETTINGS_SET_BLOCKCHAIN_CONFIG';

export const SET_BALANCE = 'SET_BALANCE';
export const SET_ACTION_STATUS = 'SET_ACTION_STATUS';

export const SET_KEYWORD_VALIDATOR_TOOL_FILTER = 'SET_KEYWORD_VALIDATOR_TOOL_FILTER';

export const LOAD_INVOICE_DETAIL = 'LOAD_INVOICE_DETAIL';
export const LOAD_INVOICE_DETAIL_SUCCESS = 'LOAD_INVOICE_DETAIL_SUCCESS';
export const LOAD_INVOICE_DETAIL_FAILURE = 'LOAD_INVOICE_DETAIL_FAILURE';

export const SETTINGS_LOAD_ACCOUNT_TRANSACTIONS = 'SETTINGS_LOAD_ACCOUNT_TRANSACTIONS'
export const SETTINGS_RESET_ACCOUNT_TRANSACTIONS = 'SETTINGS_RESET_ACCOUNT_TRANSACTIONS'

const initialState = {
  activeTab: SETTINGS_MAINTENANCE,
  rejectedFile: null,
  fileLoading: false,
  fileSaved: false,
  savedFile: null,
  pdfPreview: false,
  currentBlockchain: {},
  balance: null,
  address: null,
  actionStatus: null,
  keywordValidatorTool: '',
  invoiceSearch: {
    loading: false
  },
  transactions: {

  }
};

const settings = (state = initialState, {type:actionType, ...action}) => {

  switch (actionType) {
    case SETTINGS_SET_BLOCKCHAIN_CONFIG:
      return { ...state, currentBlockchain: action.config };

    case SETTINGS_SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };

    case SETTINGS_FILE_SAVED:
      return { ...state, fileSaved: action.saved };

    case SETTINGS_SET_REJECTED_FILE:
      return { ...state, rejectedFile: action.file };

    case SETTINGS_FILE_LOADING:
      return { ...state, fileLoading: action.loading };

    case SETTINGS_SET_SAVED_FILE:
      return { ...state, savedFile: action.file };

    case SETTINGS_FILE_RESET:
      return { ...initialState, activeTab: state.activeTab};

    case SETTINGS_CERTIFICATE_PDF_OPEN:
      return {...state, pdfFile: action.payload, pdfPreview: true};

    case SETTINGS_CERTIFICATE_PDF_CLOSE:
      return {...state, pdfFile: null, pdfPreview: false};

    case SET_BALANCE:
      return {...state, balance: action.balance, address: action.address};

    case SET_ACTION_STATUS:
      return {...state, actionStatus: action.result};

    case SET_KEYWORD_VALIDATOR_TOOL_FILTER:
      return {...state, keywordValidatorTool: action.payload};

    case LOAD_INVOICE_DETAIL:
      return {...state, invoiceSearch: {loading: true}}

    case LOAD_INVOICE_DETAIL_SUCCESS:
      return {...state, invoiceSearch: {loading: false, data: action.data, invoiceId: action.invoiceId}}

    case LOAD_INVOICE_DETAIL_FAILURE:
      return {...state, invoiceSearch: {loading: false}}

    case SETTINGS_LOAD_ACCOUNT_TRANSACTIONS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.tideAccountID]: action.payload
        }
      }

    default:
      return state;
  }
};

export default settings;
