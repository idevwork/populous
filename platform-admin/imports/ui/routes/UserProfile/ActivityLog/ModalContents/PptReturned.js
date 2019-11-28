import React, {Fragment} from 'react';
import {Row, Col, FormGroup} from 'reactstrap';
import {populousEvents} from 'meteor/populous:constants';

import {Small, P} from '../../../../components/styled-components/Typography/index';
import {typeToLabel} from "../constants";


const PptReturned = ({ledger, pokensReturnedAmount, wallet, pptReturnedAmount}) => {
  return (
    <Fragment>
      <div className={'m-b-10'}>
        <Small>Activity</Small>
        <P className="m-t-5 m-b-0">{typeToLabel[populousEvents.pptReturned]}</P>
      </div>

      <Row>
        <Col xs="12" lg="6">
          <Small>Pokens Returned</Small>
          <P className="m-t-5 m-b-0">{`${pokensReturnedAmount} ${ledger.currency}`}</P>
        </Col>
        <Col xs="6" lg="6">
          <Small>PPT Returned</Small>
          <P className="m-t-5 m-b-0">{`${pptReturnedAmount} PPT`}</P>
        </Col>
      </Row>
    </Fragment>
  )
};

export default PptReturned;
