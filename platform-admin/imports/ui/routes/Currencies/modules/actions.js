import {reset} from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { Meteor } from 'meteor/meteor';
import { Currency, LedgerBalance } from 'meteor/populous:api';

import requireConfirmation from '../../../components/ConfirmModal/modules/actions';
import {
  CURRENCY_CREATE,
  CURRENCY_MINT,
  CURRENCY_DESTROY,
  CURRENCY_TRANSFER,
  HISTORY_CURRENCY_CHANGE,
  GET_CURRENCY_BALANCE,
  CHANGE_DATE_PERIOD,
  SEARCH_VALUE_CHANGE,
} from "./index";
import store from "../../../../store/index";

export function CreateCurrency(symbol, title) {
  new Currency().callMethod('create', symbol, title, (err, res) => {
    if(err) {
      toastr.error('Error', err.reason);
    } else {
      toastr.success('Currency successfully created');
      getCurrencyBalance();
    }
  });

  return { type: CURRENCY_CREATE, payload: {} };
}

export function MintCurrency(currency, amount) {
  new Currency().callMethod('mint', currency, amount, (err, res) => {
    if(err) {
      toastr.error('Error', err.reason);
    } else {
      toastr.success(`Mint for ${amount} ${currency} done`);
      getCurrencyBalance();
    }
  });

  return { type: CURRENCY_MINT, payload: {} };
}

export function DestroyTokens(currency, amount) {
  console.log(store);
  new Currency().callMethod('destroy', currency, amount, (err, res) => {
    if(err) {
      toastr.error('Error', err.reason);
    } else {
      toastr.success('destroy of ' + amount + ' ' + currency + ' is done');
      getCurrencyBalance();
    }
  });

  return { type: CURRENCY_DESTROY, payload: {} };
}

export function TransferCurrency(currency, amount, fromAccount, toAccount) {
  new Currency().callMethod('transfer', currency, amount, fromAccount, toAccount, (err, res) => {
    if(err) {
      toastr.error('Error', err.reason);
    } else {
      toastr.success('Transfer of ' + amount + ' ' + currency + ' is done');
      getCurrencyBalance();
    }
  });

  return { type: CURRENCY_TRANSFER, payload: {} };
}

export function ChangeHistoryCurrency({nativeEvent:{target:{value}}}) {
  return {type: HISTORY_CURRENCY_CHANGE, payload: {currency: value}};
}

export function ChangeDatePeriod(from, to) {
  console.log('change date: ', from, to);
  return {type: CHANGE_DATE_PERIOD, payload: {fromDate: from, toDate: to}};
}

export function ChangeSearchQuery(query) {
  return {type: SEARCH_VALUE_CHANGE, payload: {search: query}};
}

export function getCurrencyBalance() {
  const { app: { currentUser } } = store.getState();

  currentUser.callMethod('getCurrencyBalance', (error ,response) => {
    if(!error) {
    store.dispatch({type: GET_CURRENCY_BALANCE, payload: {balance: response}});
    }
  });
}


export let enableCurrency = (currency) => {
  return (dispatch) => {
    currency.callMethod('enableCurrency', (err, res) => {
      if(err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Successfully updated');
      }
    });
  }
};
enableCurrency = requireConfirmation(enableCurrency, {
  text: 'Are you sure you are going to update currency status?'
});

export let deleteCurrency = (currency) => {
  return (dispatch) => {
    if (currency) {
      Meteor.call('currencies.delete', currency, (error, response) => {
        if(error) {
          toastr.error('Error', error.reason);
        } else {
          toastr.success('Success', 'Deleted a currency');
        }
      });
    } else {
      toastr.error('Error', 'Select a currency to delete');
    }
  }
};
deleteCurrency = requireConfirmation(deleteCurrency, {
  text: 'Are you sure you are going to delete the currency?'
});

