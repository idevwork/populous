import { scheduleJob } from 'node-schedule';
import {PlatformAction} from 'meteor/populous:api';
import subscribe from "./../ethConnect/eventHandlers/populousEvents"
import exchangeRates from "./currency/exchangeRates";
import calculateBlockchainRates from "./currency/calculateBlockchainRates";
import CloseCrowdsale from "./crowdsales/CloseCrowdsale";
import CalculatePenalties from "./invoices/CalculatePenalties";
import CheckDueDateForAuctionPending from "./invoices/CheckDueDateForAuctionPending";
import deactivateEndedMaintenance from "./maintenance/deactivateEnded";
import BlockchainCron from "./BlockchainCron";
import checkApproachingDueDate from "./invoices/CheckApproachingDueDate";
import BorrowerDueInvoicesWeekly from "./emailNotifications/BorrowerDueInvoicesWeekly";
import AdminDueInvoicesWeekly from "./emailNotifications/AdminDueInvoicesWeekly";
import AdminDueInvoicesDaily from "./emailNotifications/AdminDueInvoicesDaily";
import InvestorDueInvoicesWeekly from "./emailNotifications/InvestorDueInvoicesWeekly";
import syncWallet from './syncBlockchain/wallets';


BlockchainCron();
syncWallet();
scheduleJob('*/7 * * * *', () =>{
    //call events every 7 minutes, replacement.
   subscribe.subscribe();
});
scheduleJob('*/6 * * * *', syncWallet);
scheduleJob('*/15 * * * *', BlockchainCron);
//update everyday
scheduleJob('59 59 23 * * *', exchangeRates);
scheduleJob('0 0 * * *', calculateBlockchainRates);
scheduleJob('*/01 * * * *', CloseCrowdsale);
scheduleJob('0 0 */02 * * *', CalculatePenalties);
scheduleJob('0 0 * * *', checkApproachingDueDate);
scheduleJob('*/2 * * * *', CheckDueDateForAuctionPending);
scheduleJob('* * * * *', deactivateEndedMaintenance);

// scheduled with offset for prevent overlap
scheduleJob('23 * * 7', InvestorDueInvoicesWeekly); // each Sunday in 23:00
scheduleJob('20 23 * * 7', BorrowerDueInvoicesWeekly); // each Sunday in 23:20
scheduleJob('30 23 * * 7', AdminDueInvoicesWeekly); // each Sunday in 23:30
scheduleJob('40 23 * * *', AdminDueInvoicesDaily); // each day in 23:40

Meteor.startup(async () => {
  (new PlatformAction()).startJob();
});
