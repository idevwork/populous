import React, {Fragment} from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Col, Pagination, PaginationItem, PaginationLink, Row, Table} from 'reactstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { H3, H2 } from '../../../../components/styled-components/Typography';
import { LinkButton } from '../../../../components/styled-components/Buttons';
import BankPageNoteModal from './BankPageNoteModal';
import Tab from '../../../../components/styled-components/Tab';

const InfoTable = styled.tbody`
  td {
    padding: 0.25rem;
  }
  .item {
    display: flex;
    justify-content: space-between;
    span {
      text-align: left;
      &.item-value {
        text-align: right;
        font-weight: bold;
      }
    }
  }
`;

class BankPages extends React.Component {

  renderPaginationPanel = (props) => {
    const prevDisabled = props.currPage===1;
    const nextDisabled = props.currPage===props.totalPages;
    return (
      <Fragment>
          <Col className={'total-txt'}>
            {props.components.totalText}
          </Col>
          <Col className={'text-right order-lg-3'}>
            <span className='label-color-1'>Load</span>
            { props.components.sizePerPageDropdown }
            <span className='label-color-2'>entries</span>
          </Col>

        <Col className={'order-lg-2'} md={12} xs={12} lg={'auto'}>
          <Pagination>
            <PaginationItem disabled={ prevDisabled }>
              <PaginationLink onClick={ () => props.changePage(1) }>First</PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={ prevDisabled }>
              <PaginationLink onClick={ () => props.changePage(props.currPage-1) }><span className='fa fa-long-arrow-left'/></PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink>
                {props.currPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={ nextDisabled }>
              <PaginationLink onClick={ () => props.changePage(props.currPage+1) }><span className='fa fa-long-arrow-right'/></PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={ nextDisabled }>
              <PaginationLink onClick={ () => props.changePage(props.totalPages) }>Last</PaginationLink>
            </PaginationItem>
          </Pagination>
        </Col>
      </Fragment>
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      transaction: null,
      noteModal: false,
      selectedBank: null
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.state.selectedBank && this.props.tideConfig && Object.keys(this.props.tideConfig.value.accounts).length > 0) {
      this.onSelectBank(Object.values(this.props.tideConfig.value.accounts)[0].tideAccountID)
    }
  }

  renderShowsTotal(start, to, total) {
    return (
      <p>
        Showing { start } to { to } of { total } entries
      </p>
    );
  }

  renderViewLink = (cell, row,) => {
    return (
      <LinkButton md className="p-0 m-0" onClick={() => this.setState({transaction: row, noteModal: true})}>View Note</LinkButton>
    );
  }

  toggleModal = () => {
    this.setState({noteModal: false, transaction: null})
  }

  onSelectBank = (selectedBank) => {
    this.setState({selectedBank})
    this.props.loadTransactionsForAccount(selectedBank)
  }

  render() {
    const { transactions = {}, tideConfig } = this.props;
    const { selectedBank } = this.state
    const options = {
      paginationShowsTotal: this.renderShowsTotal,
      paginationPanel: this.renderPaginationPanel,
      sizePerPageList: [ 5, 15, 30 ],
      sizePerPage: 15
    };

    let data = []
    let accounts = []
    if (tideConfig) {
      accounts = Object.values(tideConfig.value.accounts || {})
    }
    if (selectedBank && transactions[selectedBank]) {
      data = transactions[selectedBank]
    }

    return (
      <div>
        <H3 className="m-b-20">Bank Pages</H3>
        <Row>
          <Col md={7}>
            {accounts.map(account =>
              <Tab size={'0.9rem'} className={classnames({active: selectedBank === account.tideAccountID})}
                style={{textTransform: 'none'}}
                key={account.tideAccountID}
                onClick={() => {
                  this.onSelectBank(account.tideAccountID);
                }}>
                {account.name}
              </Tab>
            )}
          </Col>
          <Col md={5} className="text-right">
            <Table bordered>
              <InfoTable>
                <tr>
                  <td><div className="item"><span>Sort</span> <span className="item-value">xx</span></div></td>
                  <td><div className="item"><span>Name</span> <span className="item-value">xx</span></div></td>
                </tr>
                <tr>
                  <td><div className="item"><span>Currency</span> <span className="item-value">xx</span></div></td>
                  <td><div className="item"><span>Number</span> <span className="item-value">xx</span></div></td>
                </tr>
              </InfoTable>
            </Table>
          </Col>
        </Row>
        <Fragment>
          <Row className="m-t-20">
            <Col>
              <H2>Transaction History</H2>
            </Col>
          </Row>
          <BootstrapTable data={ data } options={ options }
                          bordered={ false } pagination
                          containerStyle={{marginBottom: '20px'}}
                          bodyStyle={{ border: '#e1e5eb 2px solid', borderTopWidth: '0px' }}
                          trClassName={(row, rowIndex)=>{ return rowIndex % 2 === 0 ? "tr-odd" : "tr-even"; }}>

            <TableHeaderColumn dataField='transactionId' tdStyle={{verticalAlign: 'middle'}}
                              headerAlign='left' dataAlign='left' isKey={true}>
              Transaction ID
            </TableHeaderColumn>

            <TableHeaderColumn dataField='description' tdStyle={{verticalAlign: 'middle'}}
                              headerAlign='left' dataAlign='left'>
              Description
            </TableHeaderColumn>

            <TableHeaderColumn dataField='type' tdStyle={{verticalAlign: 'middle'}}
                              headerAlign='left' dataAlign='left'>
              Type
            </TableHeaderColumn>

            <TableHeaderColumn dataField='status' tdStyle={{verticalAlign: 'middle'}}
                              headerAlign='left' dataAlign='left'>
              Status
            </TableHeaderColumn>

            <TableHeaderColumn dataFormat={ this.renderViewLink } headerAlign='center'
                              dataAlign='center' width='120'>
              &nbsp;
            </TableHeaderColumn>
          </BootstrapTable>
        </Fragment>
        <BankPageNoteModal isOpen={this.state.noteModal} toggle={this.toggleModal} transaction={this.state.transaction} />
      </div>
    );
  }
};

export default BankPages;
