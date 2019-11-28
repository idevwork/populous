import {Meteor} from "meteor/meteor";
import {
  Request,
  User,
  Debtor,
  File,
} from 'meteor/populous:api';
import {requestTypes, countries, currencySymbols} from 'meteor/populous:constants';

import attachCommonData from "./attachCommonData";


export default function get2FAResetRequests(query) {
  const twoFARequestsCursor = Request.find(query);
  const requestsUserIds = twoFARequestsCursor.map((request) => request.userId);
  const handlerUserKyc = Meteor.subscribe('accounts.user-kyc', requestsUserIds);

  if (!handlerUserKyc.ready()) {
    return [];
  }

  return twoFARequestsCursor
    .map((request) => {
      attachCommonData(request);

      const requestedUser = User.findOne({_id: request.userId});

        request.twoFAFile = requestedUser ? requestedUser.twoFAKeyIDFile() : null;
        request.user = requestedUser;

        let idDocuments = (requestedUser && requestedUser.idDocumentIds || []).map((id) => {
          return File.findOne({_id: id})
        });
        request.idDocuments = idDocuments.filter(file => !!file);

      request.requestedUserEmail = requestedUser ? requestedUser.emails[0].address : '';

      return request;
    });
}
