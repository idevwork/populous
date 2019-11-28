import { Invoice } from 'meteor/populous:api';
import { invoiceStatuses } from "meteor/populous:constants";
import moment from "moment";

const calculatePenalties = async () => {
  const invoices = Invoice.find({
    status: invoiceStatuses.repaymentPending,
    dueDate: { $lte: moment.utc().subtract(30, 'days').toDate() },
    updatedAt: { $lte: moment.utc().subtract(8, 'hours').toDate() }
  });

  for (let i = 0; i < invoices.length; i++) {
    const invoice = invoices[i];
    const { amount, repayedPrice, penaltyPrice} = invoice;
    const days = moment().diff(moment(invoice.dueDate), 'days');

    if ((amount + penaltyPrice) > repayedPrice) {
      invoice.penaltyPrice = (invoice.amount * (days - 30)) * invoice.fees.dailyPenaltyFee / 100;
      await invoice.save();
    }
  }
};

export default calculatePenalties;
