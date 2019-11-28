import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Row, Col} from 'reactstrap';

import {logUserIn} from '../modules/actions';
import {renderInputReactstrap} from '../../../form-helpers/renderFields';
import {validateLogin} from '../../../form-helpers/validation';
import {PrimaryButton} from "../../../components/styled-components/Buttons";

const LoginForm = ({handleSubmit, pristine, submitting, onClickResetPassword, passwordType, togglePasswordType, toggleRemember, checked}) => (
  <form className="form" onSubmit={handleSubmit}>
    <div className="m-b-30">
      <Field
        name="email"
        type="email"
        component={renderInputReactstrap}
        label="Email"
        placeholder=""
      />
    </div>
    <Field
      name="password"
      type={passwordType}
      component={renderInputReactstrap}
      label="Password"
      showHide={true}
      placeholder=""
      togglePasswordType={togglePasswordType}
    />
    <div className="form-group m-b-40 text-right">
      <a href="#" onClick={onClickResetPassword}>Forgot your password?</a>
    </div>
    <Row className="text-center">
      <Col xs={{ size: '8', offset: '2' }}>
        <PrimaryButton block disabled={pristine || submitting}>
          Log in
        </PrimaryButton>
      </Col>
    </Row>
  </form>
);

export default reduxForm({
  form: 'loginForm',

  // https://redux-form.com/7.0.4/docs/api/reduxform.md/#-code-onsubmit-function-code-optional-
  // onSubmit takes values and dispatch as parameters
  onSubmit: ({email, password}, dispatch) => {
    dispatch(logUserIn(email, password));
  },
  validate: validateLogin
})(LoginForm);
