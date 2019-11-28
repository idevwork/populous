import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';

import LoginForm from './LoginForm';
import Header from "../../../components/Header/Header";
import { H1, Lead } from '../../../components/styled-components/Typography'
import { Block } from '../../../components/styled-components/Divs';
import Footer from '../../../components/Footer/Footer';
import PasswordReset from '../../../components/modals/PasswordReset';

const initialState = {
  showResetPasswordForm: false,
  passwordType: 'password'
};

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }

  onResetPasswordLinkClick = (event) => {
    event.preventDefault();
    this.toggleModal('showResetPasswordForm');
  };

  togglePasswordType = () => {
    this.setState({
      passwordType : this.state.passwordType === 'input' ? 'password' : 'input'
    })
  }

  toggleModal = (key) => {
    if (this.state[key] !== undefined) {
      this.setState({ [key]: !this.state[key] });
    }
  };


  render() {
    const { showResetPasswordForm } = this.state;

    return (
      <Fragment>
        <Header
          backgroundImg='/images/sign-in.png'>
          <div className="text-center">
            <H1 invert>
              Log in to Populous
            </H1>
            <Lead invert className="m-t-20">
              Hello! Nice to see you here again
            </Lead>
          </div>
        </Header>
        <Container>
          <Row className="m-t-20">
            <Col xs={'12'} sm={{size: '10', offset: 1}} lg={{size: '6', offset: 3}}>
              <Block>
                <LoginForm
                  passwordType={this.state.passwordType}
                  onClickResetPassword={this.onResetPasswordLinkClick}
                  togglePasswordType={this.togglePasswordType}
                />
              </Block>
            </Col>
          </Row>
        </Container>
        <Footer/>
        <PasswordReset open={showResetPasswordForm} toggle={() => this.toggleModal('showResetPasswordForm')}/>
      </Fragment>
    );
  }
}

export default Login;
