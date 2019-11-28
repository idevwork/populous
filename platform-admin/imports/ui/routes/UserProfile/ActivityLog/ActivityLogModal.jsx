import React from 'react';
import { Modal, ModalHeader, ModalBody, } from 'reactstrap';
import {populousEvents} from 'meteor/populous:constants';

import modalContents from "./ModalContents/";


const activityLogTypeToComponent = {
  [populousEvents.loginSuccess]: modalContents.LoginSuccess,
  [populousEvents.bidPlaced]: modalContents.BidPlaced,
  [populousEvents.bidIncreased]: modalContents.BidIncreased,
  [populousEvents.bidJoined]: modalContents.BidJoined,
  [populousEvents.invoiceWinner]: modalContents.InvoiceWinner,
  [populousEvents.authReset]: modalContents.TwoFAReset,
  [populousEvents.pptWithdraw]: modalContents.PptWithdraw,
  [populousEvents.pptDeposited]: modalContents.PptDeposited,
  [populousEvents.pptReturned]: modalContents.PptReturned,
  [populousEvents.pptBalanceIncreased]: modalContents.PptBalanceIncreased,
  [populousEvents.pptBalanceDecreased]: modalContents.PptBalanceDecreased,
  [populousEvents.pokenWithdraw]: modalContents.PokenWithdraw,
};

const ActivityLogModal = (props) => {
  const { isOpen, toggle, activityLog, } = props;

  if (!activityLog)
    return null;

  const {type, data,} = activityLog;

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom" style={{maxWidth: '992px'}}>
      <ModalHeader toggle={toggle}>Activity details</ModalHeader>
      <ModalBody>
        {React.createElement(activityLogTypeToComponent[type], {...data})}
      </ModalBody>
    </Modal>
  );
};

export default ActivityLogModal;
