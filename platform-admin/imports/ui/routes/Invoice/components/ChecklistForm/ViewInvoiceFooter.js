import React from 'react';
import {Col, Row} from 'reactstrap';

import {H4} from '../../../../components/styled-components/Typography';


const ViewInvoiceFooter = ({sendEmail, deleteInvoice, redirectToActivityLogs, invoice}) => (
  <Row className="m-t-50 m-b-30">
    <Col className="d-flex justify-content-center">
      <div className="m-r-30" onClick={() => sendEmail([invoice.borrower.emailAddress()])} style={{cursor: 'pointer'}}>
        <H4><img src="/images/icons/ico-email.svg" className="m-r-10"/><span>CONTACT SELLER</span></H4>
      </div>

      <div className="m-r-30" onClick={() => redirectToActivityLogs([invoice.borrower._id])} style={{cursor: 'pointer'}}>
        <H4><img src="/images/icons/ico-lifetime-log.svg" className="m-r-10"/><span>LIFETIME LOG</span></H4>
      </div>

      <div onClick={() => deleteInvoice(invoice)} style={{cursor: 'pointer'}}>
        <H4><img src="/images/icons/ico-trash-1.svg" className="m-r-10"/><span>DELETE INVOICE</span></H4>
      </div>
    </Col>
  </Row>
);

export default ViewInvoiceFooter;
