import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import PasswordResetFormContainer from '../ResetPassword';

const PasswordReset = ({open, toggle}) =>
  <Modal isOpen={open} className="custom" toggle={toggle}>
    <ModalHeader toggle={toggle}>Password reset</ModalHeader>
    <ModalBody>
      <div className="m-t-20 m-b-20">
        Please enter your account email. We’ll send a reset email with further instructions.
      </div>
      <PasswordResetFormContainer onSuccess={() => toggle()}/>
    </ModalBody>
  </Modal>
;

export default PasswordReset;
