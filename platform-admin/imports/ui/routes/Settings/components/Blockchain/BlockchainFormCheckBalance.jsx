import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import { Row, Col } from 'reactstrap';

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';
import floor from "../../../../../helpers/formatters/floor";


const BlockchainFormCheckBalance =
  ({
    handleSubmit,
    pristine,
    submitting,
    balance
  }) => {

    return (
      <form
        className="form custom m-b-40"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col sm="8">
            <Field
              name="address"
              type="string"
              label="Check PPT balance"
              required="true"
              placeholder=""
              component={renderInputReactstrap}
            />
          </Col>
          <Col sm="4">
            <PrimaryButton
              className="m-t-10 p-l-10 p-r-10"
              disabled={pristine || submitting}
            >
              Check balance
            </PrimaryButton>
          </Col>
        </Row>

        {balance &&
        <Row>
          <Col className="green-color">
            <div>PPT: {floor(balance.PPT) || 0}</div>
            <div>GBPp: {floor(balance.GBP) || 0}</div>
            <div>USDp: {floor(balance.USD) || 0}</div>
          </Col>
        </Row>
        }
      </form>
    );
  };

const formName = 'BlockchainFormCheckBalance';

export default reduxForm({
  form: formName,
  onSubmit: (values, dispatch, props) => {
    // TODO: NEED TO CHECK WHTHER THIS COMPONENT IS DEPRECATED?
    // const { address } = values;
    // const { getBalanceOfAddress } = props;
    // getBalanceOfAddress(address);
  }
})(BlockchainFormCheckBalance);
