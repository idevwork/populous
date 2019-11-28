import {Meteor} from "meteor/meteor";
import {
  Request,
  User,
  Debtor,
} from 'meteor/populous:api';
import {requestTypes, countries, currencySymbols} from 'meteor/populous:constants';

import attachCommonData from "./attachCommonData";


export default function getDebtorsRequests(query) {
  const debtorsRequestsCursor = Request.find(query);
  const requestDebtorIds = debtorsRequestsCursor.map((request) => request.dataId);
  const handlerDebtor = Meteor.subscribe('debtor.ids', requestDebtorIds);

  if (!handlerDebtor.ready()) {
    return [];
  }

  return debtorsRequestsCursor
    .map((request) => {
      attachCommonData(request);

      const debtor = Debtor.findOne({_id: request.dataId});
      const requestedUser = debtor ? User.findOne({_id: debtor.userId}) : '';

      if (debtor) {
        const country = countries.filter((country) => {
          return country.key === debtor.country;
        });

        request.debtorName = debtor.name;
        request.companyNumber = debtor.companyNumber;
        request.country = debtor.country;
        request.countryName = country.length ? country[0].name : '';
      }

      request.requestedUserEmail = requestedUser ? requestedUser.emails[0].address : '';

      return request;
    });
}
