import { Meteor } from 'meteor/meteor';
import axios from 'axios';
import { Config, configKeys } from 'meteor/populous:config';
import { requestTypes } from 'meteor/populous:constants';

Meteor.methods({
  async 'getTransactionsForAccount'(account_id) {
    const config = Config.findOne({key: configKeys.tide})
    if (config && config.value.token && config.value.token.access) {
      const apiInstance = axios.create({
        baseURL: 'https://api.tide.co/tide-backend/rest/api/v1',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.value.token.access}`
        }
      });
      try {
        const {data} = await apiInstance.get(`/external/accounts/${account_id}/transactions`);
        return data
      } catch (error) {
        console.log('Tide API ERROR', error.message);
      }
    }
    return []
  }
});
