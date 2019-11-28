import React from 'react';
import { Form, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import { PrimaryButton } from '../../../components/styled-components/Buttons'
import { Input } from '../../../components/styled-components/Inputs';
import { validateResetPassword } from '../../../form-helpers/validation';
import { renderInputReactstrap } from "../../../form-helpers/renderFields";

const PasswordResetForm = ({ handleSubmit }) => (
  <form  className="form" onSubmit={handleSubmit}>
    <div className="m-b-30">
      <Field
        name="password"
        type="password"
        component={renderInputReactstrap}
        label="New Password"
        passwordSuccess={'Strong enough'}
        errorHint={true}
        placeholder={''} />
    </div>
    <div className="m-b-30">
      <Field
        name="passwordConfirm"
        type="password"
        component={renderInputReactstrap}
        label="Confirm Password"
        placeholder={''}
      />
    </div>
    <div className="form-group text-center">
      <PrimaryButton type="submit">
        Change Password
      </PrimaryButton>
    </div>
  </form>
);

export default reduxForm({
  form: 'resetPassword',
  validate: validateResetPassword,
  onSubmit: (values, dispatch, props) => {
    const { match } = props;
    // Combine the id from file (once uploaded, with the Redux Form Data
    props.resetPassword(values.password, values.passwordConfirm, match.params.token);
  }
})(PasswordResetForm);

