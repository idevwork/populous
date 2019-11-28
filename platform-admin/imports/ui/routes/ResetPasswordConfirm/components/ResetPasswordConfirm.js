import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';

import PasswordResetForm from '../containers/PasswordResetFormContainer';
import { H1, H2 } from '../../../components/styled-components/Typography';
import { Block, Page, Content } from '../../../components/styled-components/Divs';
// import NavigationLoggedOut from '../../../components/Navigation/NavigationLoggedOut';
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";

const ResetPasswordConfirm = () => (
    <Fragment>
      <Header />
      <Content>
        <Container>
          <Row>
            <Col xs={'12'} sm={{size: '10', offset: 1}} lg={{size: '6', offset: 3}}>
              <Block>
                <div className="text-center m-b-30">
                  <H2>Set a new password</H2>
                </div>
                <PasswordResetForm />
              </Block>
            </Col>
          </Row>
        </Container>
      </Content>
      <Footer/>
    </Fragment>
);

export default ResetPasswordConfirm;
