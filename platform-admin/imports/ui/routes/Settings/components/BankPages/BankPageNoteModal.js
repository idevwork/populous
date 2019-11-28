import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, TextArea, Input } from 'reactstrap';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';

const BankPageNoteModal = (props) => {
  const { isOpen, toggle, transaction } = props;

  if (!transaction)
    return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom" style={{maxWidth: '400px'}}>
      <ModalHeader toggle={toggle}>Notes</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Input type="textarea" name="text" id="exampleText" rows={5}/>
          </Col>
        </Row>
        <Row className="m-t-10">
          <Col className="text-center">
          <PrimaryButton onClick={toggle}>Save Notes</PrimaryButton>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default BankPageNoteModal;
