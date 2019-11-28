import React from 'react';
import { Row, Col, Modal, Form, FormGroup, Input } from 'reactstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toastr } from 'react-redux-toastr';

import { TransitionModalHeader, TransitionModalBody } from '../../../components/styled-components/Transactions/Modal';
import { Small, P } from '../../../components/styled-components/Typography';

const TransactionModal = (props) => {
  const { isOpen, toggle, bid, transaction } = props;

  if (!transaction)
    return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom" style={{maxWidth: '992px'}}>
      <TransitionModalHeader toggle={toggle}>Transaction details</TransitionModalHeader>
      <TransitionModalBody>
        <Form className="form">
          <Row>
            <Col xs="12" lg="6">
              <FormGroup>
                <div className="d-flex">
                  <div>
                    <Small>Type</Small>
                    <P className="m-t-5 m-b-0">PPT deposit</P>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col xs="6" lg="6">
              <FormGroup>
                <div className="d-flex">
                  <div>
                    <Small>ID</Small>
                    <P className="m-t-5 m-b-0">123456789</P>
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="6">
              <FormGroup>
                <div className="d-flex">
                  <div>
                    <Small>Amount</Small>
                    <P className="m-t-5 m-b-0">1,000.00</P>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col xs="6" lg="6">
              <FormGroup>
                <div className="d-flex">
                  <div>
                    <Small>Date, Time</Small>
                    <P className="m-t-5 m-b-0">01-25-2018, 1:55 pm</P>
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="6">
              <FormGroup>
                <div>
                  <Small>From address</Small>
                  <a href="#" style={{wordWrap: 'break-word', width: '90%', display: 'inline', lineHeight: '32px'}}>0x3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</a>
                  <CopyToClipboard
                    text={"0x3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"}
                    onCopy={()=>toastr.success('successfully copied to clipboard')}
                  >
                    <img src="/images/icons/clipboard.png" width="19" height="23" style={{marginLeft: '7px', cursor: 'pointer'}} />
                  </CopyToClipboard>
                </div>
              </FormGroup>
            </Col>
            <Col xs="6" lg="6">
              <FormGroup>
                <div className="d-flex">
                  <div>
                    <Small>Status</Small>
                    <P className="m-t-5 m-b-0" style={{color: '#87cc99'}}>Completed</P>
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="6">
              <FormGroup>
                <div className="d-flex">
                  <div>
                    <Small>To account</Small>
                    <Input plaintext>F4hDW5sG</Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col xs="12" lg="6">
              <FormGroup>
                <div>
                  <Small>Ethereum address</Small>
                  <a href="#" style={{wordWrap: 'break-word', width: '90%', display: 'block', lineHeight: '26px'}}>0x3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy</a>
                  <CopyToClipboard
                    text={"0x3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"}
                    onCopy={()=>toastr.success('successfully copied to clipboard')}
                  >
                    <img src="/images/icons/clipboard.png" width="19" height="23" style={{position: 'absolute', top: '20px', right: '16px', cursor: 'pointer'}} />
                  </CopyToClipboard>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="6">
              <FormGroup>
                <div>
                  <Small>PPT deposit address</Small>
                  <a href="#" style={{wordWrap: 'break-word', width: '90%', display: 'inline', lineHeight: '32px'}}>0x3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</a>
                  <CopyToClipboard
                    text={"0x3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"}
                    onCopy={()=>toastr.success('successfully copied to clipboard')}
                  >
                    <img src="/images/icons/clipboard.png" width="19" height="23" style={{marginLeft: '7px', cursor: 'pointer'}} />
                  </CopyToClipboard>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </TransitionModalBody>
    </Modal>
  );
};

export default TransactionModal;
