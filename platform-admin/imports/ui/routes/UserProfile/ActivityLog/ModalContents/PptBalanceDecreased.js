import React, {Fragment} from 'react';
import {Row, Col, FormGroup} from 'reactstrap';
import {populousEvents} from 'meteor/populous:constants';

import {Small, P} from '../../../../components/styled-components/Typography/index';
import {typeToLabel} from "../constants";


const PptBalanceDecreased = ({wallet, newBalance}) => {
  return (
    <Fragment>
      <div className={'m-b-10'}>
        <Small>Activity</Small>
        <P className="m-t-5 m-b-0">{typeToLabel[populousEvents.pptBalanceDecreased]}</P>
      </div>

      <Row>
        <Col xs="12" lg="6">
          <Small>Previous Balance</Small>
          <P className="m-t-5 m-b-0">{`${wallet.balance} PPT`}</P>
        </Col>
        <Col xs="6" lg="6">
          <Small>New Balance</Small>
          <P className="m-t-5 m-b-0">{`${newBalance} PPT`}</P>
        </Col>
      </Row>
    </Fragment>
  )
};

export default PptBalanceDecreased;
