import moment from "moment";

import {cellStyle, headCellStyle, paragraphStyle, tableStyle} from "./styles";
import floor from "../../../helpers/formatters/floor";


function invoiceTableRow(invoice, siteBase){
  const currency = invoice.getCurrency();
  const {_id, invoiceNumber, dueDate, amount} = invoice;
  return `
  <tr>
    <td style="${cellStyle}; text-align: left;">
        <a href="${siteBase}/${_id}" style="color: #5CA0F6;text-decoration: none;">${invoiceNumber}</a>
    </td>
    <td style="${cellStyle} ; text-align: right;">
        <b>${floor(amount)}</b> ${currency.title}
    </td>
    <td style="${cellStyle}; text-align: center;">
        ${moment(dueDate).format('MM-DD-YYYY')}
    </td>
  </tr>
`;
}

export default function getInvoiceTable({user, subTitle, invoicesCursor, siteUrl}){
  let body = `
        <p style="${paragraphStyle}">
            Dear ${user.fullName()},
        </p>
        <p style="${paragraphStyle}">
           ${subTitle}
        </p>
        <table style="${tableStyle}">
          <thead>
            <th style="${headCellStyle}; text-align: left;">Invoice number</th>
            <th style="${headCellStyle}; text-align: right;">Amount</th>
            <th style="${headCellStyle}; text-align: center;">Due date</th>
          </thead>
          <tbody>`;

  invoicesCursor.forEach(invoice => {
    body += invoiceTableRow(invoice, siteUrl);
  });

  body += `</tbody>    
        </table>      
      `;

  return body;
}
