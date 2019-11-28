import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import { Row, Col } from 'reactstrap';

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';

const BlockchainFormSettings =
  ({
    handleSubmit,
    pristine,
    submitting,
    document,
  }) => {

    const preventFloat =
      (value, previousValue) =>
        (value === '' || Number.parseFloat(value) === Number.parseInt(value))
          ? value
          : previousValue;

    return (
      <form
        className="form custom"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col sm="8">
            <Field
              name="gasPrice"
              type="number"
              label="Gas Price"
              required="true"
              placeholder=""
              min="0"
              component={renderInputReactstrap}
              normalize={preventFloat}
            />
          </Col>
          <Col sm="4">
            <PrimaryButton
              className="m-t-10 p-l-10 p-r-10"
              disabled={pristine || submitting}
            >
              Update settings
            </PrimaryButton>
          </Col>
        </Row>
      </form>
    );
  };

const formName = 'BlockchainFormSettings';

export default reduxForm({
  form: formName,
  onSubmit: (values, dispatch, props) => {
    const { gasPrice, } = values;
    const { updateBlockchain } = props;
    updateBlockchain({gasPrice}, formName);
  }
})(BlockchainFormSettings);
