import React from 'react'
import { Container, Row, Col } from 'reactstrap';

import { P } from '../styled-components/Typography';
import { Footer as StyledFooter } from '../styled-components/Divs';

const Footer = () =>
  <StyledFooter>
    <Container>
      <Row>
        <Col sm={12} className="text-left">
          <P invert>© 2018. <b>Populous World Ltd.</b> All Rights Reserved</P>
        </Col>
      </Row>
    </Container>
  </StyledFooter>;

export default Footer
