import axios from 'axios';
import { ExchangeRate } from 'meteor/populous:api';

import config from './config';


const apiInstance = axios.create({
  headers: {
    Authorization: 'Bearer ' + config.apiKey,
    'Content-Type': 'application/json',
  }
});

const baseUrl = 'https://web-services.oanda.com/rates/api/v1/rates/';

const currencies = [
  'USD',
  'JPY',
  'EUR',
  'AUD',
  'CAD',
  'HKD',
  'GBP',
  'XAU',
  'ETH',
];

function exchangeRates() {
  currencies.forEach(currencySymbol => {
    const crossCurrencies = currencies.filter((currency) => currency !== currencySymbol);

    apiInstance.get(baseUrl + currencySymbol + '.json?quote=' + crossCurrencies.join('&quote=') + '&decimal_places=6')
      .then(handleResponse);
  });
}

async function handleResponse({ data: { base_currency, quotes } }) {
  for (const currencySymbol in quotes) {
    if (quotes.hasOwnProperty(currencySymbol)) {

      const currencyInfo = quotes[currencySymbol];

      const ask = Number.parseFloat(currencyInfo.ask),
        bid = Number.parseFloat(currencyInfo.bid);

      let exchangeRateDocument = await ExchangeRate.findOne({ from: base_currency, to: currencySymbol });

      if (!exchangeRateDocument) {
        exchangeRateDocument = new ExchangeRate({ from: base_currency, to: currencySymbol, ask, bid });
      } else {
        exchangeRateDocument.ask = ask;
        exchangeRateDocument.bid = bid;
      }

      exchangeRateDocument.save();
    }
  }
}

export default exchangeRates;
