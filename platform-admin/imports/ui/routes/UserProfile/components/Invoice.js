import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toastr } from 'react-redux-toastr';

import { LinkButton } from '../../../components/styled-components/Buttons';
import floor from "../../../../helpers/formatters/floor";
import moment from "moment";
import { Link } from "react-router-dom";

const Invoice = ({ invoice }) => {

  const { _id: id, invoiceNumber, amount, createdAt, repayedPrice, penaltyPrice, } = invoice;

  let crowdsaleEth, crowdsaleId = '-';

  if (invoice.crowdsale) {
    crowdsaleId = invoice.crowdsale._id;
    crowdsaleEth = invoice.crowdsale.address || false;
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{invoiceNumber}</td>
      <td>{crowdsaleId}</td>
      <td>
        {crowdsaleEth ?
          <div className="d-flex align-items-center p-r-10">
            <CopyToClipboard
              text={crowdsaleEth}
              onCopy={() => toastr.success('successfully copied to clipboard')}
            >
              <img src="/images/icons/clipboard.png" width="19" height="23" style={{cursor: 'pointer' }}/>
            </CopyToClipboard>
          </div>
          : '-'
        }
      </td>
      <td>{floor(amount)}</td>
      <td>{floor(repayedPrice)}</td>
      <td>{floor(penaltyPrice)}</td>
      <td>{moment(createdAt).format('DD-MM-YYYY')}</td>
      <td><Link to={`/invoices/${id}`} target="_blank"><LinkButton>View</LinkButton></Link></td>
    </tr>
  );
};

export default Invoice;
