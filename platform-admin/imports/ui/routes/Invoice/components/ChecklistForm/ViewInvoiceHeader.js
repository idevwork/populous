import React from 'react';
import {Col, Row} from 'reactstrap';
import classnames from 'classnames';
import {NavLink as NavLINK} from 'react-router-dom';

import {NaviText} from '../../../../components/styled-components/Typography';
import {Status} from '../../../../components/styled-components/Invoices/InvoiceCard';
import {H1} from '../../../../components/styled-components/Typography';


const ViewInvoiceHeader = ({currentUser, invoice}) => (
  <Row className="m-t-30 m-b-40 m-l-0 m-r-0">
    <Col xs="12" className={classnames({'has-card': currentUser.isInvestor()})}>
      <H1 className="d-block d-md-inline-block m-r-20">
        <NavLINK to="/invoices" className="m-r-10">
          <img src="/images/icons/ico-arrow-back.svg"/>
        </NavLINK>
        Invoice
        <NaviText className="m-l-40">{invoice.invoiceNumber}</NaviText>
      </H1>
      <Status status={invoice.status} className="invoice-status">{invoice.status}</Status>
    </Col>
  </Row>
);

export default ViewInvoiceHeader;
