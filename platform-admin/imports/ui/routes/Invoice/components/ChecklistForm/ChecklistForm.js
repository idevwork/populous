import React from 'react';
import {Container, Fade, Row, Col} from 'reactstrap';

import ViewInvoiceHeader from './ViewInvoiceHeader';
import ViewInvoiceFooter from './ViewInvoiceFooter';
import FormContent from './FormContent'

const initialState = {
  page: 1,
  firstStep: {
    invoiceAccuratePPTPlatform: null,
    amount: null,
    discountAmountAndRate: null,
    dueDatePPTPlatform: null,
    bankAccountAndSortCodeRemoved: null,
    withinThirdMountsFromDateOfInvoice: null,
    perusedThroughForCashFlow: null,
    altmanZScoreAsPerThePlatform: null,
    peruseOfInvoiceSellerAndClient: null,
    insurancePolicyBeneficiaryAndCoverageDate: null,
    invoiceExistence: null,
    invoiceAccurate: null,
    dueDate: null,
    returnPercentage: null,
    debtor: null,
    debtorIsValid: null,
    searchOnDirectorIsProperty: null,
    directorIdAndProofOfAddress: null,
    directorAML: null,
  }
};


class ChecklistForm extends React.Component {
  state = initialState;

  handleCheckList = (step, key, value) => {
    let dataStep, targetStep;
    // For First step
    targetStep = step;
    dataStep = {...this.state[step]};
    dataStep[key] = value;

    this.setState({[targetStep]: dataStep})
  };

  render() {
    const {currentUser, invoice, sendEmail, deleteInvoice, redirectToActivityLogs} = this.props;
    const commonStepParams = {
      ...this.props,
      handleCheckList: this.handleCheckList,
      firstStep: this.state.firstStep,
    };

    return (
      <Container>
        <ViewInvoiceHeader currentUser={currentUser} invoice={invoice}/>
        <FormContent {...commonStepParams}/>

        <ViewInvoiceFooter sendEmail={sendEmail} deleteInvoice={deleteInvoice}
                           redirectToActivityLogs={redirectToActivityLogs} invoice={invoice} />
      </Container>
    );
  }
}

export default ChecklistForm;
