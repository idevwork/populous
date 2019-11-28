import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {toastr} from "react-redux-toastr";
import { Modal, ModalHeader, ModalBody, Row, Col, } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DepositLog } from 'meteor/populous:api';
import { ledgerActionsTypes } from 'meteor/populous:constants';
import styled from 'styled-components';

import { P, Small } from '../../../../../components/styled-components/Typography';


const TransactionDetailsModal = ({showTransactionModal, toggleModal, transactionDetails, className,}) => {
  const {_id:transactionId,type,invoiceId,createdAt,status,fromValue,penalty,ethereumAddress,buyerId,fromCurrency,
    toCurrency, toValue} = transactionDetails;
  const amount = ledgerActionsTypes.exchange===type
    ? `${fromValue} ${fromCurrency} to ${toValue} ${toCurrency}`
    : `${fromValue} ${fromCurrency}`;

  return (
    <Modal isOpen={showTransactionModal} toggle={()=>{toggleModal('showTransactionModal')}} className={`${className} custom modal-lg`}>
      <ModalHeader toggle={()=>{toggleModal('showTransactionModal')}}>Transaction details</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
            <Small className={'m-b-5'}>Type</Small>
            <P>{type}</P>
          </Col>

          <Col md={6}>
            <Small className={'m-b-5'}>ID</Small>
            <P>{transactionId}</P>
          </Col>

          { invoiceId &&
            <Col md={6}>
              <Small className={'m-b-5'}>Invoice Id</Small>
              <Link to={`/invoices/${invoiceId}`}>{invoiceId}</Link>
            </Col>
          }

          <Col md={6}>
            <Small className={'m-b-5'}>Date, Time</Small>
            <P>{moment(createdAt).format('MM-DD-YYYY, h:mm:ss a')}</P>
          </Col>

          <Col md={6}>
            <Small className={'m-b-5'}>Total amount</Small>
            <P>{amount}</P>
          </Col>

          { status &&
            <Col md={6} className={'status-block'}>
              <Small className={'m-b-5'}>Status</Small>
              <P className={status}>{status}</P>
            </Col>
          }

          { penalty!==undefined &&
            <Col md={6}>
              <Small className={'m-b-5'}>Penalty</Small>
              <P>{penalty}</P>
            </Col>
          }

          { ethereumAddress &&
            <Col md={6} className={'addressBlock'}>
              <div className={'address'}>
                <Small className={'m-b-5'}>Ethereum address</Small>
                <span>{ethereumAddress}</span>
              </div>
              <div className={'p-t-20 m-l-10'}>
                <CopyToClipboard
                  text={ethereumAddress}
                  onCopy={()=>toastr.success('successfully copied to clipboard')}
                >
                  <img src="/images/icons/clipboard.png" className={'copyIcon'} alt=""/>
                </CopyToClipboard>
              </div>
            </Col>
          }

          { buyerId &&
            <Col md={6}>
              <Small className={'m-b-5'}>Buyer</Small>
              <Link to={`/users/${buyerId}`}>{buyerId}</Link>
            </Col>
          }
          </Row>
      </ModalBody>
    </Modal>
  );
};

export default styled(TransactionDetailsModal)`
  .status-block{
    .completed{
      color: #77c58c;
    }
  }
  .addressBlock{
    display: flex;
    .address{
      max-width: 90%;
      word-wrap: break-word;
      
      span{
        color: #5ca0f6;
      } 
    }
    .copyIcon{
      width: 17px;
      height: 23px;
      cursor: pointer;
    }
  }
`;
