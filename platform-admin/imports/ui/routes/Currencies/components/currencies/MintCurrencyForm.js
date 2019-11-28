import React from 'react';
import { Row, Col } from 'reactstrap';
import { Field, reduxForm, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import { MintCurrency } from '../../modules/actions';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';
import { renderSelectReactstrap } from '../../../../form-helpers/renderSelectFields';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { currencyToken } from '../../../../form-helpers/validation';

const MintCurrencyForm = ({handleSubmit, pristine, submitting, currencies}) => {
  return (
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
          />
        </Col>
        <Col xs={8}>
          <Field
            name="amount"
            type="number"
            label="AMOUNT"
            placeholder="Amount"
            component={renderInputReactstrap}
          />
        </Col>
      </Row>

      <Row>
        <Col className="text-center m-t-20">
          <PrimaryButton md
            type="submit"
            disabled={pristine || submitting}
          >
            Mint tokens
          </PrimaryButton>
        </Col>
      </Row>
    </form>
  );
};

export default reduxForm({
  form: 'mintCurrencyForm',

  onSubmit: ({currency, amount}, dispatch) => {
    dispatch(MintCurrency(currency, amount));
    dispatch(reset('mintCurrencyForm'));
  },

  validate: currencyToken
})(MintCurrencyForm);
