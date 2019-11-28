import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import { Row, Col } from 'reactstrap';

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';

const BlockchainFormCheckActionStatus =
  ({
    handleSubmit,
    pristine,
    submitting,
    actionStatus,
  }) => {
    return (
      <form
        className="form custom m-b-20"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col sm="8">
            <Field
              name="id"
              type="string"
              label="Get ActionStatus"
              required="true"
              placeholder="Request ID"
              component={renderInputReactstrap}
            />
          </Col>
          <Col sm="4">
            <PrimaryButton
              className="m-t-10 p-l-10 p-r-10"
              disabled={pristine || submitting}
            >
              Check status
            </PrimaryButton>
          </Col>
        </Row>

        {actionStatus &&
        <Row>
          <Col>
            {actionStatus.status ? 1 : 0}
          </Col>
        </Row>
        }
        {actionStatus && actionStatus.error &&
        <Row>
          <Col className="red-color">
            Error: {actionStatus.error}
          </Col>
        </Row>
        }
      </form>
    );
  };

const formName = 'BlockchainFormCheckActionStatus';

export default reduxForm({
  form: formName,
  onSubmit: (values, dispatch, props) => {
    const { id } = values;
    const { checkActionStatus } = props;
    checkActionStatus(id, formName);
  }
})(BlockchainFormCheckActionStatus);
