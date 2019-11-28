import React from 'react';
import {invoiceStatuses} from 'meteor/populous:constants';

import Loading from '../../../components/Loading';
import ChecklistForm from './ChecklistForm/ChecklistForm';
import ViewInvoice from './ViewInvoice';

const Invoice = ({loading, ...props}) => {
  if (loading) {
    return <Loading/>;
  }

  if (props.invoice.status === invoiceStatuses.auctionPending) {
    return (<ChecklistForm {...props} />);
  } else {
    return (<ViewInvoice {...props} />);
  }
};

export default Invoice;
