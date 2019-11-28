import React from 'react';
import {Link} from 'react-router-dom';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import { H3, Lead} from '../../../../components/styled-components/Typography/index';
import CollateralModal from './Modals/CollateralModal';
import TransactionModal from './Modals/TransactionModal';
import XaupInWalletModal from './Modals/XaupInWalletModal';
import HistoryFilters from "./TransactionHistoryFilters";
import floor from "../../../../../helpers/formatters/floor";

const initialSate = {
  showCollateralModal: false,
  showXaupModal: false,
  showTransactionModal: false,
  rowData: null,
};


class Wallet extends React.Component {
  state = {...initialSate};

  renderShowLink = (cell, row) => {
    const isPPT = row.currency === 'PPT';
    const isXAUp = row.currency === 'XAUp';

    if(isPPT || isXAUp){
      return (
        <Link className="link-btn" to={'#'}
              onClick={()=>{this.toggleModal(isPPT ? 'showCollateralModal': 'showXaupModal')}}>
          View
        </Link>
      );
    }
  };

  amountFormatter = (cell) => {
    return (
      <span>{cell ? floor(cell) : '-'}</span>
    );
  };

  renderShowTransactionLink = (cell, row) => {
    return (
      <Link className="link-btn" to={'#'} onClick={()=>{this.toggleModal('showTransactionModal', row.logDetails)}}>
        View
      </Link>
    );
  };


  renderDescription = (cell, row) => {
    if(row.logDetails.type==='Invoice repayment'){
      return <span>
        Invoice <Link to={`/invoices/${row.logDetails.invoiceId}`}>{row.logDetails.invoiceId}</Link> is repaid.
      </span>;
    }
    return cell;
  }

  toggleModal = (modal, rowData = null) => {
    this.setState({
      [modal]: !this.state[modal],
      rowData: rowData,
    });
  };

  renderShowsTotal(start, to, total) {
    return (
      <p>
        Showing {start} to {to} of {total} entries
      </p>
    );
  }

  renderPaginationPanel = (props) => {
    const prevDisabled = props.currPage === 1;
    const nextDisabled = props.currPage === props.totalPages;
    return (
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        <div className='row col-12 col-sm-12 col-md-12 col-lg-12 p-r-0'>
          <div className='col-6 col-sm-6 col-md-4 col-lg-4 total-txt'>
            {props.components.totalText}
          </div>
          <div className='col-6 col-sm-6 offset-md-4 offset-lg-4 col-md-4 col-lg-4 text-right p-0'>
            <span className='label-color-1'>Load</span>
            {props.components.sizePerPageDropdown}
            <span className='label-color-2'>entries</span>
          </div>
        </div>
        <div
          className='row col-12 col-sm-6 offset-sm-3 offset-md-4 offset-lg-4 col-md-4 col-lg-4 p-r-0 pagination-block'>
          <Pagination>
            <PaginationItem disabled={prevDisabled}>
              <PaginationLink onClick={() => props.changePage(1)}>First</PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={prevDisabled}>
              <PaginationLink onClick={() => props.changePage(props.currPage - 1)}><span
                className='fa fa-long-arrow-left'/></PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink>
                {props.currPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={nextDisabled}>
              <PaginationLink onClick={() => props.changePage(props.currPage + 1)}><span
                className='fa fa-long-arrow-right'/></PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={nextDisabled}>
              <PaginationLink onClick={() => props.changePage(props.totalPages)}>Last</PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    );
  };

  render(){
    const { currencies, wallet, pokens, pptAdnPxt, xaupAdnEth, transactionHistory, depositLedgerLogs, xaupBlockchainActions,
      className } = this.props;
    const {showCollateralModal, showTransactionModal, showXaupModal, rowData, } = this.state;

    const options = {
      paginationPanel: this.renderPaginationPanel,
      paginationShowsTotal: this.renderShowsTotal,
      sizePerPageList: [5, 15, 30],
      sizePerPage: 5,
    };

    return(
      <div className={className}>

        <H3>Wallet</H3>

        <Lead className={'m-t-20'}>Pokens</Lead>
        <BootstrapTable
          data={pokens}
          pagination={false}
          bordered={false}
          condensed
          className='custom'
          bodyStyle={{border: '#e1e5eb 2px solid', borderTopWidth: '0px'}}
          trClassName={(row, rowIndex) => {
            return rowIndex % 2 === 0 ? "tr-odd" : "tr-even";
          }}
        >
          <TableHeaderColumn dataField='currency' isKey={true}>Currency</TableHeaderColumn>
          <TableHeaderColumn dataField='available' dataFormat={ this.amountFormatter.bind(this) } width='180'>Available</TableHeaderColumn>
          <TableHeaderColumn dataField='withdrawable' dataFormat={ this.amountFormatter.bind(this) } width='180' dataAlign='right'>Withdrawable</TableHeaderColumn>
          <TableHeaderColumn dataField='reserved' width='120' dataFormat={ this.amountFormatter.bind(this) } dataAlign='right'>Reserved</TableHeaderColumn>
        </BootstrapTable>

        <Lead className={'m-t-40'}>PPT and PXT</Lead>
        <BootstrapTable
          data={pptAdnPxt}
          bordered={false}
          className='custom'
          bodyStyle={{border: '#e1e5eb 2px solid', borderTopWidth: '0px'}}
          trClassName={(row, rowIndex) => {
            return rowIndex % 2 === 0 ? "tr-odd" : "tr-even";
          }}
        >
          <TableHeaderColumn dataField='currency' isKey={true}>Currency</TableHeaderColumn>
          <TableHeaderColumn dataField='available' dataFormat={ this.amountFormatter.bind(this) } dataAlign='right'>Available</TableHeaderColumn>
          <TableHeaderColumn dataField='exchanged' dataFormat={ this.amountFormatter.bind(this) } dataAlign='right'>Exchanged</TableHeaderColumn>
          <TableHeaderColumn dataField='total' dataFormat={ this.amountFormatter.bind(this) } dataAlign='right'>Total</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.renderShowLink} headerAlign='center' dataAlign='center'
                             width='100'>&nbsp;</TableHeaderColumn>
        </BootstrapTable>

        <Lead className={'m-t-40'}>XAUp and ETH</Lead>
        <BootstrapTable
          data={xaupAdnEth}
          bordered={false}
          className='custom'
          bodyStyle={{border: '#e1e5eb 2px solid', borderTopWidth: '0px'}}
          trClassName={(row, rowIndex) => {
            return rowIndex % 2 === 0 ? "tr-odd" : "tr-even";
          }}
        >
          <TableHeaderColumn dataField='currency' isKey={true}>Currency</TableHeaderColumn>
          <TableHeaderColumn dataField='withdrawable' dataFormat={ this.amountFormatter.bind(this) } dataAlign='right'>Withdrawable</TableHeaderColumn>
          <TableHeaderColumn dataField='total' dataFormat={ this.amountFormatter.bind(this) } dataAlign='right'>Total</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.renderShowLink} headerAlign='center' dataAlign='center'
                             width='100'>&nbsp;</TableHeaderColumn>
        </BootstrapTable>

        <div className={'m-t-60'}>
          <H3>Transaction history</H3>
          <HistoryFilters {...this.props} />
          <BootstrapTable
            data={transactionHistory}
            bordered={false}
            pagination={true}
            bodyStyle={{border: '#e1e5eb 2px solid', borderTopWidth: '0px'}}
            trClassName={(row, rowIndex) => {
              return rowIndex % 2 === 0 ? "tr-odd" : "tr-even";
            }}
            options={options}
          >
            <TableHeaderColumn dataField='type' isKey={true}>Type</TableHeaderColumn>
            <TableHeaderColumn dataField='description' dataFormat={this.renderDescription}>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='date'>Date, Time</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.renderShowTransactionLink} headerAlign='center' dataAlign='center'
                               width='100'>&nbsp;</TableHeaderColumn>
          </BootstrapTable>
        </div>

        <CollateralModal {...{
          wallet, showCollateralModal, toggleModal: this.toggleModal, depositLedgerLogs, currencies,
          getInCollateral: this.getInCollateral
        }} />

        <XaupInWalletModal {...{showXaupModal, toggleModal: this.toggleModal, xaupBlockchainActions}} />

        { rowData && showTransactionModal &&
          <TransactionModal {...{showTransactionModal, toggleModal: this.toggleModal, transactionDetails: rowData}} />
        }

      </div>
    );
  }
}

export default Wallet;
