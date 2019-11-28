import React, {Fragment} from 'react';
import {Row, Col, FormGroup} from 'reactstrap';
import {populousEvents} from 'meteor/populous:constants';

import {Small, P} from '../../../../components/styled-components/Typography/index';
import {typeToLabel} from "../constants";


const PptWithdraw = ({wallet, amount, externalAddress}) => {
  return (
    <Fragment>
      <div className={'m-b-10'}>
        <Small>Activity</Small>
        <P className="m-t-5 m-b-0">{typeToLabel[populousEvents.pptWithdraw]}</P>
      </div>

      <Row>
        <Col xs="12" lg="6">
          <Small>Withdraw Amount</Small>
          <P className="m-t-5 m-b-0">{amount} PPT</P>
        </Col>
        <Col xs="6" lg="6">
          <Small>Destination Address</Small>
          <P className="m-t-5 m-b-0">{externalAddress.address}</P>
        </Col>
      </Row>
    </Fragment>
  )
};

export default PptWithdraw;
