import ethConnect from 'meteor/populous:eth-connect';

import eventLogger from "./eventLogger";

const {
  config: {
    contract: { _build, iERC20Token },
  },
} = ethConnect;

const eventsInIERC20TokenContract = {
  Transfer: 'Transfer',
  Approval: 'Approval',
};

function subscribeToIERC20TokenEvents(iERC20TokenAddress) {
  const iERC20TokenContract = _build('iERC20Token', iERC20TokenAddress);

  eventLogger(Object.values(eventsInIERC20TokenContract), iERC20TokenContract, 'ppt');
}

// TODO: you need to add an address for iERC20Token contract
export default subscribeToIERC20TokenEvents;
