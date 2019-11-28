import {
  RESET_UPDATE_FILTER_KEYWORD,
  REQUEST_UPDATE_FILTER_TYPE,
  REQUEST_UPDATE_FILTER_STATUS,
  REQUEST_UPDATE_PAGE,
  REQUEST_UPDATE_LOAD_ENTRIES
} from './index';

const updateFullTextSearch = (text) => {
  return {type: RESET_UPDATE_FILTER_KEYWORD, payload: text};
};

const onTypeChange = (type) => {
  return {type: REQUEST_UPDATE_FILTER_TYPE, payload:type};
};

const onStatusChange = (status) => {
  return {type: REQUEST_UPDATE_FILTER_STATUS, payload:status};
};

const onPageChange = (newPage) => {
  return {type: REQUEST_UPDATE_PAGE, payload:newPage};
};

const onLoadEntriesChange = (loadEntries) => {
  return {type: REQUEST_UPDATE_LOAD_ENTRIES, payload:loadEntries};
};

export {
  updateFullTextSearch,
  onTypeChange,
  onStatusChange,
  onPageChange,
  onLoadEntriesChange
};
