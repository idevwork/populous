import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import { Row, Col } from 'reactstrap';
import {connect} from "react-redux";

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';

let InvoiceFeeForm =
  ({
    handleSubmit,
    pristine,
    submitting
  }) => {

    return (
      <form
        className="form custom"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col sm="8">
            <Field
              name="pptInterestFee"
              type="number"
              label="PPT Interest Fee(%)"
              required="true"
              placeholder=""
              min="0"
              component={renderInputReactstrap}
              // normalize={preventFloat}
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

const formName = 'InvoiceFeeForm';

InvoiceFeeForm = reduxForm({
  form: formName,
  onSubmit: (values, dispatch, props) => {
    const { pptInterestFee } = values;
    const { updateBlockchain } = props;
    updateBlockchain({pptInterestFee}, formName, false, 'Invoice Fee');
  },
  enableReinitialize : true
})(InvoiceFeeForm);

export default connect((state, ownProps) => ({
  initialValues: ownProps.initialValuesReduxForm,
}))(InvoiceFeeForm);
