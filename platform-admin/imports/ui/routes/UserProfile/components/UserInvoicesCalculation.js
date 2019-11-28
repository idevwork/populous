import React, { Component } from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm, reset } from 'redux-form';
import { PrimaryButton } from "../../../components/styled-components/Buttons";
import { renderInputReactstrap } from '../../../form-helpers/renderFields';
import {renderDateTimeField} from '../../../form-helpers/renderDateTimeField';
import { LABEL } from '../../../components/styled-components/Typography';
import { StyledInput } from '../../../components/styled-components/Inputs';

class UserInvoicesCalculation extends Component {

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
          <Col xs="12" sm="12" md="12" lg="4">
            <Field
              name="startDateOfInterest"
              label="Start Date Of Interest"
              component={renderDateTimeField}
              className={'customDatepicker'}
              noBorder={true}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4">
            <Field
              name="endDateOfInterest"
              label="End Date Of Interest"
              component={renderDateTimeField}
              className={'customDatepicker'}
              noBorder={true}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4">
            <Field
              name="minusDaysOfInterest"
              type="number"
              label="Minus Days Of Interest"
              placeholder=""
              component={renderInputReactstrap}
              required={true}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="4">
            <Field
              name="minusValue"
              type="number"
              label="Minus Value (%)"
              placeholder=""
              component={renderInputReactstrap}
              required={true}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4">
            <Field
              name="minusPercentage"
              type="number"
              label="Minus Percentage"
              placeholder=""
              component={renderInputReactstrap}
              required={true}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4">
            {/* <Field
              name="totalFee"
              type="number"
              label="Total Fee (%)"
              placeholder=""
              component={renderInputReactstrap}
              disabled={true}
            /> */}
            <FormGroup>
              <LABEL>Total Fee (%)</LABEL>
              <StyledInput type={'number'} placeholder={''} disabled={true}/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-right">
            <span className="mr-2">Penalty Calculations</span>
            <PrimaryButton className="m-b-20" style={{padding: '13px 20px'}} type="submit">
              Start
            </PrimaryButton>
          </Col>
        </Row>
      </form>
    );
  }

}


export default reduxForm({
  form: 'userInvoicesCalculationForm',

  onSubmit: ({currency, amount, invoiceId}, dispatch, {userId, transferFunds}) => {
    transferFunds(userId, currency, amount, invoiceId);
    dispatch(reset('userInvoicesCalculationForm'));
  }
})(UserInvoicesCalculation);
