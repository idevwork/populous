import React from 'react';
import {Container, Col, Row} from 'reactstrap';
import {countries, debtorStatuses, invoiceDocumentTypes} from 'meteor/populous:constants';

import {PrimaryButton} from '../../../../components/styled-components/Buttons';
import {H2, P, Lead, Small} from '../../../../components/styled-components/Typography';
import PdfReview from '../../../../components/PdfReview';
import DateTime from "../../../../components/DateTime/DateTime";
import EditDataModal from "./EditDataModal";
import PersonalizedCheckbox from './PersonalizedCheckbox';
import PdfPreview from './PdfPreview';
import InvoiceRejectModal from './InvoiceRejectModal';

const styleBorder = {
  borderBottom: 'solid 2px #e1e5eb'
};

const initialState = {
  newDueDate: null,
  showPdfReviewModal: false,
  showEditModal: false,
  rejectInvoiceModal: false,
  dataModal: null,
  isOpenDueDateModal: false
};

class FormContent extends React.Component {
  state = initialState;

  togglePdfReviewModal = () => {
    this.setState({
      showPdfReviewModal: !this.state.showPdfReviewModal
    });
  };

  onChangeDueDate = (date) => {
    this.setState({newDueDate: date});
  };

  toggleModal = (data) => {
    this.setState({
      dataModal: data,
      showEditModal: !this.state.showEditModal,
    });
  };

  toggleModalType = (type) => {
    this.setState({
      [type]: !this.state[type],
    });
  };

  toggleDueDate = (isOpen) => {
    const {isOpenDueDateModal, newDueDate} = this.state;
    const {invoice, updateInvoiceField} = this.props;

    if (isOpenDueDateModal && newDueDate && newDueDate.isValid() && !isOpen) {
      updateInvoiceField(invoice, 'dueDate', newDueDate.utc().toDate())
    }
    this.setState({
      isOpenDueDateModal: isOpen,
    });
  };

  render() {
    const {
      invoice, documents, updateInvoiceField, updateDebtorName, handleCheckList, saveAcceptDecision, saveDecision,
      firstStep, firstStep: {debtor, debtorIsValid, invoiceAccuratePPTPlatform, amount, discountAmountAndRate, dueDatePPTPlatform,
        bankAccountAndSortCodeRemoved, withinThirdMountsFromDateOfInvoice, perusedThroughForCashFlow, altmanZScoreAsPerThePlatform,
        peruseOfInvoiceSellerAndClient, insurancePolicyBeneficiaryAndCoverageDate, invoiceExistence, invoiceAccurate,
        dueDate, returnPercentage, searchOnDirectorIsProperty, directorIdAndProofOfAddress, directorAML}
    } = this.props;

    const {newDueDate, showEditModal, dataModal, showPdfReviewModal, isOpenDueDateModal, rejectInvoiceModal} = this.state;
    const debtorCountry = countries.filter((country) => country.key === invoice.debtor.country)[0];
    const invoiceDocument = documents[invoiceDocumentTypes.invoice];
    const isNewDebtor = invoice.debtor.status === debtorStatuses.pending;

    if (!isNewDebtor) {
      delete firstStep.debtorIsValid;
    }

    const startAuctionCheckAccess = () => (
      Object.values(firstStep).every((item)=> item)
    );

    const rejectInvoiceCheckAccess = () => (
      Object.values(firstStep).every((item)=> item != null) &&
      !startAuctionCheckAccess()
    );

    return (
      <Container>
        <Row className="m-b-30 m-l-0 m-r-0">
          <Col xs="12" className="m-b-40">
            <H2 className="d-block d-md-inline-block">
              INVOICE DETAILS
            </H2>
          </Col>
          <Col sm="12" md="6" lg="5">
            <div className="m-b-20">
              <P>Check that entered details match the invoice document.</P>
            </div>


            <div>
              <Lead>PPT PLATFORM</Lead>
            </div>
            <div className="d-flex justify-content-between m-t-20">
              <div className="d-flex">
                <PersonalizedCheckbox initialValue={invoiceAccuratePPTPlatform} param="invoiceAccuratePPTPlatform"
                                      index="invoiceAccuratePPTPlatform"
                                      handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
                <div>
                  <Small className="m-b-5 p-t-5">Invoice accurate</Small>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between m-t-10">
              <div className="d-flex">
                <PersonalizedCheckbox initialValue={amount} param="amount" index="amount"
                                      handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
                <div style={{marginTop: '-5px'}}>
                  <Small className="m-b-5">Invoice amount</Small>
                  <Lead>{invoice.amount}</Lead>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <PersonalizedCheckbox initialValue={discountAmountAndRate} param="discountAmountAndRate" index="discountAmountAndRate"
                                      handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
                <div>
                  <Small className="m-b-5  p-t-5">Discount amount and rate </Small>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between m-t-10">
              <div className="d-flex">
                <PersonalizedCheckbox initialValue={dueDatePPTPlatform} param="dueDatePPTPlatform" index="dueDatePPTPlatform"
                                      handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
                <div>
                  <Small className="m-b-5  p-t-5">Due date</Small>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between m-t-10 p-b-20" style={styleBorder}>
              <div className="d-flex">
                <PersonalizedCheckbox initialValue={bankAccountAndSortCodeRemoved} param="bankAccountAndSortCodeRemoved"
                                      index="bankAccountAndSortCodeRemoved"
                                      handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
                <div>
                  <Small className="p-t-5">Bank account and sort code removed</Small>
                </div>
              </div>
            </div>


            <div className="m-t-20">
              <Lead>BANK STATEMENTS </Lead>
            </div>
            <div className="d-flex justify-content-between m-t-20 p-b-10">
              <div className="d-flex">
                <PersonalizedCheckbox initialValue={withinThirdMountsFromDateOfInvoice} param="withinThirdMountsFromDateOfInvoice"
                                      index="withinThirdMountsFromDateOfInvoice"
                                      handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
                <div>
                  <Small className="p-t-5">Within 3 mounts from date of invoice</Small>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between p-b-20" style={styleBorder}>
              <div className="d-flex">
                <PersonalizedCheckbox initialValue={perusedThroughForCashFlow} param="perusedThroughForCashFlow"
                                      index="perusedThroughForCashFlow"
                                      handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
                <div>
                  <Small className="p-t-5">Perused through for cash flow</Small>
                </div>
              </div>
            </div>


            <div className="m-t-20">
              <Lead>ALTMAN Z-SCORE AND ACCOUNTING CHECKS </Lead>
            </div>
            <div className="d-flex p-b-10">
              <PersonalizedCheckbox initialValue={altmanZScoreAsPerThePlatform} param="altmanZScoreAsPerThePlatform"
                                    index="altmanZScoreAsPerThePlatform"
                                    handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
              <div>
                <Small className="p-t-5">Altman z-score as per the platform</Small>
              </div>
            </div>

            <div className="d-flex p-b-20" style={styleBorder}>
              <PersonalizedCheckbox initialValue={peruseOfInvoiceSellerAndClient} param="peruseOfInvoiceSellerAndClient"
                                    index="peruseOfInvoiceSellerAndClient"
                                    handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
              <div>
                <Small className="p-t-5">Peruse b/s of invoice seller and client</Small>
              </div>
            </div>


            <div className="m-t-20">
              <Lead>INSURANCES</Lead>
            </div>
            <div className="d-flex p-b-20" style={styleBorder}>
              <PersonalizedCheckbox initialValue={insurancePolicyBeneficiaryAndCoverageDate} param="insurancePolicyBeneficiaryAndCoverageDate"
                                    index="insurancePolicyBeneficiaryAndCoverageDate"
                                    handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
              <div>
                <Small className="p-t-5">Insurance policy beneficiary and coverage date</Small>
              </div>
            </div>


            <div className="m-t-20">
              <Lead>INVOICE VERIFICATION</Lead>
              <Lead>Contact invoice seller's client for:</Lead>
            </div>

            <div className="d-flex p-b-10">
              <PersonalizedCheckbox initialValue={invoiceExistence} param="invoiceExistence" index="invoiceExistence"
                                    handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
              <div>
                <Small className="p-t-5">Invoice existence</Small>
              </div>
            </div>

            <div className="d-flex p-b-10">
              <PersonalizedCheckbox initialValue={invoiceAccurate} param="invoiceAccurate" index="invoiceAccurate"
                                    handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
              <div>
                <Small className="p-t-5">Invoice accurate</Small>
              </div>
            </div>

            <div className="d-flex justify-content-between" style={styleBorder}>
              <div className="d-flex w-100">
                <PersonalizedCheckbox initialValue={dueDate} param="dueDate" index="dueDate"
                                      handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
                <div style={{marginTop: '-5px', width: '100%'}}>
                  <Small className="m-b-5">Due date</Small>
                  <Lead onClick={() => this.toggleDueDate(true)}>
                    <DateTime
                      initialDate={newDueDate || invoice.dueDate}
                      onChangeDueDate={this.onChangeDueDate}
                      isOpen={isOpenDueDateModal}
                    />
                  </Lead>
                </div>
              </div>
              <div className="m-t-20 m-l-20">
                  <span onClick={() => this.toggleDueDate(false)} style={{cursor: 'pointer'}}>
                    <img src="/images/icons/ico-edit-finish.svg"/>
                  </span>
              </div>
            </div>

            <div className="m-t-20">
              <Lead>RATE</Lead>
            </div>
            <div className="d-flex" style={styleBorder}>
              <PersonalizedCheckbox initialValue={returnPercentage} param="returnPercentage" index="returnPercentage"
                                    handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
              <div style={{marginTop: '-5px'}}>
                <Small className="m-b-5">Rate</Small>
                <Lead>{invoice.returnPercentage} %</Lead>
              </div>
            </div>


            <div className="m-t-20">
              <Lead>DEBTOR</Lead>
            </div>

            <div className="m-t-30 p-b-20" style={styleBorder}>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <PersonalizedCheckbox initialValue={debtor} param="debtor" index="debtor"
                                        handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
                  <div style={{marginTop: '-15px'}}>
                    <Small className="m-b-5">Debtor name</Small>
                    <Lead className="m-0">{invoice.debtor.name}</Lead>
                    <Small className="m-t-5">
                      {invoice.debtor.companyNumber}, {debtorCountry.name}
                    </Small>
                  </div>
                </div>
                { isNewDebtor &&
                <div>
                  <span onClick={() => this.toggleModal({
                    title: 'Debtor name',
                    name: 'debtorName',
                    value: invoice.debtor.name
                  })} style={{cursor: 'pointer'}}>
                    <img src="/images/icons/ico-edit.svg"/>
                  </span>
                </div>
                }
              </div>

              { isNewDebtor &&
              <div className="m-t-30">
                <div className="d-flex">
                  <PersonalizedCheckbox initialValue={debtorIsValid} param="debtorIsValid" index="debtorIsValid"
                                        handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
                  <div style={{marginTop: '-5px'}}>
                    <Small className="m-b-5">This debtor is new and requires verification</Small>
                    <Lead className="m-0">Debtor is valid</Lead>
                  </div>
                </div>
              </div>
              }
            </div>


            <div className="m-t-20">
              <Lead>SEARCHES</Lead>
            </div>
            <div className="d-flex p-b-10">
              <PersonalizedCheckbox initialValue={searchOnDirectorIsProperty} param="searchOnDirectorIsProperty"
                                    index="searchOnDirectorIsProperty"
                                    handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
              <div>
                <Small className="p-t-5">Search on director's property and assets</Small>
              </div>
            </div>
            <div className="d-flex p-b-10">
              <PersonalizedCheckbox initialValue={directorIdAndProofOfAddress} param="directorIdAndProofOfAddress"
                                    index="directorIdAndProofOfAddress"
                                    handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
              <div>
                <Small className="p-t-5">Director id and proof of address</Small>
              </div>
            </div>
            <div className="d-flex p-b-20" style={styleBorder}>
              <PersonalizedCheckbox initialValue={directorAML} param="directorAML" index="directorAML"
                                    handleCheckList={handleCheckList.bind(this, 'firstStep')}/>
              <div>
                <Small className="p-t-5">Director AML</Small>
              </div>
            </div>


            { showEditModal && invoiceDocument &&
            <EditDataModal
              dataModal={dataModal}
              isOpen={showEditModal}
              toggle={this.toggleModal}
              updateInvoiceField={updateInvoiceField.bind(this, invoice)}
              updateDebtorName={updateDebtorName.bind(this, invoice.debtor)}
            />
            }
          </Col>

          <Col sm="12" md="6" lg="7">
            <PdfPreview file={(invoiceDocument && invoiceDocument.link()) || '/empty-invoice.pdf'}
                        type={(invoiceDocument && invoiceDocument.extension) || null}
                        className="pdf-preview" toggle={this.togglePdfReviewModal} invoice
                        currentInvoice={invoice} height={870}
            />

            { showPdfReviewModal && invoiceDocument &&
            <PdfReview file={invoiceDocument.link()} close={this.togglePdfReviewModal}/>
            }
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
            <PrimaryButton onClick={this.toggleModalType.bind(this, 'rejectInvoiceModal')} className="m-r-10"
                           disabled={!rejectInvoiceCheckAccess()}>
              Reject invoice
            </PrimaryButton>
            <PrimaryButton onClick={() => saveAcceptDecision(invoice)} className="m-r-10"
                           disabled={!startAuctionCheckAccess()}>
              Start auction
            </PrimaryButton>

            {rejectInvoiceModal &&
            <InvoiceRejectModal
              rejectInvoiceModal={rejectInvoiceModal}
              toggleRejectInvoiceModal={this.toggleModalType.bind(this, 'rejectInvoiceModal')}
              saveDecision={saveDecision}
              invoice={invoice}
              firstStep={this.props.firstStep}
            />
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FormContent;
