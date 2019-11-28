import ethConnect from 'meteor/populous:eth-connect';

import { logEvent } from "./eventLogger";

const {
  config: {
    contract: { populousToken, },
  },
} = ethConnect;

logEvent('ppt', populousToken, 'Transfer');
