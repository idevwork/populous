import React from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

import {PrimaryButton, } from '../../../components/styled-components/Buttons';
import { Card } from '../../../components/styled-components/Divs';
import { H3, Small, Wrap, P, LinkText } from '../../../components/styled-components/Typography';
import Guides from './Guides';

const Setup2FA = props => {
  const { secret, modal, generateKey, verifyCode, toggleModal, history:{push} } = props;

  return (
    <div>
      <Container>
        <Row>
          <Col className="text-center">
            <div className="m-t-50">
              <img src="/img/img-2FA-setup.png" alt="2FA Setup" width={260} />
            </div>
            <H3 className="m-t-30 m-b-50">Setup 2-factor authentication</H3>
            <P>
              2-factor authentication (2FA) is a reliable and simple way to keep your account safe. <br/>
              Security is our topmost priority. Please setup 2FA to be allowed to trade invoices.
            </P>
          </Col>
        </Row>
      </Container>
      <Guides />
      <Container>
        <Row>
          <Col className="text-center m-b-40">
            { !secret &&
              <div className="m-t-40">
                <div>
                  <PrimaryButton
                    onClick={e => {
                      e.preventDefault();
                      generateKey();
                    }}
                  >
                    Generate a 2FA key
                  </PrimaryButton>
                </div>

                <LinkText className="m-t-60"
                          onClick={()=> { localStorage.setItem('isNewUser', false); push('/update-profile');}}>
                  SETUP LATER
                </LinkText>
              </div>
            }

            { secret &&
              <Col lg={{ size: '8', offset: '2' }} className="m-t-40">
                <Card align="left">
                  <Row>
                    <Col lg={8}>
                      <p className="m-b-20">Add a new account at authentication app and scan the QR-code or enter the key below manually.</p>
                      <span>Enter this key:</span>
                      <Wrap>{ secret.base }</Wrap>
                    </Col>
                    <Col lg={4} className="text-center">
                      <span>QR-code:</span>
                      <img
                        src={ secret.img }
                        alt="QR code for your 2FA secret key"
                      />
                    </Col>
                  </Row>
                </Card>
                <PrimaryButton className="m-t-40" onClick={toggleModal}>
                  Next
                </PrimaryButton>
                <div className="m-t-30">
                  <Small className="m-b-10">Had problems with setup? Please check our tutorials</Small>
                  <Small className="m-b-10"><a href="https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en" target="_blank">Tutorial for Google Authenticator</a></Small>
                  <Small className="m-b-10"><a href="https://support.authy.com/hc/en-us" target="_blank">Tutorial for Authy</a></Small>
                </div>
              </Col>
            }
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggleModal} className="custom">
          <form className="form"
              onSubmit={e => {
                e.preventDefault();
                verifyCode(e.target.code.value);
              }}
            >
            <ModalHeader toggle={toggleModal}>Finish 2-factor Authentication setup</ModalHeader>
            <ModalBody>
              <Row>
                <Col sm={9} xs={8}>
                  <p>Now, activate 2FA.</p>
                  <p>Please enter the 6-digit code generated by the authentication app on your device to complete 2FA setup.</p>
                  <div className="form-group m-t-10">
                    <label>Authentication code</label>
                    <input className="form-control" placeholder="" type="text" name="code" maxLength="6" />
                    <Small className="pull-right m-t-5" style={{color: '#a5acb5'}}>Example: 123456</Small>
                  </div>
                </Col>
                <Col sm={3} xs={4} className="text-center">
                  <img src="/img/img-2FA-device.png" className="m-t-30" alt="2FA Setup Device" width={60} />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className="justify-content-center" style={{paddingTop: 10, paddingBottom: 20}}>
              <PrimaryButton>Finish 2fa setup</PrimaryButton>
            </ModalFooter>
          </form>
        </Modal>
      </Container>
    </div>
  );
};

export default Setup2FA;
