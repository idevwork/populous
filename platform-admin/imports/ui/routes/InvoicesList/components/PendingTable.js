import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

import TableSearch from './TableSearch';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ArrowRightIcon from "../../../components/Icons/ArrowRightIcon";
import floor from "../../../../helpers/formatters/floor";

class PendingTable extends React.Component {
  createCustomToolBar = (props) => {
    return (
      <div className='row col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        {props.components.searchPanel}
      </div>
    );
  };

  renderPaginationPanel = (props) => {
    const prevDisabled = props.currPage === 1;
    const nextDisabled = props.currPage === props.totalPages;
    return (
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        <div className='row col-12 col-sm-12 col-md-12 col-lg-12'>
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
  }

  renderShowsTotal(start, to, total) {
    return (
      <p>
        Showing {start} to {to} of {total} entries
      </p>
    );
  }

  dateFormatter(cell) {
    return moment(cell).format('DD-MM-YYYY');
  }

  activeFormatter(cell, row, enumObject, index) {
    const {invoices} = this.props;
    const invoiceId = invoices[index]._id;
    return (
      <Link className="link-btn" to={'/invoices/' + row._id}>
        View
      </Link>
    );
  }

  amountFormatter(cell) {
    return (
      <span>{floor(cell)}</span>
    );
  }

  renderClickableColumnHead = (field, text,) => {
    const {sortField, sortOrder} = this.props;
    let arrow;

    if(field === sortField){
      arrow = <ArrowRightIcon style={{
        display: 'inline-block',
        marginLeft: 3,
        verticalAlign: 'text-top',
      }} color={'#636466'} size={15} rotate={-90 * sortOrder}/>
    }

    return (
      <div onClick={this.props.onSortOrderChange.bind(this, field)} className={'pointer p-10'}>
        {text} {arrow}
      </div>
    )
  };

  render() {
    const {invoices} = this.props;

    const options = {
      searchField: (props) => (
        <TableSearch {...this.props} />
      ),
      toolBar: this.createCustomToolBar,
      paginationShowsTotal: this.renderShowsTotal,
      paginationPanel: this.renderPaginationPanel,
      sizePerPageList: [5, 15, 30],
      sizePerPage: 15,
    };

    const thStyle = {padding: 0};

    return (
      <BootstrapTable data={invoices} options={options} bordered={false} pagination search
                      searchPlaceholder="Search..." containerStyle={{marginBottom: '20px'}}
                      bodyStyle={{border: '#e1e5eb 2px solid', borderTopWidth: '0px'}} trClassName={(row, rowIndex) => {
        return rowIndex % 2 === 0 ? "tr-odd" : "tr-even";
      }}>
        <TableHeaderColumn dataField='_id' isKey={true} tdStyle={{verticalAlign: 'middle'}} headerAlign='center'
                           dataAlign='center' width='160' thStyle={thStyle}>
          {this.renderClickableColumnHead('_id', 'Invoice ID')}
        </TableHeaderColumn>
        <TableHeaderColumn dataField='invoiceNumber' tdStyle={{verticalAlign: 'middle'}} headerAlign='center'
                           dataAlign='center' width='140' thStyle={thStyle}>
          {this.renderClickableColumnHead('invoiceNumber', 'Invoice No')}
        </TableHeaderColumn>
        <TableHeaderColumn dataField='companyName' tdStyle={{verticalAlign: 'middle'}} headerAlign='center'
                           dataAlign='center' width='190' thStyle={thStyle}>

          {this.renderClickableColumnHead('companyName', 'Company name')}
        </TableHeaderColumn>
        <TableHeaderColumn dataField='amount' dataFormat={this.amountFormatter.bind(this)}
                           tdStyle={{verticalAlign: 'middle'}} headerAlign='right' dataAlign='right' width='140'
                           thStyle={thStyle}>
          {this.renderClickableColumnHead('amount', 'Invoice amount')}
        </TableHeaderColumn>
        <TableHeaderColumn dataField='salePrice' dataFormat={this.amountFormatter.bind(this)}
                           tdStyle={{verticalAlign: 'middle'}} headerAlign='right' dataAlign='right' width='140'
                           thStyle={thStyle}>
          {this.renderClickableColumnHead('salePrice', 'Advanced amount')}
        </TableHeaderColumn>
        <TableHeaderColumn dataField='createdAt' dataFormat={this.dateFormatter.bind(this)}
                           tdStyle={{verticalAlign: 'middle'}} headerAlign='center' dataAlign='center' width='120'
                           thStyle={thStyle}>
          {this.renderClickableColumnHead('createdAt', 'Uploaded')}
        </TableHeaderColumn>
        <TableHeaderColumn dataField='status' tdStyle={{verticalAlign: 'middle'}} headerAlign='center'
                           dataAlign='center' width='150' thStyle={thStyle}>
          {this.renderClickableColumnHead('status', 'Status')}
        </TableHeaderColumn>
        <TableHeaderColumn dataFormat={this.activeFormatter.bind(this)} headerAlign='center' dataAlign='center'
                           width='60'>
          &nbsp;
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
};

export default PendingTable;
