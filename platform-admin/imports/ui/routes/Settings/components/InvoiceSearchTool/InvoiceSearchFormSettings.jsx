import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { renderInputReactstrap } from '../../../../form-helpers/renderFields';

const InvoiceSearchFormSettings =
  ({
    handleSubmit,
  }) => {

    return (
      <InvoiceSearchForm
        className="form custom"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col sm="8">
            <Field
              name="invoiceID"
              type="string"
              label="Invoice ID"
              required="true"
              placeholder=""
              component={renderInputReactstrap}
            />
          </Col>
          <Col sm="4">
            <PrimaryButton
              className="m-t-20 btn-find-invoice"
            >
              FIND INVOICES
            </PrimaryButton>
          </Col>
        </Row>
      </InvoiceSearchForm>
    );
  };

const formName = 'InvoiceSearchFormSettings';


const InvoiceSearchForm = styled.form`
  color: #636466;
  .btn-find-invoice {
    font-family: PT Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: normal;
    text-align: center;
    letter-spacing: 0.05em;
    padding: 14px 20px 11px;
  }
`;

export default reduxForm({
  form: formName,
  onSubmit: (values, dispatch, props) => {
    const {invoiceID} = values;
    props.loadInvoiceDetail(invoiceID);
  }
})(InvoiceSearchFormSettings);
