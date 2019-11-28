import React from 'react';
import {Row, Col} from 'reactstrap';
import Collapsible from 'react-collapsible';
import styled from 'styled-components';

class InvoiceCollapsableView extends  React.Component {
  render() {
    const { invoiceData, className, invoiceId } = this.props;
    let totalValue = 0;
    invoiceData.invoices.map(invoice => {
      if (invoice.toValue && invoice.amount) {
        totalValue += invoice.toValue - invoice.amount;
      }
    })

    return (
      <div className={className}>
        <Collapsible triggerStyle={{color:'#5CA0F6'}} trigger={'User #'+invoiceData.userId}>
          <Row className="content-header">
            <Col>Invoice ID</Col>
            <Col>Interest</Col>
          </Row>
            {
              invoiceData.invoices.map(invoice => {
                return <Row key={invoice.invoiceId} className="content-data">
                  <Col style={{overflow:'hidden'}}>{invoice.invoiceId}</Col>
                  <Col>{(invoice.toValue && invoice.amount) ? (invoice.toValue - invoice.amount).toFixed(2) : ''}</Col>
                </Row>
              })
            }
          <Row className="content-data" style={{marginTop:'10px', marginBottom:'10px'}}>
            <Col></Col>
            <Col style={{ fontWeight: 'bold'}}>{totalValue.toFixed(2)}</Col>
          </Row>
        </Collapsible>
      </div>
    )
  }
}

const InvoiceCollapsableViewWrap = styled(InvoiceCollapsableView)`
  .Collapsible {
    // border: 2px solid #EEEEEE;
    margin-top:10px;
    margin-bottom:10px;
  }
  .Collapsible__contentInner {
    padding: 10px;
  }

  .Collapsible__trigger {
    display: block !important;
    position: relative;
    border : 1px solid white;
    text-decoration: none;
    padding: 10px;
    font-size: 19px;

    &:after {
      font-family: 'FontAwesome';
      content: '\f107';
      position: absolute;
      right: 10px;
      top: 10px;
      display: block;
      transition: transform 300ms;
      color: grey;
    }

    &.is-open {
      &:after {
        transform: rotateZ(180deg);
      }
    }
  }
  .content-header {
    margin-bottom: 10px;
    // border-bottom: 1px solid #EEEEEE;
    font-size: 14px;
    color: #636466;
  }

  .content-data {
    font-size: 19px;
    color: #434445;
  }
`;

export default InvoiceCollapsableViewWrap;