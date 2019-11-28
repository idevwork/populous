import React from 'react';
import { Row, Col } from 'reactstrap';
import { Field, reduxForm, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import { TransferCurrency } from '../../modules/actions';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';
import { renderSelectReactstrap } from '../../../../form-helpers/renderSelectFields';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { validateTransferToken } from '../../../../form-helpers/validation';

const TransferCurrencyForm = ({handleSubmit, pristine, submitting, currencies}) => (
  <form className="form custom multi" onSubmit={handleSubmit}>
    <Row>
      <Col xs={4}>
        <Field
          name="currency"
          type="select"
          component={renderSelectReactstrap}
          className="currency-ctrl"
          label="Currency"
          options={currencies}
          required={true}
        />
      </Col>
      <Col xs={8}>
        <Field
          name="amount"
          type="number"
          label="AMOUNT"
          placeholder="Amount"
          component={renderInputReactstrap}
          required={true}
        />
      </Col>
    </Row>

    <Row>
      <Col xs={12}>
        <Field
          name="fromAccount"
          type="text"
          label="FROM ACCOUNT"
          placeholder="Email Address"
          component={renderInputReactstrap}
          required={true}
        />
      </Col>
    </Row>

    <Row>
      <Col xs={12}>
        <Field
          name="toAccount"
          type="text"
          label="TO ACCOUNT"
          placeholder="Email Address"
          component={renderInputReactstrap}
          required={true}
        />
      </Col>
    </Row>

    <Row>
      <Col className="text-center m-t-20">
        <PrimaryButton md disabled={pristine || submitting}>
          Transfer tokens
        </PrimaryButton>
      </Col>
    </Row>
  </form>
);

export default reduxForm({
  form: 'transferCurrencyForm',
  validate: validateTransferToken,
  onSubmit: ({currency, amount, fromAccount, toAccount}, dispatch) => {
    dispatch(reset('transferCurrencyForm'));
    dispatch(TransferCurrency(currency, amount, fromAccount, toAccount));
  }
})(TransferCurrencyForm);
