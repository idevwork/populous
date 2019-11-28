import {Meteor} from 'meteor/meteor';
import {EmailTemplate, Invoice, User} from 'meteor/populous:api'
import {userRoles, invoiceStatuses} from 'meteor/populous:constants'
import moment from "moment/moment";

import getInvoiceTable from "./getInvoiceTable";
import getDueInvoices from "./getDueInvoices";
import emailHeader from "./emailHeader";


export default async function AdminDueInvoicesDaily() {
  const now = moment();

  const dueInvoices = await getDueInvoices({
    dueDate: {
      $lte: now.endOf('day').toDate(),
      $gte: now.startOf('day').toDate()
    },
  });

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
      user,
      subTitle: 'Here are the invoices which are due today.',
      invoicesCursor: dueInvoices,
      siteUrl: Meteor.absoluteUrl() + 'invoices'
    },);

    await user.sendEmail({
      body,
      subject: 'Due invoices list',
      header: emailHeader,
    });
  }
}
