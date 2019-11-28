import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux'
import { sessionReducer } from 'redux-react-session';

import app from '../ui/wrappers/PrivateApp/modules';
import UsersList from '../ui/routes/Users/modules';
import TransactionsList from '../ui/routes/Transactions/modules';
import invoicesList from '../ui/routes/InvoicesList/modules';
import invoiceDetail from '../ui/routes/Invoice/modules';
import contractTemplate from '../ui/routes/ContractTemplate/modules';
import userProfile from '../ui/routes/UserProfile/modules';
import emailTemplatesList from '../ui/routes/EmailTemplate/modules';
import newEmailTemplate from '../ui/routes/AddEmailTemplate/modules';
import sendEmail from '../ui/routes/SendEmail/modules';
import confirmModal from '../ui/components/ConfirmModal/modules';
import currenciesList from '../ui/routes/Currencies/modules';
import settings from "../ui/routes/Settings/modules";
import RequestsList from '../ui/routes/Requests/components/RequestsPool/modules';
import MyQueue from '../ui/routes/Requests/components/MyQueue/modules';

import setup2FA from '../ui/routes/Setup2FA/modules';
import requires2FA from '../ui/components/Requires2FA/modules';
import confirmReset from '../ui/routes/ResetTwoFAKey/modules';

const rootReducer = combineReducers({
  session: sessionReducer,
  form: formReducer, // Redux Form has to have key 'form'
  router: routerReducer,
  toastr: toastrReducer,
  app,
  UsersList,
  TransactionsList,
  invoicesList,
  invoiceDetail,
  userProfile,
  emailTemplatesList,
  newEmailTemplate,
  contractTemplate,
  sendEmail,
  confirmModal,
  currenciesList,
  settings,




  RequestsList,
  MyQueue,
  setup2FA,
  requires2FA,
  confirmReset
});

export default rootReducer;
