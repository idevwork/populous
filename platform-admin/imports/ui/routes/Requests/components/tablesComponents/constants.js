import {requestTypes as allRequestTypes} from 'meteor/populous:constants';
import getWithdrawRequests from "../RequestsPool/containers/selectionbyType/getWithdrawRequests";
import getErrorRequests from "../RequestsPool/containers/selectionbyType/getErrorRequests";
import get2FAResetRequests from "../RequestsPool/containers/selectionbyType/get2FAResetRequests";
import getDebtorsRequests from "../RequestsPool/containers/selectionbyType/getDebtorsRequests";


export const requestTypes = {
  withdraw: allRequestTypes.withdraw,
  debtorList: allRequestTypes.debtorList,
  reset2fa: allRequestTypes.reset2fa,
  blockchainError: allRequestTypes.blockchainError
};

export const typeToLabel = {
  [allRequestTypes.withdraw] : 'Withdrawal',
  [allRequestTypes.debtorList] : 'New debtor',
  [allRequestTypes.reset2fa] : '2FA reset',
  [allRequestTypes.blockchainError] : 'Error',
};

export const typeToSelector = {
  [requestTypes.reset2fa]: get2FAResetRequests,
  [requestTypes.debtorList]: getDebtorsRequests,
  [requestTypes.withdraw]: getWithdrawRequests,
  [requestTypes.blockchainError]: getErrorRequests,
};
