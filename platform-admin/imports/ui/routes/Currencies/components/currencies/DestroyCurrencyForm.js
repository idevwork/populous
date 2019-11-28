import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { Field, reduxForm, reset, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { DestroyTokens } from '../../modules/actions';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';
import { renderSelectReactstrap } from '../../../../form-helpers/renderSelectFields';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { P } from '../../../../components/styled-components/Typography';
import { HR } from '../../../../components/styled-components/Users/UserProfile';
import { currencyToken } from '../../../../form-helpers/validation';

let DestroyCurrencyForm = ({handleSubmit, pristine, submitting, currencies, deletingCurrency, deleteCurrency}) => (
  <form className="form custom multi" onSubmit={handleSubmit}>
    <Row>
      <Col xs={4}>
        <Field
          name="currency"
          type="select"
          component={renderSelectReactstrap}
          className="currency-ctrl"
          placeholder=""
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
        <PrimaryButton md disabled={pristine || submitting}>
          Destroy tokens
        </PrimaryButton>
      </Col>
    </Row>
    {/* hidden by using task from Wisdom*/}
    {false && <Fragment>
    <HR style={{width: '100%'}} />
    <Row>
      <Col className="m-t-10">
        <P>Delete currency from the platform. Minted amount should be 0.</P>
      </Col>
    </Row>
    <Row>
      <Col xs={4}>
        <Field
          name="deletingCurrency"
          type="select"
          component={renderSelectReactstrap}
          className="currency-ctrl"
          placeholder=""
          label="Currency"
          options={currencies}
        />
      </Col>
      <Col xs={8} className="d-flex align-items-center">
        <PrimaryButton
          type="button"
          outline sm
          onClick={() => deleteCurrency(deletingCurrency)}
          disabled={!deletingCurrency}
        >
          Delete Currency
        </PrimaryButton>
      </Col>
    </Row>
    </Fragment>}
  </form>
);

DestroyCurrencyForm = reduxForm({
  form: 'destroyCurrencyForm',
  validate: currencyToken,
  onSubmit: ({currency, amount}, dispatch) => {
    dispatch(reset('destroyCurrencyForm'));
    dispatch(DestroyTokens(currency, amount));
  }
})(DestroyCurrencyForm);

const selector = formValueSelector('destroyCurrencyForm'); // <-- same as form name
DestroyCurrencyForm = connect(
  state => {
    const deletingCurrency = selector(state, 'deletingCurrency');
    return {
      deletingCurrency
    }
  }
)(DestroyCurrencyForm);

export default DestroyCurrencyForm;
