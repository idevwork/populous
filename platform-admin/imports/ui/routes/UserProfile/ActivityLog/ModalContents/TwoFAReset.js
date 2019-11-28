import React, {Fragment} from 'react';
import {Row, Col, FormGroup} from 'reactstrap';
import {populousEvents} from 'meteor/populous:constants';

import {Small, P} from '../../../../components/styled-components/Typography/index';
import {typeToLabel} from "../constants";


const TwoFAReset = ({requestId}) => {
  return (
    <Fragment>
      <div className={'m-b-10'}>
        <Small>Activity</Small>
        <P className="m-t-5 m-b-0">{typeToLabel[populousEvents.authReset]}</P>
      </div>

      <Row>
        <Col xs="12" lg="6">
          <Small>Request ID</Small>
          <P className="m-t-5 m-b-0">{requestId}</P>
        </Col>
      </Row>
    </Fragment>
  )
};

export default TwoFAReset;
