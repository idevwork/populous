import ethConnect from 'meteor/populous:eth-connect';
import connectInstance from "../connectInstance";
import eventLogger from "./eventLogger";
import { Config, configKeys } from 'meteor/populous:config';

const {
  config: {
    contract: { depositContractsManager, },
  },
  methods: { event: { subscribeAll } },
} = ethConnect;

const eventsInPopulousContract = {
  EventNewDeposit: 'EventNewDeposit',
  EventDepositReleased: 'EventDepositReleased',
};

const config = Config.findOne({ key: configKeys.blockchain });
const blockNumber = config && config.value.lastPopulousBlockNumber ? config.value.lastPopulousBlockNumber : 0;

subscribeAll(connectInstance, depositContractsManager, blockNumber, async (eventName, event) => {
  switch (eventName) {
    case eventsInPopulousContract.EventNewDeposit:
      eventLogger('ppt', eventName, event.returnValues);
      break;
    case eventsInPopulousContract.EventDepositReleased:
      eventLogger('ppt', eventName, event.returnValues);
      break;
  }

  config.value.lastPopulousBlockNumber = event.blockNumber;
  await config.save();
});
