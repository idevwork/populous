import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Pagination, PaginationItem, PaginationLink, Label } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toastr } from 'react-redux-toastr';

import { DangerButton, LinkButton } from '../../../components/styled-components/Buttons';
import TableSearch from './TableSearch';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class TransactionsTable extends React.Component {

  createCustomToolBar = (props) => {
    return (
      <div className='row col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-end'>
        { props.components.searchPanel }
      </div>
    );
  }

  renderPaginationPanel = (props) => {
    const prevDisabled = props.currPage===1;
    const nextDisabled = props.currPage===props.totalPages;
    return (
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        <div className='row col-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='col-6 col-sm-6 col-md-4 col-lg-4 total-txt'>
            {props.components.totalText}
          </div>
          <div className='col-6 col-sm-6 offset-md-4 offset-lg-4 col-md-4 col-lg-4 text-right p-0'>
            <span className='label-color-1'>Load</span>
            { props.components.sizePerPageDropdown }
            <span className='label-color-2'>entries</span>
          </div>
        </div>
        <div className='row col-12 col-sm-6 offset-sm-3 offset-md-4 offset-lg-4 col-md-4 col-lg-4 p-r-0 pagination-block'>
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
        </div>
      </div>
    );
  }

  renderShowsTotal(start, to, total) {
    return (
      <p>
        Showing { start } to { to } of { total } entries
      </p>
    );
  }

  dateFormatter(row) {
    return moment(row).format('DD-MM-YYYY');
  }

  renderClipbooard(cell, row, enumObject, index) {
    const transaction = this.props.transactions[index];
    return (
      <div className="d-flex justify-content-center align-items-center p-r-10">
        <CopyToClipboard
          text={transaction.ethAddress}
          onCopy={()=>toastr.success('successfully copied to clipboard')}
        >
          <img src="/images/icons/clipboard.png" width="19" height="23" style={{cursor: 'pointer'}} />
        </CopyToClipboard>
      </div>
    );
  }

  renderViewLink(cell, row, enumObject, index) {
    const { transactions } = this.props;
    return (
      <LinkButton md className="p-0 m-0" onClick={() => this.props.toggle(transactions[index])}>View</LinkButton>
    );
  }

  render() {
    const { transactions } = this.props;
    // Sort so the new requests are at the top
    const _transactions = transactions.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    });

    const options = {
      searchField: (props) => (
        <TableSearch status={this.props.status} type={this.props.type} keyword={this.props.keyword}
                    onTypeChange={this.props.onTypeChange}
                    onStatusChange={this.props.onStatusChange}                    
                    onKeywordChange={this.props.onKeywordChange}
        />
      ),
      toolBar: this.createCustomToolBar,
      paginationShowsTotal: this.renderShowsTotal,
      paginationPanel: this.renderPaginationPanel,
      sizePerPageList: [ 5, 15, 30 ],
      sizePerPage: 15,
    };

    return (
      <BootstrapTable data={ _transactions } options={ options } bordered={ false } pagination search searchPlaceholder="Search..." containerStyle={{marginBottom: '20px'}} bodyStyle={{ border: '#e1e5eb 2px solid', borderTopWidth: '0px' }} trClassName={(row, rowIndex)=>{ return rowIndex % 2 === 0 ? "tr-odd" : "tr-even"; }}>
        <TableHeaderColumn dataFormat={ this.renderClipbooard.bind(this) } headerAlign='center' dataAlign='center' width='110'>Eth.Address</TableHeaderColumn>
        <TableHeaderColumn dataField='id' isKey={ true } tdStyle={{verticalAlign: 'middle'}} headerAlign='left' dataAlign='lef' width='150'>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='type' tdStyle={{verticalAlign: 'middle'}} headerAlign='left' dataAlign='left' width='120'>Type</TableHeaderColumn>
        <TableHeaderColumn dataField='description' tdStyle={{verticalAlign: 'middle'}} headerAlign='left' dataAlign='left' width='150'>Description</TableHeaderColumn>
        <TableHeaderColumn dataField='created_at' tdStyle={{verticalAlign: 'middle'}} headerAlign='center' dataAlign='center' width='200'>Created</TableHeaderColumn>
        <TableHeaderColumn dataField='status' tdStyle={{verticalAlign: 'middle'}} headerAlign='center' dataAlign='center' width='150'>Status</TableHeaderColumn>
        <TableHeaderColumn dataFormat={ this.renderViewLink.bind(this) } headerAlign='center' dataAlign='center' width='90'>&nbsp;</TableHeaderColumn>
      </BootstrapTable>
    );
  }
};

export default TransactionsTable;
