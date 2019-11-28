import {EmailTemplate, Invoice, User} from 'meteor/populous:api'
import {invoiceStatuses} from 'meteor/populous:constants'

import getDueInvoices from "./getDueInvoices";
import getInvoiceTable from "./getInvoiceTable";
import emailHeader from "./emailHeader";


export default async function BorrowerDueInvoicesWeekly() {
  const invoicesByBorrowerId = await (await getDueInvoices())
    .fetch()
    .reduce(
      (accumulator, current,) => {
        if (!accumulator[current.borrowerId]) {
          accumulator[current.borrowerId] = [];
        }

        accumulator[current.borrowerId].push(current);
        return accumulator;
      },
      {}
    );

  const users = await User
    .find({
      _id: {$in: Object.keys(invoicesByBorrowerId)}
    }).fetch();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const body = getInvoiceTable({
      subTitle: 'Here are the invoices which due date came in the last 7 days.',
      user,
      invoicesCursor: invoicesByBorrowerId[user._id],
      siteUrl: process.env.platformSiteUrl + 'invoice'
    });

    await user.sendEmail({
      body,
      subject: 'Due invoices list',
      header: emailHeader,
    })
  }
};

