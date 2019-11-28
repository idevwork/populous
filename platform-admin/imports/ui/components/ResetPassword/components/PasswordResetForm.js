import React from 'react';

import { PrimaryButton } from '../../styled-components/Buttons'
import { Input, StyledInput } from '../../styled-components/Inputs';
import { LABEL } from '../../styled-components/Typography';

const PasswordResetForm = ({ sendPasswordResetEmail, onSuccess }) => {

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        sendPasswordResetEmail(e.target.email.value, onSuccess);
      }}
    >
      <LABEL htmlFor="email">
        Your account email
      </LABEL>
      <StyledInput name="email" type="email" />
      <div className="text-center m-t-40">
        <PrimaryButton>Send reset email</PrimaryButton>
      </div>
    </form>
  );
}

export default PasswordResetForm;
