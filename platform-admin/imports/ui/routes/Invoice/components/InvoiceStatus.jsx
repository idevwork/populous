import React, { Fragment } from 'react';
import moment from 'moment';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { invoiceStatuses, withdrawStatuses } from 'meteor/populous:constants';

import { StatusCard } from '../../../components/styled-components/Invoices/Invoice';
import { DangerButton, PrimaryButton } from '../../../components/styled-components/Buttons';
import { NaviText, LabelText, DangerText, P } from '../../../components/styled-components/Typography';
import {CustomCheckbox} from '../../../components/styled-components/Forms/CustomCheckbox';
import floor from "../../../../helpers/formatters/floor";

const initialState = {
  timeToAuctionEnds: '',
};

class InvoiceStatus extends React.Component {
  state = initialState;

  componentDidUpdate(prevProps) {
    if (this.props.invoice.status !== prevProps.invoice.status) {
      this.startTimer();
    }
  }

  componentWillMount() {
    if (this.props.crowdsale) {
      this.getAuctionEnds(this.props.crowdsale.closeAt);
    }
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    if (this.props.crowdsale) {
      this.intervalId = setInterval(() => {
        this.getAuctionEnds(this.props.crowdsale.closeAt);
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getAuctionEnds = (date) => {
    const toDate = moment(date).valueOf();
    const nowDate = moment().valueOf();
    const tempTime = moment.duration(toDate - nowDate);

    if (Math.sign(tempTime) === -1) {
      clearInterval(this.intervalId);
      return 0;
    }

    let hours = tempTime.hours();
    let minutes = tempTime.minutes() < 10 ? '0' + tempTime.minutes() : tempTime.minutes();
    let seconds = tempTime.seconds() < 10 ? '0' + tempTime.seconds() : tempTime.seconds();

    this.setState({
      timeToAuctionEnds: `${hours} ${hours > 0 ? 'hours' : 'hour'} ${minutes} min ${seconds} sec`
    });
  };

  onChangeWithdrawStatus = (event) => {
    const { markAsPaidOrNot, invoice } = this.props
    if (event.target.checked) {
      markAsPaidOrNot(invoice, withdrawStatuses.complete)
    } else {
      markAsPaidOrNot(invoice, withdrawStatuses.pending)
    }
  }

  render() {
    const { invoice, invoiceCurrency, crowdsale, closeAuction, restartAuction } = this.props;
    const { soldPrice, repayedPrice, penaltyPrice, withdrawStatus } = invoice;
    const depositAmount = (soldPrice - repayedPrice) + penaltyPrice;

    let highestBid = 0;
    if (invoice.bids && invoice.bids.length > 0) {
      highestBid = Math.max(...invoice.bids.map(bid =>  bid.sortAmount));
    } else {
      highestBid = invoice.salePrice;
    }
    const returnOnInvestmentPerc = ((invoice.amount - highestBid) / invoice.amount * 100).toFixed(2);
    const returnAmount = floor(invoice.amount - invoice.salePrice);
    const dueDuration = moment().diff(moment(invoice.dueDate));

    return (
      <Row>
        <Col xs="12" md="6" xl="12">
          { invoice.status === invoiceStatuses.auctionOpen &&
            <Fragment>
              <StatusCard>
                <CardBody>
                  <P className="m-b-5" slate>Auction ends in</P>
                  <LabelText>{crowdsale ? this.state.timeToAuctionEnds : ''}</LabelText>
                </CardBody>
              </StatusCard>

              <div className="button-wrapper">
                <PrimaryButton outline disabled={(crowdsale && crowdsale.isClosePending())}
                               onClick={() => closeAuction(invoice)}>
                  Close auction
                </PrimaryButton>
              </div>
            </Fragment>
          }
          { invoice.status === invoiceStatuses.auctionClosed &&
            <div className="button-wrapper">
              <PrimaryButton className="m-b-15" onClick={() => restartAuction(invoice)}>
                Restart auction
              </PrimaryButton>

              <PrimaryButton outline onClick={() => closeAuction(invoice)}>
                Terminate auction
              </PrimaryButton>
            </div>
          }
          { invoice.status === invoiceStatuses.auctionFailed &&
            <div className="button-wrapper">
              <PrimaryButton onClick={() => restartAuction(invoice)}>
                Restart auction
              </PrimaryButton>
            </div>
          }
          { invoice.status === invoiceStatuses.repaymentPending &&
            <StatusCard>
              <CardBody>
                <P className="m-b-5" slate>Accepted auction price</P>
                <NaviText className="m-b-15">{invoiceCurrency} {floor(highestBid)}</NaviText>

                <P className="m-b-5" slate>Rate</P>
                <NaviText className="m-b-15">
                  {returnOnInvestmentPerc}% ({invoiceCurrency} {returnAmount})
                </NaviText>

                <P className="m-b-5" slate>Total amount to be paid</P>
                <NaviText className="m-b-15">{invoiceCurrency} {floor(depositAmount)}</NaviText>
                { dueDuration > 0 ?
                  <Fragment>
                    <DangerText>Penalty: {invoiceCurrency} {floor(penaltyPrice)}</DangerText>
                    <DangerText className="text-uppercase">{moment.duration(dueDuration).humanize()} Overdue</DangerText>
                  </Fragment>
                  :
                  null
                }
                {(withdrawStatus === withdrawStatuses.pending || withdrawStatus === withdrawStatuses.complete) &&
                  <CustomCheckbox label="Populous transferred Money" name="mark-paid" input="" className="" checked={withdrawStatus === withdrawStatuses.complete}
                    onChange={this.onChangeWithdrawStatus}/>
                }
              </CardBody>
            </StatusCard>
          }
        </Col>
      </Row>
    );
  }
};

export default InvoiceStatus;
