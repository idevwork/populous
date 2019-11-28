import React from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';

import { Small, P, NaviText, Lead } from '../../../components/styled-components/Typography';
import { StyledInput } from '../../../components/styled-components/Inputs';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import floor from "../../../../helpers/formatters/floor";

const BidModal = (props) => {
  const { isOpen, toggle, bid, invoice, users } = props;
  const currency = invoice.getCurrency();
  const isGroup = bid.names.isGroup;

  const renderGroupBid = () => {
    return (
      <Col xs="12">
        <div className="d-none d-lg-flex flex-column p-l-30">
          <div className="d-flex align-items-center">
            <div className="m-r-10">
              <img src="/images/icons/ico-arrow-board.png" height="30" />
            </div>
            <div>
              <Small className="m-b-10">Goal bid</Small>
              <NaviText className="m-0">{currency.title} {floor(bid.sortAmount)}</NaviText>
            </div>
          </div>
          <div className="d-flex align-items-center m-t-20">
            <div className="m-r-10">
              <img src="/images/icons/ico-checking.png" height="30" />
            </div>
            <div>
              <Small className="m-b-10">Remaining amount</Small>
              <NaviText className="m-0">{currency.title} {floor(bid.getRemainingAmount())}</NaviText>
            </div>
          </div>
        </div>
        { bid.bidders.length > 0 &&
          <div className="m-t-30">
            <Col className="d-flex justify-content-between m-b-5">
              <Small>Participants</Small>
              <Small>Amount, {currency.title}</Small>
            </Col>
            <ListGroup>
              { bid.bidders.map((bidder, index) =>
                  <ListGroupItem key={index}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <P className="m-0">{users[bidder.userId].fullName()}</P>
                        <Small>{bid.formatDate(moment(bidder.createdAt))}</Small>
                      </div>
                      <P className="m-0">{floor(bidder.amount)}</P>
                    </div>
                  </ListGroupItem>
                )
              }
              <ListGroupItem className="text-right" color="secondary">
                <P className="m-0" style={{ fontWeight: '700' }}>Amount raised: {currency.title} {floor(bid.getRaisedBidAmount())}</P>
              </ListGroupItem>
            </ListGroup>
          </div>
        }
      </Col>
    );
  };

  const renderIndividualBid = () => {
    return (
      <Col xs="12">
        <div className="d-none d-lg-flex flex-column">
          <Lead>Bidder: {users[bid.userId].fullName()}</Lead>
        </div>
        <div className="m-t-30">
          <div className="d-flex justify-content-between m-b-5 col">
            <Small>Date, time</Small>
            <Small>Amount, {currency.title}</Small>
          </div>
          <ListGroup>
            <ListGroupItem>
              <div className="d-flex justify-content-between">
                <Small>{bid.formatDate(moment(bid.createdAt))}</Small>
                <P className="m-0">{floor(bid.amount)}</P>
              </div>
            </ListGroupItem>
            <ListGroupItem className="text-right" color="secondary">
              <P className="m-0" style={{ fontWeight: '700' }}>Current bid: {currency.title} {floor(bid.sortAmount)}</P>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Col>
    );
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom">
      <ModalHeader toggle={toggle}>
        {isGroup ?
        `Group bid: ${bid.names.groupName}`
        :
        `Individual Bid: ${users[bid.userId].fullName()}`
        }
      </ModalHeader>
      <ModalBody>
        <Form className="form">
          <Row>
            { isGroup ?
              renderGroupBid()
              :
              renderIndividualBid()
            }
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default BidModal;
