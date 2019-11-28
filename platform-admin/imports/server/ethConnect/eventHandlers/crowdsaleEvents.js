import {
  invoiceStatuses,
  crowdsaleStatuses,
} from 'meteor/populous:constants';
import ethConnect from 'meteor/populous:eth-connect';
import {Invoice, Crowdsale, Bid} from 'meteor/populous:api';

import connectInstance from "../connectInstance";
import eventLogger, { logEvent } from "./eventLogger";
import { hexToAscii } from "../helpers";


const {
  config: {
    contract: { _build, populous, crowdsaleManager, },
  },
  methods: { event: { subscribe } },
} = ethConnect;

const eventsList = {
  EventGroupCreated: 'EventGroupCreated',
  EventGroupGoalReached: 'EventGroupGoalReached',
  EventNewBid: 'EventNewBid',
  EventCrowdsaleOpen: 'EventCrowdsaleOpen',
  EventCrowdsaleClosed: 'EventCrowdsaleClosed',
  EventCrowdsaleWaiting: 'EventCrowdsaleWaiting',
  EventPaymentReceived: 'EventPaymentReceived',
  EventCrowdsaleCompleted: 'EventCrowdsaleCompleted',
  EventGroupCreationFailed: 'EventGroupCreationFailed',
};

const eventInPopulousContract = {
  // EventBeneficiaryFunded: 'EventBeneficiaryFunded',
  // EventLosingGroupBidderRefunded: 'EventLosingGroupBidderRefunded',
  // EventPaymentReceived: 'EventPaymentReceived',
  // EventWinnerGroupBidderFunded: 'EventWinnerGroupBidderFunded',
};