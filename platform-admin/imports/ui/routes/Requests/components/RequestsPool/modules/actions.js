import { toastr } from 'react-redux-toastr';
import { ExchangeRate, Request } from 'meteor/populous:api';

import {
  REQUEST_SET_TOTAL
} from './index';
import store from '../../../../../../store/index';


const getTotalRequests = (type) => {
  new Request().callMethod('getTotalRequests', type, (error, response) => {
    if (!error) {
      store.dispatch({type: REQUEST_SET_TOTAL, payload: response});
    }
  });
};

export {
  getTotalRequests
};
