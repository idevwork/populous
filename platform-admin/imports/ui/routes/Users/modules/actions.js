import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { User } from 'meteor/populous:api';

import { showEmailForm } from '../../SendEmail/modules/actions';

import {
  INIT_USER_FILTER, INVOICE_SET_SALE_PRICE_LIMITS, INVOICE_UPDATE_FILTERS,
  INVOICE_UPDATE_FILTERS_VISIBILITY, EMAIL_CHANGED, FIRSTNAME_CHANGED, LASTNAME_CHANGED, USER_LOADMORE,
  SET_STATUS_FILTER, SET_KEYWORD_FILTER, REQUEST_UPDATE_FILTER_TYPE, SET_ROLE_FILTER, SET_SIC_FILTER,
} from './index';

export function updateFiltersVisibility() {
  return {type: INVOICE_UPDATE_FILTERS_VISIBILITY};
}

export function updateFiltersStatuses(status) {
  return (dispatch, getState) => {

    const {InvoicesList: {filters, filters: {statuses}}} = getState();
    const newStatuses = [...statuses];

    if (newStatuses.includes(status)) {
      newStatuses.splice(newStatuses.indexOf(status), 1);
    } else {
      newStatuses.push(status);
    }

    dispatch({type: INVOICE_UPDATE_FILTERS, payload: {filters: {...filters, statuses: newStatuses,}}});
  }
}

export function updateFiltersCurrency(event) {
  const {nativeEvent: {target: {value}}} = event;
  return {type: INVOICE_UPDATE_FILTERS, payload: {key: 'currency', value,}};
}

export function updateFiltersSalePrice(salePrice) {
  return {type: INVOICE_UPDATE_FILTERS, payload: {key: 'salePrice', value: salePrice,}};
}

export function updateDueDates(dueDates) {
  return {type: INVOICE_UPDATE_FILTERS, payload: {key: 'dueDate', value: dueDates,}};
}

export function updateFullTextSearch(value) {
  return {type: INVOICE_UPDATE_FILTERS, payload: {key: 'fullText', value: value,}};
}

export function updateSortBy(value) {
  return {type: INVOICE_UPDATE_FILTERS, payload: {key: 'sortBy', value: value,}};
}

export function updatePerPage(value) {
  return {type: INVOICE_UPDATE_FILTERS, payload: {key: 'perPage', value: value,}};
}

export function Verify(email) {
    new User().callMethod('verifyUserByEmail', email.address, (err, res) => {
		if (err) toastr.error('Error', err.reason);
		else toastr.success('Successfully Done');
	});
  return { type: INVOICE_UPDATE_FILTERS, payload: { } };
}

export function Block(email) {
  new User().callMethod('blockUserByEmail', email.address, (err, res) => {
    if(err)
      toastr.error('Error', err.reason);
    else
      toastr.success('Successfully Done');
  });
  return { type: INVOICE_UPDATE_FILTERS, payload: {} };
}

export function Remove(email) {
  new User().callMethod('removeUserByEmail', email.address, (err, res) => {
		if (err) toastr.error('Error', err.reason);
		else toastr.success('Successfully Done');
	});
  return { type: INVOICE_UPDATE_FILTERS, payload: { } };
}

export function loadMore() {
  return {type: USER_LOADMORE, payload: {}};
}

export function emailChanged(email) {
  const { nativeEvent: { target: { value } } } = email;
  return {type: EMAIL_CHANGED, payload: {key: 'email_changed', value: value}};
}

export function firstNameChanged(firstName) {
  const { nativeEvent: { target: { value } } } = firstName;
  return {type: FIRSTNAME_CHANGED, payload: {key: 'firstNameChanged', value: value}};
}

export function lastNameChanged(lastName) {
  const { nativeEvent: { target: { value } } } = lastName;
  return {type: LASTNAME_CHANGED, payload: {key: 'lastNameChanged', value: value}};
}

export function resetFilters() {
  return {type: INIT_USER_FILTER};
}

function onTypeChange(type) {
  return { type: REQUEST_UPDATE_FILTER_TYPE, payload:type };
}

function onStatusChange(status) {
  return { type: SET_STATUS_FILTER, payload:status };
}

function onKeywordChange(keyword) {
  return { type: SET_KEYWORD_FILTER, payload: keyword };
}

function sendEmail(users) {
  return (dispatch, getState) => {
    dispatch(showEmailForm(users));
    dispatch(push('/send-email'));
  };
}
function onRoleChange(role) {
  return { type: SET_ROLE_FILTER, payload: role };
}

function onSicChange(sic) {
  return { type: SET_SIC_FILTER, payload: sic };
}

export default {
	Verify,
	Block,
	Remove,
	updateFiltersVisibility,
  updateSortBy,
  emailChanged,
  firstNameChanged,
  lastNameChanged,
  loadMore,
  onStatusChange,
  onKeywordChange,
  sendEmail,
  onTypeChange,
  resetFilters,
  onRoleChange,
  onSicChange,
};
