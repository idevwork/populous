import {populousEvents} from 'meteor/populous:constants';

export const typeToLabel = {
  [populousEvents.loginSuccess]: 'Login',
  [populousEvents.bidPlaced]: 'Bid placed',
  [populousEvents.bidIncreased]: 'Bid increased',
  [populousEvents.bidJoined]: 'Bid Joined',
  [populousEvents.invoiceWinner]: 'Invoice winner',
  [populousEvents.authReset]: '2FA Reset Request',
  [populousEvents.pptWithdraw]: 'PPT withdraw',
  [populousEvents.pptDeposited]: 'PPT to Pokens deposit',
  [populousEvents.pptReturned]: 'PPT deposit returned',
  [populousEvents.pptBalanceIncreased]: 'Wallet balance increase',
  [populousEvents.pptBalanceDecreased]: 'Wallet Balance Decreased',
  [populousEvents.pokenWithdraw]: 'Poken Withdraw Request',
};


export const filterKeys = {
  activity: 'activity',
  keyword: 'keyword',
  dateRange: 'dateRange',
};
