import React from 'react';
import { Container, Col, Row } from 'reactstrap';

import { H1 } from '../../components/styled-components/Typography';
import { HR } from '../../components/styled-components/Users/UserProfile';
import MyQueue from './components/MyQueue';
import RequestsPoll from './components/RequestsPool';

class RequestsList extends React.Component {
  render(){
    const {filters} = this.props;

    return (
      <Container>
        <Row className="m-b-30 m-t-30">
          <Col xs={'12'} md={'12'}>
            <H1>
              Requests
            </H1>
          </Col>
        </Row>

        <MyQueue />

        <HR style={{width: '100%'}} />

        <RequestsPoll filters={filters} />
      </Container>
    );
  }
}

export default RequestsList;
