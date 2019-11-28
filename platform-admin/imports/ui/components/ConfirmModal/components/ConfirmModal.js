import React from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { PrimaryButton } from '../../styled-components/Buttons';

const ConfirmModal = ({ showModal, onSuccess, onCancel, text }) => {
  return (
    <Modal isOpen={showModal} className="custom" toggle={onCancel}>
      <ModalHeader toggle={onCancel}>Confirmation</ModalHeader>
      <ModalBody>
        <div className="m-b-20">
          {text.split('\n').map(function(item, key) {
            return (
              <span key={key}>
                {item}
                <br/>
              </span>
            )
          })}
        </div>
      </ModalBody>
      <ModalFooter>
        <Row>
          <Col sm={6} xs={12} className="text-center">
            <PrimaryButton onClick={onSuccess}>Confirm</PrimaryButton>
          </Col>
          <Col sm={6} xs={12} className="text-center">
            <PrimaryButton outline onClick={onCancel}>Cancel</PrimaryButton>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
