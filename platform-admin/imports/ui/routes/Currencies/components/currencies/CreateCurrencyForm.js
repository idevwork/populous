import React from 'react';
import { Row, Col } from 'reactstrap';
import { Field, reduxForm, reset } from 'redux-form';

import { CreateCurrency } from '../../modules/actions';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { validateCreateCurrency } from '../../../../form-helpers/validation';

const CreateCurrencyForm = ({handleSubmit, pristine, submitting}) => {
  return (
    <form className="form custom multi" onSubmit={handleSubmit}>
      <Row>
        <Col xs={12}>
          <Field
            name="symbol"
            type="text"
            label="CURRENCY SYMBOL"
            placeholder="Example: GBP"
            component={renderInputReactstrap}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Field
            name="title"
            type="text"
            label="CURRENCY TITLE"
            placeholder="Example: GBPp"
            component={renderInputReactstrap}
          />
        </Col>
      </Row>

      <Row>
        <Col className="text-center m-t-20">
          <PrimaryButton md
            disabled={pristine || submitting}
          >
            Create currency token
          </PrimaryButton>
        </Col>
      </Row>
    </form>
  );
};


export default reduxForm({
  form: 'createCurrencyForm',
  validate: validateCreateCurrency,
  onSubmit: ({symbol, title}, dispatch) => {
    dispatch(CreateCurrency(symbol, title));
    dispatch(reset('createCurrencyForm'));
  }
})(CreateCurrencyForm);
