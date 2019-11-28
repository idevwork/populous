import React, {Fragment} from 'react';
import {Row, Col, FormGroup} from 'reactstrap';
import {populousEvents} from 'meteor/populous:constants';

import {Small, P} from '../../../../components/styled-components/Typography/index';
import {typeToLabel} from "../constants";


const PptDeposited = ({wallet, pptAmount, ledger, currencyAmount}) => {
  return (
    <Fragment>
      <div className={'m-b-10'}>
        <Small>Activity</Small>
        <P className="m-t-5 m-b-0">{typeToLabel[populousEvents.pptDeposited]}</P>
      </div>

      <Row>
        <Col xs="12" lg="6">
          <Small>PPT deposited</Small>
          <P className="m-t-5 m-b-0">{pptAmount} PPT</P>
        </Col>
        <Col xs="6" lg="6">
          <Small>Poken received</Small>
          <P className="m-t-5 m-b-0">{`${currencyAmount} ${ledger.currency}`}</P>
        </Col>
      </Row>
    </Fragment>
  )
};

export default PptDeposited;
