import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Field, reduxForm, reset } from 'redux-form';
import { PrimaryButton } from "../../../components/styled-components/Buttons";
import { renderInputReactstrap } from '../../../form-helpers/renderFields';
import { renderSelectReactstrap } from '../../../form-helpers/renderSelectFields';

class UserInvoicesTransferFunds extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleSubmit,
      currencies
    } = this.props;

    const currenciesOptions = {};
    currencies.forEach((currency) => {
      currenciesOptions[currency.symbol] = currency.title;
    });

    return (
      <form
        className="form custom multi"
        onSubmit={handleSubmit}
      >
        <Row className="align-items-end m-t-10">
          <Col xs="12" sm="12" md="12" lg="3">
            <Field
              name="invoiceId"
              type="text"
              label="Invoice ID"
              placeholder=""
              component={renderInputReactstrap}
              required={true}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="2">
            <Field
              name="currency"
              type="select"
              component={renderSelectReactstrap}
              className="currency-ctrl"
              label="Currency"
              options={currenciesOptions}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4">
            <Field
              name="amount"
              type="number"
              label="Amount to be credited to invoice buyer"
              placeholder=""
              component={renderInputReactstrap}
              required={true}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="3" className="m-b-5">
            <PrimaryButton className="m-b-20" style={{padding: '13px 20px'}} type="submit">
              Transfer funds
            </PrimaryButton>
          </Col>
        </Row>
      </form>
    );
  }

}


export default reduxForm({
  form: 'transferFundsForm',

  onSubmit: ({currency, amount, invoiceId}, dispatch, {userId, transferFunds}) => {
    transferFunds(userId, currency, amount, invoiceId);
    dispatch(reset('transferFundsForm'));
  }
})(UserInvoicesTransferFunds);
