import {EmailTemplate, Invoice, User, Bid} from 'meteor/populous:api'
import {invoiceStatuses} from 'meteor/populous:constants'

import getDueInvoices from "./getDueInvoices";
import getInvoiceTable from "./getInvoiceTable";
import emailHeader from "./emailHeader";


export default async function InvestorDueInvoicesWeekly() {
  const invoiceIdToDueInvoice = await (await getDueInvoices())
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

  const investorIdToInvoices = await Bid.find(
    {invoiceId: {$in: Object.keys(invoiceIdToDueInvoice)}}
  )
    .fetch()
    .reduce((accumulator, bid) => {
      const addInvestorToInvoiceArray = ({userId}) => {
        if (!accumulator[userId]) {
          accumulator[userId] = [];
        }

        accumulator[userId] = bid.invoiceId;
      };

      if (bid.isGroup()) {
        bid.bidders.forEach(addInvestorToInvoiceArray);
      } else {
        addInvestorToInvoiceArray(bid);
      }
    }, {});

  const users = await User
    .find({
      _id: {$in: Object.keys(investorIdToInvoices)}
    }).fetch();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const body = getInvoiceTable({
      subTitle: 'Here are the invoices which are due this week.',
      user,
      invoicesCursor: investorIdToInvoices[user._id].map((invoiceId) => invoiceIdToDueInvoice[invoiceId]),
      siteUrl: process.env.platformSiteUrl + 'invoice'
    });

    await user.sendEmail({
      body,
      subject: 'Due invoices list',
      header: emailHeader,
    })
  }
};
