import React, {Fragment} from 'react';
import {Row, Col, FormGroup} from 'reactstrap';
import {populousEvents} from 'meteor/populous:constants';

import {Small, P} from '../../../../components/styled-components/Typography/index';
import {typeToLabel} from "../constants";


const InvoiceWinner = ({invoice}) => {
  return (
    <Fragment>
      <div className={'m-b-10'}>
        <Small>Activity</Small>
        <P className="m-t-5 m-b-0">{typeToLabel[populousEvents.invoiceWinner]}</P>
      </div>

      <Row>
        <Col xs="12" lg="6">
          <Small>Invoice ID</Small>
          <P className="m-t-5 m-b-0">{invoice._id}</P>
        </Col>
        <Col xs="6" lg="6">
          <Small>Sold Price</Small>
          <P className="m-t-5 m-b-0">{invoice.soldPrice}</P>
        </Col>
      </Row>
    </Fragment>
  )
};

export default InvoiceWinner;
