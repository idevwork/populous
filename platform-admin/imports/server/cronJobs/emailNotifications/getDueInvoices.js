import moment from "moment";
import {EmailTemplate, Invoice, User} from 'meteor/populous:api'
import {invoiceStatuses} from 'meteor/populous:constants'


export default async function getDueInvoices(query = {}) {
  const now = moment();

  return await Invoice.find(
    {
      status: invoiceStatuses.repaymentPending,
      dueDate: {
        $lte: now.endOf('week').toDate(),
        $gte: now.startOf('week').toDate()
      },
      ...query,
    },
    {sort: {dueDate: -1}}
  );
}
