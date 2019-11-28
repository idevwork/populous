import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { PrimaryButton } from '../../../components/styled-components/Buttons';
import { H1 } from '../../../components/styled-components/Typography';
import Loading from '../../../components/Loading';
import PendingTable from './PendingTable';

const Invoices = ({loading, history, ...props}) => {

  if (loading) {
    return (<Loading />);
  }

  return (
    <Container>
      <Row className="m-b-30 m-t-30">
        <Col>
          <H1>
            INVOICES
          </H1>
        </Col>
        <Col className="text-right">
          <PrimaryButton  onClick={()=>{history.push('/contractTemplate')}}>
            CONTRACT TEMPLATE
          </PrimaryButton>
        </Col>
      </Row>
      <PendingTable {...props} />
    </Container>
  );
};

export default Invoices;
