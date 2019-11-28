import React, {Fragment} from 'react';
import {Row, Col, FormGroup} from 'reactstrap';
import {populousEvents} from 'meteor/populous:constants';

import {Small, P} from '../../../../components/styled-components/Typography/index';
import {typeToLabel} from "../constants";


const LoginSuccess = ({ip, userAgent}) => {
  return (
    <Fragment>
      <div className={'m-b-10'}>
        <Small>Activity</Small>
        <P className="m-t-5 m-b-0">{typeToLabel[populousEvents.loginSuccess]}</P>
      </div>

      <Row>
        <Col xs="12" lg="6">
          <Small>IP</Small>
          <P className="m-t-5 m-b-0">{ip}</P>
        </Col>
        <Col xs="6" lg="6">
          <Small>User Agent</Small>
          <P className="m-t-5 m-b-0">{userAgent}</P>
        </Col>
      </Row>
    </Fragment>
  )
};

export default LoginSuccess;
