import {User} from 'meteor/populous:api';
import {Invoice} from 'meteor/populous:api';
import {invoiceStatuses} from 'meteor/populous:constants';


const checkDueDateForAuctionPending = async() => {
  Invoice.update({
      status: invoiceStatuses.auctionPending,
      dueDate: {$lte: new Date()},
    }, {status: invoiceStatuses.auctionRejected}
  );
};

export default checkDueDateForAuctionPending;
