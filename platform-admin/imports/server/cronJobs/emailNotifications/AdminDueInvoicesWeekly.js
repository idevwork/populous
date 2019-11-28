import {Meteor} from 'meteor/meteor';
import {EmailTemplate, Invoice, User} from 'meteor/populous:api'
import {userRoles, invoiceStatuses} from 'meteor/populous:constants'

import getInvoiceTable from "./getInvoiceTable";
import getDueInvoices from "./getDueInvoices";
import emailHeader from "./emailHeader";


export default async function AdminDueInvoicesWeekly() {
  const dueInvoices = await getDueInvoices();

  if (dueInvoices.count() === 0) {
    return;
  }

  const users = await User
    .find({
      role: userRoles.admin,
    }).fetch();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const body = getInvoiceTable({
      subTitle: 'Here are the invoices which are due this week.',
      user,
      invoicesCursor: dueInvoices,
      siteUrl: Meteor.absoluteUrl() + 'invoices'
    });

    await user.sendEmail({
      body,
      subject: 'Due invoices list',
      header: emailHeader,
    })
  }
}
