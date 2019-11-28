import {Meteor} from "meteor/meteor";
import {
  Request,
  User,
  LedgerLog,
  DepositLog,
  ExternalAddress,
  Wallet,
  File,
  Debtor,
  Bank,
  ExchangeRate,
  Invoice
} from 'meteor/populous:api';
import {requestTypes, countries, currencySymbols} from 'meteor/populous:constants';

import attachCommonData from "./attachCommonData";


export default function getWithdrawRequests(query) {
  const withdrawRequestsCursor = Request.find(query);
  const requestBankIds = withdrawRequestsCursor.map((request) => request.bankId);
  const requestLedgerLogIds = withdrawRequestsCursor.map((request) => request.dataId);
  const handlerBank = Meteor.subscribe('bank.ids', requestBankIds);
  const handlerLedgerLog = Meteor.subscribe('ledgerLogs.ids', requestLedgerLogIds);

  if (!handlerLedgerLog.ready() || !handlerBank.ready()) {
    return [];
  }
  return withdrawRequestsCursor
    .map((request) => {
      attachCommonData(request);

      const ledgerLog = LedgerLog.findOne(request.dataId);

      if (ledgerLog) {
        request.fromAccountId = ledgerLog.fromUserId;
        request.currency = ledgerLog.fromCurrency;
      }

      request.user = User.findOne(request.userId) || '';
      const bank = Bank.findOne({_id: request.bankId});
      const bankCountry = countries.find((country) => {
        return country.key === bank.country;
      });
      request.bankCountry = bankCountry ? bankCountry.name : '';

      request.email = request.user ? request.user.emailAddress() : '';
      request.bankName = bank ? bank.name : '';
      request.beneficiaryName = 'Beneficiary Name';
      request.sortCode = bank.sortCode;
      request.accountNumber = bank.number;
      if (request.currency !== currencySymbols.GBP) {
        let rate = 1;
        const exchangeRate = ExchangeRate.findOne({from: ledgerLog.fromCurrency, to: currencySymbols.GBP});

        if (exchangeRate) {
          rate = exchangeRate.ask;
        }

        request.gbpAmount = rate * request.amount
      } else {
        request.gbpAmount = request.amount
      }


      return request;
    });
}
