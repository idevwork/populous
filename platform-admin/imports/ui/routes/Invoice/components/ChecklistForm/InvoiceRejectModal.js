import React from 'react';
import {FormGroup, Modal, ModalHeader, ModalBody, Input, Form} from 'reactstrap';
import {Small, LABEL} from '../../../../components/styled-components/Typography';
import {DangerButton} from '../../../../components/styled-components/Buttons';
import {FormLabel} from '../../../../components/styled-components/Invoices/FormLabel';
import {Wrapper} from '../../../../components/styled-components/Invoices/Wrapper';

const reasons = {
  invoiceAccuratePPTPlatform: 'Invoice accurate (PPT PLATFORM)',
  amount: 'Invoice amount (PPT PLATFORM)',
  discountAmountAndRate: 'Discount amount and rate (PPT PLATFORM)',
  dueDatePPTPlatform: 'Due date (PPT PLATFORM)',
  bankAccountAndSortCodeRemoved: 'Bank account and sort code removed (PPT Platform)',
  withinThirdMountsFromDateOfInvoice: 'Within 3 mounts from date of invoice (BANK STATEMENTS)',
  perusedThroughForCashFlow: 'Perused through for cash flow (BANK STATEMENTS)',
  altmanZScoreAsPerThePlatform: 'Altman z-score as per the platform (ALTMAN Z-SCORE AND ACCOUNTING CHECKS)',
  peruseOfInvoiceSellerAndClient: 'Peruse b/s of invoice seller and client (ALTMAN Z-SCORE AND ACCOUNTING CHECKS)',
  insurancePolicyBeneficiaryAndCoverageDate: 'Insurance policy beneficiary and coverage date (INSURANCES)',
  invoiceExistence: 'Invoice existence (INVOICE VERIFICATION)',
  invoiceAccurate: 'Invoice accurate (INVOICE VERIFICATION)',
  dueDate: 'Due date (INVOICE VERIFICATION)',
  returnPercentage: 'Rate',
  debtor: 'Debtor',
  searchOnDirectorIsProperty: "Director id and proof of address (SEARCHES)",
  directorIdAndProofOfAddress: "Search on director's property and assets (SEARCHES)",
  directorAML: "Director AML (SEARCHES)",
  invoiceFinanceLetterOfOffer: "Invoice Finance Letter of Offer is not approved",
  ancillaryCreditAndSecurityAgreements: "Ancillary Credit and Security Agreements is not approved",
  digitalAssetRepaymentAgreement: "Digital Asset Repayment Agreement is not approved",
};

const initialState = {
  selectedReasons: [],
  comment: '',
};

class InvoiceRejectModal extends React.Component {
  state = initialState;

  componentWillMount() {
    const {firstStep } = this.props;
    const selectedReasons = [];
    Object.keys(firstStep).forEach((key) => {
      if (!firstStep[key] && key !== 'debtorIsValid') {
        selectedReasons.push(reasons[key]);
      }
    });

    this.setState({selectedReasons});
  }

  getRejectReason = () => {
    const {selectedReasons} = this.state;

    if (selectedReasons.length) {
      return selectedReasons.map((reason, index) => (
        <Wrapper className='checkbox-personalized p-t-10' key={index}>
          <input className='react-bs-select-all'
                 type='checkbox'
                 name={ 'checkbox' + index }
                 id={ 'checkbox' + index }
                 defaultChecked={true}
          />
          <FormLabel className="p-0 d-flex" htmlFor={ 'checkbox' + index }>
            <div className='check'></div>
            <div className="p-l-10 m-t-5 "><Small>{reason}</Small></div>
          </FormLabel>
        </Wrapper>
      ));
    }
  };

  getOtherRejectReason = () => {
    const {selectedReasons} = this.state;
    const indexOtherReason = selectedReasons.length + 1;
    return (
      <div className='p-t-10' key={indexOtherReason}>
        <Input
          type="textarea"
          name="comment"
          value={this.state.comment}
          placeholder="Comment…"
          onChange={(event) => this.setState({comment: event.target.value})}
          style={{resize: 'none', width: '100%'}}
        />
      </div>
    );
  };

  submitRejectAuction = (e) => {
    e.preventDefault();
    let reasons = this.state.selectedReasons;

    if (this.state.comment) {
      const {comment} = e.target;
      reasons.push({comment: comment.value});
    }

    this.props.saveDecision(this.props.invoice, false, reasons);
    this.setState({
      selectedReasons: [],
      comment: '',
    });
    this.props.toggleRejectInvoiceModal();
  };

  render() {
    const {rejectInvoiceModal, toggleRejectInvoiceModal} = this.props;
    return (
      <Modal isOpen={rejectInvoiceModal} toggle={toggleRejectInvoiceModal} className="custom" style={{maxWidth: 800}}>
        <ModalHeader toggle={toggleRejectInvoiceModal}>Confirm action</ModalHeader>
        <ModalBody>
          <Form className="form custom" onSubmit={(e) => this.submitRejectAuction(e)}>
            <FormGroup>
              <LABEL className='m-b-10' for="reason">Reason</LABEL>
              {this.getRejectReason()}
              {this.getOtherRejectReason()}
            </FormGroup>
            <div className="d-flex justify-content-center align-content-center m-t-30">
              <DangerButton>REJECT inovice</DangerButton>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

export default InvoiceRejectModal;