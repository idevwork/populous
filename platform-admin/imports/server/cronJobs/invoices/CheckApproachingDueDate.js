import { Invoice, Notification } from 'meteor/populous:api';
import { invoiceStatuses, populousEvents } from "meteor/populous:constants";
import moment from "moment";

// Create notifications
const checkApproachingDueDate = async () => {
  const invoices = Invoice.find({
    status: invoiceStatuses.repaymentPending,
    dueDate: { $lte: moment.utc().add(1, 'days').toDate() },
  }).fetch();

  invoices.forEach(async (invoice) => {
    const hours = moment().utc().diff(moment(invoice.dueDate), 'hours');
    let message;

    if (hours < 0 && hours > -24) {
      message = `Today is a due date of invoice <span class="blue">${invoice.invoiceNumber}</span>.`;
    } else if (hours < -24 && hours > -48) {
      message = `Tomorrow is a due date of invoice <span class="blue">${invoice.invoiceNumber}</span>.`;
    } else if (hours > 0) {
      message = `Invoice <span class="blue">${invoice.invoiceNumber}</span> is overdue.`;
    } else {
      return;
    }

    Meteor.call('emit.event', populousEvents.dueDate, {invoice, userId: invoice.borrowerId, message});
  });
};

export default checkApproachingDueDate;
