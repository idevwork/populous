import React, { Fragment } from 'react';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import jsPDF from 'jspdf';
import { countries, currencySymbols } from 'meteor/populous:constants';

import { Small, P, LABEL } from '../../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import floor from "../../../../../helpers/formatters/floor";
import { removeWithMyQueue, markComplete } from '../MyQueue/modules/actions';
import { addToMyQueue, unassign } from '../../../Requests/components/MyQueue/modules/actions';

const printSlip = (data) => {
  const doc = new jsPDF();
  // TODO: This test data
  doc.setFontSize(24);
  doc.setFontStyle('bold');
  doc.text(10, 25, 'Request details');

  doc.setFontStyle('normal');
  doc.setFontSize(14);
  doc.text(10, 60, 'Bank:');
  doc.text(65, 60, 'Bank of England');
  doc.text(10, 67, 'Beneficiary Name:');
  doc.text(65, 67, 'Populous World, LTD');
  doc.text(10, 74, 'Sort Code:');
  doc.text(65, 74, '23-69-72');
  doc.text(10, 81, 'Account Number:');
  doc.text(65, 81, '05005164');
  doc.text(10, 95, 'Amount:');
  doc.text(65, 95, 'GBp' + ' ' + floor(data.amount - data.fee));

  // TODO: Make name unique
  doc.save(`fiat-deposit.pdf`);
}

const WithdrawDetailsModal = (props) => {
  const {isOpen, isMyQueue, toggle,
    dataModal,
  } = props;

  if (!dataModal) {
    return null;
  }

  const {
    email, user = {}, amount,
    currency, fee = 0, assignedDate, gbpAmount,
    bankCountry, bankName, beneficiaryName,
    sortCode, accountNumber, fromAccountId, dataId,
    _id, createdAt, status, executor,
  } = dataModal;

  let expiredDate, currentDate, isExpired;
  if (moment(assignedDate).isValid()) {
    expiredDate = moment(assignedDate).add(24, 'hours');
    currentDate = moment().utc();
    isExpired = currentDate.isAfter(expiredDate);
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom" style={{maxWidth: '992px'}}>
      <ModalHeader toggle={toggle}>Request details</ModalHeader>
      <ModalBody>
        <Row>
          <Col span={6}>
              <Small className="m-b-10">Type</Small>
              <P>Withdrawal request</P>

              <Small className="m-t-20 m-b-10">Amount</Small>
              <P>{currency} {floor(amount)}</P>
              {currency !== currencySymbols.GBP &&
              <P>
                {currencySymbols.GBP} {floor(gbpAmount)}
                {!!fee &&
              <React.Fragment>(include fee {fee} {currencySymbols.GBP})</React.Fragment>}
              </P>
              }

              <Small className="m-t-20 m-b-10">From account</Small>
              <P><a href="javascript:void(0);">{email}</a></P>

              <Small className="m-t-20 m-b-5">Receiving bank account, {bankCountry}</Small>
              <div className="border-row p-10 p-l-20 bottomless">
                <LABEL>BANK</LABEL>
                <p>{bankName}</p>
              </div>
              <div className="border-row p-10 p-l-20 bottomless">
                <LABEL>BENEFICIARY NAME</LABEL>
                <p>{beneficiaryName}</p>
              </div>

              <div className="border-row bottomless p-0">
                <Row className="p-r-15 p-l-15">
                  <Col xs={3} className="p-10 p-l-20" style={{borderRight: '2px solid #E1EBE5'}}>
                    <LABEL>SORT-CODE</LABEL>
                    <p>{sortCode}</p>
                  </Col>
                  <Col xs={9} className="p-10 p-l-20">
                    <LABEL>ACCOUNT NUMBER</LABEL>
                    <p>{accountNumber}</p>
                  </Col>
                </Row>
              </div>

              <div className="border-row p-10 p-l-20 bottomless">
                <LABEL>Payment purpose</LABEL>
                <p>Funds withdrawal. Account ID {fromAccountId}</p>
              </div>

              <div className="border-row grey-bg" style={{padding: '15px 22px'}}>
                <p className="text-bold text-right">Amount: &emsp; {currencySymbols.GBP} {floor(gbpAmount - fee)}</p>
              </div>

            <div className="m-t-40 text-center">
              <PrimaryButton
                md onClick={e => {
                e.preventDefault();
                printSlip(dataModal);
              }}
                outline
                className="m-0"
              >
                <img src="/images/icons/ico-file-download-blue.png" height={17} className="m-r-10"/>
                Download version for print
              </PrimaryButton>
            </div>
          </Col>

          <Col span={6}>
            <Small className="m-b-10">Request ID</Small>
            <P>{_id}</P>

            {user.isBorrower()
              ? <Fragment>
              <Small className="m-b-10">Company name</Small>
              <P>{user.companyName}</P>


              <Small className="m-b-10">Company number</Small>
              <P>{user.companyNumber}</P>
            </Fragment>
              : <Fragment>
                <Small className="m-b-10">User name</Small>
                <P>{typeof user.fullName === 'function' && user.fullName()}</P>
              </Fragment>
            }

            <Small className="m-t-20 m-b-10">Date, Time</Small>
            <P>{moment(createdAt).format('DD-MM-YYYY, hh:mm a')}</P>

            <Small className="m-t-20 m-b-10">Status</Small>
              <P className="m-b-10">{status}</P>


            { executor &&
            <Fragment>
              <Small className="m-t-20 m-b-10">Executor</Small>
              <P><a href="javascript:void(0);">{executor}</a></P>
            </Fragment>
            }
            { assignedDate &&
            <Fragment>
              <Small className="m-t-20 m-b-10">Assigned</Small>
              <P className={"m-b-10" + (isExpired ? 'red-color' : '')}>
                {isExpired && <img src="/images/icons/ico-attention.svg" height={24} className="m-r-10 m-b-5"/>}
                {`${moment(assignedDate).format('DD-MM-YYYY, hh:mm a')} to ${executor}`}
              </P>
            </Fragment>
            }

            { isMyQueue &&
            <div className="m-t-30">
              <PrimaryButton
                style={{width: 260}}
                className="m-t-5 m-b-30"
                onClick={() => {
                  markComplete(dataId);
                  toggle();
                }}
              >
                MARK AS COMPLETED
              </PrimaryButton>
              <PrimaryButton
                style={{width: 260}}
                outline className="m-0"
                onClick={() => {
                  removeWithMyQueue(dataId);
                  toggle();
                }}
              >
                REMOVE FROM MY QUEUE
              </PrimaryButton>
            </div>
            }
            { !isMyQueue && status === 'Being processed' &&
            <Fragment>
              <div className="m-t-20">
                <PrimaryButton style={{width: 260}} outline className="m-0"
                               onClick={() => {
                                 unassign([dataId]);
                                 toggle();
                               }}
                >
                  Unassign
                </PrimaryButton>
              </div>
              <div className="m-t-20">
                <PrimaryButton style={{width: 260}} outline className="m-0"
                               onClick={() => {
                                 unassign([dataId], true);
                                 toggle();
                               }}
                >
                  Reassign to myself
                </PrimaryButton>
              </div>
            </Fragment>
            }

            { !isMyQueue && status === 'Opened' &&
              <div className="m-t-20">
                <PrimaryButton style={{width: 260}} className="m-0"
                               onClick={() => {
                                 addToMyQueue([dataId]);
                                 toggle();
                               }}
                >
                  Add to my queue
                </PrimaryButton>
              </div>
            }
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default WithdrawDetailsModal;
