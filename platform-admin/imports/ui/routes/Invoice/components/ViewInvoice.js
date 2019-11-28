import React, {Fragment} from 'react';
import moment from 'moment';
import {Container, Col, Row, Collapse} from 'reactstrap';
import classnames from 'classnames';
import {NavLink as NavLINK} from 'react-router-dom';
import {invoiceStatuses, invoiceDocumentTypes} from 'meteor/populous:constants';

import {LinkButton} from '../../../components/styled-components/Buttons';
import {Status} from '../../../components/styled-components/Invoices/InvoiceCard';
import {H1, P, Small, Lead, LinkText} from '../../../components/styled-components/Typography';
import PdfPreview from '../../../components/styled-components/Invoices/PdfPreview';
import PdfReview from '../../../components/PdfReview';
import InvoiceStatus from './InvoiceStatus';
import BidList from './BidList';
import ZScoreModal from './ZScoreModal';
import floor from "../../../../helpers/formatters/floor";
import AddDocumentDropzone from './AddDocumentDropzone';

const initialState = {
  zScoreInfoType: 'borrower',
  pdfReviewModal: false,
  zScoreModal: false,
  isLegalDocumentVisible: false,
};

class ViewInvoice extends React.Component {
  state = initialState;

  toggleLegalDocumentsVisibility = () => {
    this.setState({
      isLegalDocumentVisible: !this.state.isLegalDocumentVisible
    });
  };

  zScoreIcon(value) {
    if (value >= 2.6) {
      return '/images/icons/ico-green-hand-up.png';
    }
    else if (value >= 1.1) {
      return '/images/icons/ico-grey-eye-glasses.png';
    }
    else {
      return '/images/icons/ico-red-warning.png';
    }
  }

  togglePdfReviewModal = () => {
    this.setState({
      pdfReviewModal: !this.state.pdfReviewModal
    });
  }

  toggleZScoreModal = (type=null) => {
    this.setState({
      zScoreModal: !this.state.zScoreModal,
      zScoreInfoType: type || this.state.zScoreInfoType
    });
  }

  render() {
    const {
      currentUser,
      invoice,
      crowdsale,
      closeAuction,
      restartAuction,
      markAsPaidOrNot,
      bidUsers,
      currencies,
      documents,
      uploadContract,
      isForceInsertPossible,
      forceInsert,
      startPending,
    } = this.props;

    const {isLegalDocumentVisible} = this.state;

    if (!invoice) {
      return (
        <Container>
          <Row className="m-b-30 m-t-30">
            <Col>
              <H1>
                <NavLINK to="/invoices" className="m-r-10">
                  <img src="/images/icons/ico-arrow-back.svg"/>
                </NavLINK>
                Invoice #{this.props.invoiceId}
              </H1>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <P className="m-b-30">This invoice doesn't exist anymore.</P>
              <img src="/images/img-no-result.png" width={160} alt="No Invoice"/>
            </Col>
          </Row>
        </Container>
      );
    }

    const invoiceAcceptInProgress = invoice.status === invoiceStatuses.auctionPending;

    // Fake invoice
    invoice.fakeBorrower = {
      zScore: 2.8
    };
    invoice.fakeDebtor = {
      zScore: 1.01
    };

    const borrower = invoice.borrower;
    const invoiceCurrency = currencies.find((cur) => cur.symbol === invoice.currency);
    const currencyTitle = invoiceCurrency ? invoiceCurrency.title : invoice.currency;

    const invoiceDocument = documents[invoiceDocumentTypes.invoice];
    const offerDocument = documents[invoiceDocumentTypes.offer];
    const buyerDocument = documents[invoiceDocumentTypes.buyer];
    const agreementDocument = documents[invoiceDocumentTypes.agreement];

    return (
      <Fragment>
        {isForceInsertPossible &&
        <div className={'row no-gutters justify-center align-items-center justify-content-center'}
             style={{background: '#df8664', textAlign: 'center', marginTop: '-20px', padding: '3px 10px', color: '#fff'}}>

          <img src="/images/icons/ico-attention-white.png" className="m-r-10"/>

          This invoice is awaiting to be added to the blockchain.
          <LinkButton outline className={'text-uppercase m-l-20 p-0 m-b-0'} onClick={() => forceInsert(crowdsale)}>
            Force Insert
          </LinkButton>
        </div>}
        <Container>
          <Row className="m-t-30 m-b-30 m-l-0 m-r-0">
            <Col xs="12" className={classnames({'has-card': currentUser.isInvestor()})}>
              <H1 className="d-block d-md-inline-block">
                <NavLINK to="/invoices" className="m-r-10">
                  <img src="/images/icons/ico-arrow-back.svg"/>
                </NavLINK>
                Invoice #{invoice.invoiceNumber}
              </H1>
              <Status status={invoice.status} className="invoice-status">{invoice.status}</Status>
            </Col>
          </Row>
          <Row>
            <Col xs="12" xl="9">
              <Row>
                <Col xs="12" md="7">
                  <Row>
                    <Col xs="7">
                      <PdfPreview file={(invoiceDocument && invoiceDocument.link()) || '/empty-invoice.pdf'}
                                  type={(invoiceDocument && invoiceDocument.extension) || null}
                                  className="pdf-preview" toggle={this.togglePdfReviewModal} invoice
                                  currentInvoice={invoice}
                                  upload={uploadContract}
                      />

                      {this.state.pdfReviewModal && invoiceDocument
                      && <PdfReview file={invoiceDocument.link()} close={this.togglePdfReviewModal}/>}

                      <div className="m-t-20 m-b-20" style={{fontSize: 14}}>
                        <LinkButton sm onClick={this.toggleLegalDocumentsVisibility}
                                    className="d-flex align-items-center"
                                    style={{boxShadow: (isLegalDocumentVisible && '0px 1px 5px rgba(67,68,69,0.15)')}}
                        >
                          legal documents
                          <img width="12"
                               className="m-l-10"
                               src={isLegalDocumentVisible ? '/images/icons/ico-minus.png' : '/images/icons/ico-plus.svg'}
                               alt=""/>

                        </LinkButton>
                      </div>
                    </Col>
                    <Col xs="5">

                      <Small className="m-b-10">Invoice amount</Small>
                      <Lead>{currencyTitle} {floor(invoice.amount)}</Lead>

                      <Small className="m-b-10">Advanced amount</Small>
                      <Lead>{currencyTitle} {floor(invoice.salePrice)}</Lead>

                      <Small className="m-b-10">Due date</Small>
                      <Lead>{moment(invoice.dueDate).format('DD-MM-YYYY')}</Lead>
                    </Col>
                  </Row>

                  <Collapse isOpen={isLegalDocumentVisible} className="m-t-10">
                    <Row type="flex">
                      <Col style={{borderRight: 'solid 2px #e1e5eb', minWidth: 315}}>
                        {offerDocument && <div className="m-b-15">
                          <a href={offerDocument.link()} download>
                            {offerDocument.meta.customName || 'Invoice Finance Letter of Offer'}
                          </a>
                        </div>}

                        {buyerDocument && <div className="m-b-15">
                          <a href={buyerDocument.link()} download>
                            {buyerDocument.meta.customName || 'Ancillary Credit and Security Agreements'}
                          </a>
                        </div>}

                        {agreementDocument && <div className="m-b-15">
                          <a href={agreementDocument.link()} download>
                            {agreementDocument.meta.customName || 'Digital Asset Repayment Agreement'}
                          </a>
                        </div>}
                      </Col>

                      <Col>
                        {offerDocument && <div>
                          <AddDocumentDropzone
                            uploadDocumentFile={offerDocument}
                            invoice={invoice}
                            upload={uploadContract}
                            fileType={invoiceDocumentTypes.offer}
                          />
                        </div>}

                        {buyerDocument && <div>
                          <AddDocumentDropzone
                            uploadDocumentFile={offerDocument}
                            invoice={invoice}
                            upload={uploadContract}
                            fileType={invoiceDocumentTypes.buyer}
                          />
                        </div>}

                        {agreementDocument && <div>
                          <AddDocumentDropzone
                            uploadDocumentFile={offerDocument}
                            invoice={invoice}
                            upload={uploadContract}
                            fileType={invoiceDocumentTypes.agreement}
                          />
                        </div>}
                      </Col>
                    </Row>
                  </Collapse>
                </Col>

                <Col xs="12" md="5" className="m-b-20">
                  <div>
                    <NavLINK to={`/users/${borrower._id}`}>
                      <Small className="m-b-10">Borrower</Small>
                    </NavLINK>
                    <Lead
                      className="m-b-5">{borrower.companyName && borrower.companyName !== "" ? borrower.companyName : borrower.fullName()}</Lead>
                    <div className="d-flex m-b-30">
                      <img src={this.zScoreIcon(borrower.latestZScore)} height={20} className="m-r-10"/>
                      <LinkText className="m-r-20" onClick={()=>{this.toggleZScoreModal('borrower')}}>Z-score {invoice.zscore}</LinkText>
                      <LinkText>Detailed company view</LinkText>
                    </div>
                  </div>

                  <div>
                    <Small className="m-b-10">Debtor</Small>
                    <Lead className="m-b-5">{invoice.debtor.name}</Lead>
                    <div className="d-flex m-b-20">
                      <img src={this.zScoreIcon(invoice.debtor.latestZScore)} height={20} className="m-r-10"/>
                      <LinkText className="m-r-20"
                                onClick={()=>{this.toggleZScoreModal('debtor')}}>Z-score {invoice.debtor.latestZScore}</LinkText>
                      <LinkText>Detailed company view</LinkText>
                    </div>
                  </div>

                  <Small className="m-b-10">Uploaded {moment(invoice.createdAt).format('DD-MM-YYYY, hh:mm a')}</Small>
                  {invoice.status === invoiceStatuses.auctionClosed && crowdsale &&
                  <Small className="m-b-10">Started {moment(crowdsale.createdAt).format('DD-MM-YYYY, hh:mm a')}</Small>
                  }

                  <div className="d-flex align-items-center m-b-10">
                    <Small className="m-r-10">Invoice Number: {invoice.invoiceNumber}</Small>
                  </div>
                </Col>

                <ZScoreModal
                  isOpen={this.state.zScoreModal}
                  toggle={this.toggleZScoreModal}
                  borrower={this.state.zScoreInfoType==='borrower' ? borrower : invoice.debtor}
                />
              </Row>
            </Col>

            <Col xs="12" xl="3">
              {(!invoiceAcceptInProgress && !startPending) &&
              <InvoiceStatus
                invoice={invoice}
                invoiceCurrency={currencyTitle}
                crowdsale={crowdsale}
                currentUser={currentUser}
                closeAuction={closeAuction}
                restartAuction={restartAuction}
                markAsPaidOrNot={markAsPaidOrNot}
                currencies={currencies}
              />
              }
            </Col>
          </Row>
        </Container>

        <div className="static-bg">
          <Container>
            {!invoiceAcceptInProgress && invoice.bids.length > 0 &&
            <BidList currentUser={currentUser} invoice={invoice} bidUsers={bidUsers} crowdsale={crowdsale}/>
            }
          </Container>
        </div>
      </Fragment>
    );
  }

  checkIsForceIncertPossible() {
    const {checkIsForceInsertPossible, crowdsale} = this.props;

    if (crowdsale) {
      checkIsForceInsertPossible(crowdsale);
    }
  }

  componentDidMount() {
    this.checkIsForceIncertPossible();
  }

  componentDidUpdate(){
    this.checkIsForceIncertPossible();
  }

  componentWillUnmount(){
    const {setForcePossible} = this.props;
    setForcePossible(false);
  }
}

export default ViewInvoice;
