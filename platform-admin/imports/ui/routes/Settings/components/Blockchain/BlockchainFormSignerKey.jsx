import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import { Row, Col } from 'reactstrap';

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';

const BlockchainFormSignerKey =
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
              name="signerKey"
              type="string"
              label="Security signer key"
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
              Update security signer key
            </PrimaryButton>
          </Col>
        </Row>
      </form>
    );
  };

const formName = 'BlockchainFormSignerKey';

export default reduxForm({
  form: formName,
  onSubmit: (values, dispatch, props) => {
    const { signerKey } = values;
    const { updateBlockchainSignerKey } = props;
    updateBlockchainSignerKey(signerKey, formName);
  }
})(BlockchainFormSignerKey);
