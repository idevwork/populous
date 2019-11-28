import {
  TRANSACTION_UPDATE_FILTER_TYPE,
  TRANSACTION_UPDATE_FILTER_STATUS,
  TRANSACTION_UPDATE_FILTER_KEYWORD
} from "./index";

import { toastr } from 'react-redux-toastr';
import { Meteor } from 'meteor/meteor';

const updateTypeFilter = (type) => {
	return {type: TRANSACTION_UPDATE_FILTER_TYPE, payload: type};
};

const updateStatusFilter = (status) => {
	return {type: TRANSACTION_UPDATE_FILTER_STATUS, payload: status};
};

const updateFullTextSearch = (text) => {
	return {type: TRANSACTION_UPDATE_FILTER_KEYWORD, payload: text};
};

export default {
  updateTypeFilter,
  updateStatusFilter,
  updateFullTextSearch
};
