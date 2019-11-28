import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { Field, reduxForm, reset } from 'redux-form';

import { H3, LABEL } from '../../../components/styled-components/Typography';
import { PrimaryButton } from "../../../components/styled-components/Buttons";
import InvoicesModal from "./InvoicesModal";
import floor from "../../../../helpers/formatters/floor";
import { renderInputReactstrap } from '../../../form-helpers/renderFields';
import { renderSelectReactstrap } from '../../../form-helpers/renderSelectFields';
import UserInvoicesTransferFunds from './UserInvoicesTransferFunds';
import UserInvoicesCalculation from './UserInvoicesCalculation';

const RowTable = styled(Row)`
  margin-bottom: 20px;
  border-radius: 1px;
  border: solid 2px #e1e5eb;

  & > * {
    padding: 13px 15px;
    border-right: solid 2px #e1e5eb;

    &:last-child{
      border-right: none ;
    }
  }
`;

const LabelWithoutMargin = styled(LABEL)`
  margin: 0;
`;

const BlueText = styled.span`
  color: #5ca0f6;
  cursor: pointer;
`;



class UserInvoices extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auction: '',
      invoices: [],
      invoicesModal: false
    };
  }

  toggleInvoicesModal() {
    this.setState({
      invoicesModal: !this.state.invoicesModal
    });
  }

  showModal(auction, invoices) {
    if (!invoices.length) {
      return;
    }

    this.setState({
      auction,
      invoices
    }, () => {
      this.toggleInvoicesModal();
    });

  }

  render() {

    const {
      invoicesInfo,
      allInvoices,
      openedInvoices,
      closedInvoices,
      awaitingPaymentInvoices,
      overdueInvoices,
      currencies
    } = this.props;

    const currenciesOptions = {};
    currencies.forEach((currency) => {
      currenciesOptions[currency.symbol] = currency.title;
    });

    return (
      <div>
        <H3 className="m-b-20">Invoices</H3>
        <RowTable>
          <Col xs="12" sm="4">
            <LabelWithoutMargin>
              Auction open | close
            </LabelWithoutMargin>
            <div>
              <BlueText onClick={() => {
                this.showModal('AUCTION OPEN', openedInvoices)
              }}>{invoicesInfo.open}</BlueText> | <BlueText onClick={() => {
                this.showModal('AUCTION CLOSED', closedInvoices)
              }}>{invoicesInfo.closed}</BlueText>
            </div>
          </Col>
          <Col xs="12" sm="4">
            <LabelWithoutMargin>
              Awaiting payment | overdue
            </LabelWithoutMargin>
            <div>
              <BlueText onClick={() => {
                this.showModal('AWAITING PAYMENT', awaitingPaymentInvoices)
              }}>{invoicesInfo.awaitingPayment}</BlueText> | <BlueText onClick={() => {
                this.showModal('OVERDUE INVOICES', overdueInvoices)
              }}>{invoicesInfo.overdue}</BlueText>
            </div>
          </Col>
          <Col xs="12" sm="4">
            <LabelWithoutMargin>
              Total
            </LabelWithoutMargin>
            <div>
              <BlueText onClick={() => {
                this.showModal('ALL INVOICES', allInvoices)
              }}>{invoicesInfo.total}</BlueText>
            </div>
          </Col>
        </RowTable>

        <InvoicesModal
          showInvoicesModal={this.state.invoicesModal}
          toggleInvoicesModal={this.toggleInvoicesModal.bind(this)}
          invoices={this.state.invoices}
          auction={this.state.auction}
        />

        <RowTable>
          <Col xs="12" sm="4">
            <LabelWithoutMargin>
              Principal debt, GBP
            </LabelWithoutMargin>
            <div>
              {floor(invoicesInfo.principalDebt)}
            </div>
          </Col>
          <Col xs="12" sm="4">
            <LabelWithoutMargin>
              Penalties, GBP
            </LabelWithoutMargin>
            <div>
              {floor(invoicesInfo.penalties)}
            </div>
          </Col>
          <Col xs="12" sm="4">
            <LabelWithoutMargin>
              Total debt, GBP
            </LabelWithoutMargin>
            <div>
              {floor(invoicesInfo.totalDebt)}
            </div>
          </Col>
        </RowTable>

        <div className="m-b-20 m-t-40">
          <div>
            Pay off invoice debts.
          </div>
          <UserInvoicesTransferFunds {...this.props} />
        </div>
        <div className="m-b-20 m-t-40">
          <UserInvoicesCalculation {...this.props} />
        </div>
      </div>
    );
  }
}

export default UserInvoices;
