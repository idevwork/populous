import {filterKeys as activityFilterKeys} from "../ActivityLog/constants";

export const USER_PROFILE_SET_ACTIVE_TAB = 'USER_PROFILE_SET_ACTIVE_TAB';
export const USER_PROFILE_TAB_GENERAL = 'USER_PROFILE_TAB_GENERAL';

export const USER_PROFILE_TAB_PROFILE = 'USER_PROFILE_TAB_PROFILE';
export const USER_PROFILE_TAB_BANK = 'USER_PROFILE_TAB_BANK';
export const USER_PROFILE_TAB_ACTIVITY = 'USER_PROFILE_TAB_ACTIVITY';
export const USER_PROFILE_TAB_INVOICES = 'USER_PROFILE_TAB_INVOICES';
export const USER_PROFILE_TAB_BANK_PAGES = 'USER_PROFILE_TAB_BANK_PAGES';
export const USER_PROFILE_TAB_PROVIDER = 'USER_PROFILE_TAB_PROVIDER';
export const USER_PROFILE_TAB_WALLET = 'USER_PROFILE_TAB_WALLET';
export const USER_PROFILE_RESET = 'USER_PROFILE_RESET';
export const USER_PROFILE_TOGGLE_NICKNAME_MODAL = 'USER_PROFILE_TOGGLE_NICKNAME_MODAL';
export const USER_PROFILE_TOGGLE_TIMEZONE_MODAL = 'USER_PROFILE_TOGGLE_TIMEZONE_MODAL';
export const USER_PROFILE_TOGGLE_PASSWORD_MODAL = 'USER_PROFILE_TOGGLE_PASSWORD_MODAL';
export const USER_PROFILE_TOGGLE_CHANGE_FEE_MODAL = 'USER_PROFILE_TOGGLE_CHANGE_FEE_MODAL';
export const USER_PROFILE_SELECT_BANK = 'USER_PROFILE_SELECT_BANK';
export const USER_PROFILE_PDF_OPEN = 'USER_PROFILE_PDF_OPEN';
export const USER_PROFILE_PDF_CLOSE = 'USER_PROFILE_PDF_CLOSE';
export const USER_PROFILE_TWO_FA_FLAG = 'USER_PROFILE_TWO_FA_FLAG';

export const ACTIVITY_UPDATE_FILTER = 'ACTIVITY_UPDATE_FILTER';

const initialActivityFilters = {
  [activityFilterKeys.activity]: '',
};

export const EXTERNAL_WALLET = 'EXTERNAL_WALLET';
export const INIT_EXTERNAL_WALLET = 'INIT_EXTERNAL_WALLET';

export const TOGGLE_ADD_WALLET_ADDRESS = 'showAddWalletAddress';
export const SELECT_WALLET_ADDRESS = 'selectedExternalAddressId';
export const TOGGLE_WALLET_ADDRESS_EDIT = 'showWalletAddressEdit';

export const UPDATE_TRANSACTION_HISTORY_FILTERS = 'UPDATE_TRANSACTION_HISTORY_FILTERS';
export const RESET_TRANSACTION_HISTORY_FILTERS = 'RESET_TRANSACTION_HISTORY_FILTERS';

const initialState = {
  activeTab: null,
  loading: false,
  userId: null,
  error: null,
  profilePicture: null,
  nicknameModal: false,
  timezoneModal: false,
  passwordModal: false,
  changeFeeModal: false,
  selectedBank: null,
  selectedBankId: 0,
  pdfPreview: false,
  pdfFile: null,
  rejectKYCModal: false,
  twoFAFlag: false,
  activityFilters: {...initialActivityFilters},
  showAddWalletAddress: false,
  showWalletAddressEdit: false,
  selectedExternalAddressId: false,
  transactionHistoryFilters: {
    search: null,
    startDate: null,
    endDate: null,
    transactionType: null,
  }
};

const userProfile = (state = initialState, action) => {
  switch(action.type) {
    case USER_PROFILE_SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };

    case USER_PROFILE_RESET:
      return { ...initialState, userId: action.payload };

    case USER_PROFILE_TOGGLE_NICKNAME_MODAL:
      return { ...state, nicknameModal: !state.nicknameModal };

    case USER_PROFILE_TOGGLE_TIMEZONE_MODAL:
      return { ...state, timezoneModal: !state.timezoneModal };

    case USER_PROFILE_TOGGLE_PASSWORD_MODAL:
      return { ...state, passwordModal: !state.passwordModal };

    case USER_PROFILE_TOGGLE_CHANGE_FEE_MODAL:
      return { ...state, changeFeeModal: !state.changeFeeModal };

    case USER_PROFILE_SELECT_BANK:
      return { ...state, selectedBankId: action.payload, showNumber: false };

    case USER_PROFILE_PDF_OPEN:
      return { ...state, pdfFile: action.payload, pdfPreview: true };

    case USER_PROFILE_PDF_CLOSE:
      return { ...state, pdfFile: null, pdfPreview: false };

    case USER_PROFILE_TWO_FA_FLAG:
      return { ...state, twoFAFlag: !state.twoFAFlag };

    case ACTIVITY_UPDATE_FILTER:
      return {
        ...state,
        activityFilters: {
          ...state.activityFilters,
          [action.payload.filterType]: action.payload.newValue
        }
      };
    case TOGGLE_ADD_WALLET_ADDRESS:
    case TOGGLE_WALLET_ADDRESS_EDIT:
    case SELECT_WALLET_ADDRESS:
      return {
        ...state,
        [action.type]: action.payload
      };
    case INIT_EXTERNAL_WALLET:
      return {
        ...state,
        userId: null,
        activeTab: USER_PROFILE_TAB_GENERAL,
        showAddWalletAddress: false,
        showWalletAddressEdit: false,
        selectedExternalAddressId: false,
      }

    case UPDATE_TRANSACTION_HISTORY_FILTERS:
      return { ...state,
        transactionHistoryFilters: {...state.transactionHistoryFilters, ...action.payload}
      };

    case RESET_TRANSACTION_HISTORY_FILTERS:
      return {...state, transactionHistoryFilters: {...initialState.initialState}};
    default:
      return state;
  }
};

export default userProfile;
