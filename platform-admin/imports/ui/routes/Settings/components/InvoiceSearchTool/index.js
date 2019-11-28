import React, {Fragment} from 'react';
import {Row, Col} from 'reactstrap';
import {H3} from "../../../../components/styled-components/Typography";
import Loading from '../../../../components/Loading';
import InvoiceSearchFormSettings from './InvoiceSearchFormSettings';
import InvoiceCollapsableView from './InvoiceCollapsableView';
import styled from 'styled-components';

class InvoiceSearchTool extends React.Component {

  render() {
    const {form, formActions, className, invoiceSearch} = this.props;
    const { loading, data = [], invoiceId } = invoiceSearch

    return (
      <div className={className}>
        <Row>
          <Col>
            <H3>INVOICE SEARCH TOOL</H3>
          </Col>
        </Row>
        <InvoiceSearchFormSettings {...form} {...formActions} />
        <div className="content-wrapper">
          {loading ? <Loading /> :
            data.map((invoiceData, index) => {
              return <InvoiceCollapsableView
                  invoiceData={invoiceData}
                  invoiceId={invoiceId}
                  key={index}
              />
            })
          }
        </div>
      </div>
    )
  }
}

const InvoiceSearchToolWrap = styled(InvoiceSearchTool)`
  .content-wrapper {
    max-height: 500px;
    overflow-y: auto;
    &::-webkit-scrollbar { width: 0 !important }
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
  @media (max-width: 768px) {
    .content-wrapper {
      max-height: none;
    }
  }
`;
export default InvoiceSearchToolWrap;