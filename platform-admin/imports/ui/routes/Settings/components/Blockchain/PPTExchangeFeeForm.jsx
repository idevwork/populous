import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import { Row, Col } from 'reactstrap';
import {connect} from "react-redux";

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';

let PPTExchangeFeeForm =
  ({
    handleSubmit,
    pristine,
    submitting,
    document,
  }) => {

    return (
      <form
        className="form custom"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col sm="8">
            <Field
              name="pptExchange"
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

const formName = 'PPTExchangeFeeForm';

PPTExchangeFeeForm = reduxForm({
  form: formName,
  onSubmit: (values, dispatch, props) => {
    const { pptExchange } = values;
    const { updateBlockchain } = props;
    updateBlockchain({pptExchange}, formName, false, 'PPT Exchange');
  },
  enableReinitialize : true
})(PPTExchangeFeeForm);

export default connect((state, ownProps) => ({
  initialValues: ownProps.initialValuesReduxForm,
}))(PPTExchangeFeeForm);
