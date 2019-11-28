import {
  REQUEST_UPDATE_FILTER_TYPE_MY_QUEUE,
  REQUEST_UPDATE_FILTER_KEYWORD
} from './index';

const updateTypeFilter = (type) => {
	return {type: REQUEST_UPDATE_FILTER_TYPE_MY_QUEUE, payload: type};
};

const updateFullTextSearch = (text) => {
	return {type: REQUEST_UPDATE_FILTER_KEYWORD, payload: text};
};

export {
  updateTypeFilter,
  updateFullTextSearch
};
