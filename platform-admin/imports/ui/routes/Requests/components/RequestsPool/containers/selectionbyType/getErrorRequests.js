import { Request} from 'meteor/populous:api';

import attachCommonData from "./attachCommonData";


export default function getErrorRequests(query, ) {
  return Request
    .find(query)
    .map((request) => {
      attachCommonData(request);

      return request;
    });
}
