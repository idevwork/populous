import axios from 'axios';
import {ExchangeRate} from 'meteor/populous:api';
import config from './config';

const apiInstanceBinance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-MBX-APIKEY': config.apiKeyBinance,
  }
});

const baseUrlBinance = 'https://api.binance.com/api/v3/ticker/price';

async function calculateBlockchainRates() {
  try {
    const binanceEthUsd = await apiInstanceBinance.get(baseUrlBinance + '?symbol=ETHUSDT')
      .then(({data: {price}}) => Number(price));

    const binancePptUsd = (await apiInstanceBinance.get(baseUrlBinance + '?symbol=PPTETH')
      .then(({data: {price}}) => Number(price))) * binanceEthUsd;

    const okexPptUsd = await axios.get('https://www.okex.com/api/v1/ticker.do?symbol=ppt_usdt')
      .then(({data: {ticker: {buy}}}) => Number(buy));

    const okexEthUsd = await axios.get('https://www.okex.com/api/v1/ticker.do?symbol=eth_usdt')
      .then(({data: {ticker: {buy}}}) => Number(buy));

    await ExchangeRate.upsert(
      {
        from: 'PPT',
        to: 'USD',
      },
      {
        $set: {
          ask: ((binancePptUsd + okexPptUsd) / 2),
          bid: ((binancePptUsd + okexPptUsd) / 2),
        }
      },
    );
    await ExchangeRate.upsert(
      {
        from: 'ETH',
        to: 'USD',
      },
      {
        $set: {
          ask: ((binanceEthUsd + okexEthUsd) / 2),
          bid: ((binanceEthUsd + okexEthUsd) / 2),
        }
      },
    );
  } catch (error) {
    console.log('PPT rates calculations error: ', error);
  }
}

export default calculateBlockchainRates;
