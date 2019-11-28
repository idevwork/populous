import React, {Fragment} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import {Link} from 'react-router-dom';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {toastr} from 'react-redux-toastr';
import {requestTypes} from 'meteor/populous:constants';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import TableSearch from '../../tablesComponents/TableSearch';
import {addToMyQueue, unassign} from '../../../../Requests/components/MyQueue/modules/actions';
import {PrimaryButton} from '../../../../../components/styled-components/Buttons';
import Checkbox from '../../tablesComponents/Checkbox';
import {LinkButton} from '../../../../../components/styled-components/Buttons';
import {getTotalRequests} from '../modules/actions';

const SelectStyled = styled(Select)`
  .Select-value {
    padding: 0 !important;
    text-align: center;
  }
  .Select-menu { 
    width: 40px;
    text-align: center;
  }
`;


class RequestsPoolTable extends React.Component {
  componentDidMount() {
    getTotalRequests(this.props.type);
  }

  customMultiSelect = (props) => {
    const {type, checked, disabled, onChange, rowIndex} = props;
    if (rowIndex === 'Header') {
      return (
        <div className='checkbox-personalized'>
          <Checkbox {...props}/>
          <label className="p-0" htmlFor={'checkbox' + rowIndex}>
            <div className='check'></div>
          </label>
        </div>);
    } else {
      return (
        <div className='checkbox-personalized'>
          <input
            type={type}
            name={'checkbox' + rowIndex}
            id={'checkbox' + rowIndex}
            checked={checked}
            disabled={disabled}
            onChange={e => onChange(e, rowIndex)}
            ref={input => {
              if (input) {
                input.indeterminate = props.indeterminate;
              }
            }}/>
          <label className="p-0" htmlFor={'checkbox' + rowIndex}>
            <div className='check'></div>
          </label>
        </div>
      );
    }
  };

  addToMyQueue() {
    const {selectedRowKeys} = this.refs.requestsTable.state;
    const {requests} = this.props;

    if (selectedRowKeys.length == 0) {
      toastr.error('Error', 'Please select at least one request');
      return;
    }

    const responce = selectedRowKeys.map((requetId) => {
      return requests.filter((request) => (request._id === requetId))[0].dataId;
    });

    addToMyQueue(responce);
    this.refs.requestsTable.cleanSelected();
  }

  unassign() {
    const {selectedRowKeys} = this.refs.requestsTable.state;
    const {requests} = this.props;

    if (selectedRowKeys.length == 0) {
      toastr.error('Error', 'Please select at least one request');
      return;
    }

    const responce = selectedRowKeys.map((requetId) => {
      return requests.filter((request) => (request._id === requetId))[0].dataId;
    });

    unassign(responce);
    this.refs.requestsTable.cleanSelected();
  }

  createCustomButtonGroup = props => {
    return (
      <div>
        <PrimaryButton md onClick={() => this.addToMyQueue()}>ADD TO MY QUEUE</PrimaryButton>
        <PrimaryButton outline md onClick={() => this.unassign()}>Unassign</PrimaryButton>
      </div>
    );
  };

  customConfirm = (next, dropRowKeys) => {
    this.props.confirmDelete(next);
  };

  createCustomToolBar = (props) => {
    return (
      <div className='row col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
          {props.components.btnGroup}
        </div>
        <div className='col-xs-12 col-sm-12 col-md-8 col-lg-8'>
          {props.components.searchPanel}
        </div>
      </div>
    );
  };

  renderPaginationPanel = () => {
    const {onPageChange, onLoadEntriesChange, currentPage, loadEntries, totalRequests} = this.props;
    const totalPages = Math.round(totalRequests / loadEntries);
    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;

    const options = [
      {
        value: 5,
        label: 5
      },
      {
        value: 15,
        label: 15
      },
      {
        value: 30,
        label: 30
      }
    ];
    const start = currentPage === 1 ? 1 : (currentPage - 1) * loadEntries;
    const to = start === 1 ? loadEntries : start + loadEntries;

    return (
      <div className="react-bs-table-container">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 react-bs-table-pagination">
          <div className='row col-12 col-sm-12 col-md-12 col-lg-12 p-r-0'>
            <div className='col-6 col-sm-6 col-md-4 col-lg-4 total-txt'>
              <p>
                Showing {start} to {to} of {totalRequests} entries
              </p>
            </div>
            <div className='col-6 col-sm-6 offset-md-4 offset-lg-4 col-md-4 col-lg-4 text-right p-0'>
              <span className='label-color-1'>Load</span>
              <SelectStyled
                className="custom-selectbox m-l-10 m-r-10"
                simpleValue
                value={loadEntries}
                searchable={false}
                clearable={false}
                onChange={(option) => onLoadEntriesChange(option)}
                options={options}
                arrowRenderer={() => {
                }}
              />
              <span className='label-color-2'>entries</span>
            </div>
          </div>
          <div
            className='row col-12 col-sm-6 offset-sm-3 offset-md-4 offset-lg-4 col-md-4 col-lg-4 p-r-0 pagination-block'>
            <Pagination>
              <PaginationItem disabled={prevDisabled}>
                <PaginationLink onClick={() => onPageChange(1)}>First</PaginationLink>
              </PaginationItem>
              <PaginationItem disabled={prevDisabled}>
                <PaginationLink onClick={() => onPageChange(currentPage - 1)}><span className='fa fa-long-arrow-left'/></PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem disabled={nextDisabled}>
                <PaginationLink onClick={() => onPageChange(currentPage + 1)}><span className='fa fa-long-arrow-right'/></PaginationLink>
              </PaginationItem>
              <PaginationItem disabled={nextDisabled}>
                <PaginationLink onClick={() => onPageChange(totalPages)}>Last</PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
    );
  };

  renderViewLink = (cell, row, enumObject, index) => {
    const {requests} = this.props;

    if (row.type === 'invoice') {
      return (
        <Link className="link-btn" to={'/invoices/' + row.dataId}>
          View
        </Link>
      );
    }

    return (
      <LinkButton
        className="p-0 m-0" md
        onClick={(event) => {
          event.stopPropagation();
          this.props.toggle(requests[index]);
        }}
      >
        View
      </LinkButton>
    );
  }

  dateFormatter = (row) => {
    return moment(row).format('DD-MM-YYYY, hh:mm a');
  }

  assignedFormatter = (row) => {
    if (moment(row).isValid()) {
      const expiredDate = moment(row).add(24, 'hours');
      const currentDate = moment().utc();
      const isExpired = currentDate.isAfter(expiredDate);

      return (
        <span className={isExpired ? 'red-color' : ''}>
          {isExpired && <img src="/images/icons/ico-attention.svg" height={24} className="m-r-10 m-b-5"/>}
          {moment(row).format('DD-MM-YYYY, hh:mm a')}
        </span>
      );
    }

    return row;
  }

  render() {
    const {
      requests,
      keyword, type, status,
      onKeywordChange, onTypeChange, onStatusChange
    } = this.props;
    // Sort so the new requests are at the top
    const _requests = requests.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    });

    const options = {
      searchField: (props) => (
        <TableSearch
          keyword={keyword} onKeywordChange={onKeywordChange}
          type={type} onTypeChange={onTypeChange}
          status={status} onStatusChange={onStatusChange}
        />
      ),
      toolBar: this.createCustomToolBar,
      btnGroup: this.createCustomButtonGroup,
      handleConfirmDeleteRow: this.customConfirm,
    };

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      className: 'table-row-selected',
      columnWidth: '60px',
      customComponent: this.customMultiSelect
    };

    return (
      <Fragment>
        <BootstrapTable
          data={_requests} options={options} bordered={false} search searchPlaceholder="Search..."
          containerStyle={{marginBottom: '20px'}} bodyStyle={{border: '#e1e5eb 2px solid', borderTopWidth: '0px'}}
          trClassName={(row, rowIndex) => {
            return rowIndex % 2 === 0 ? "tr-odd" : "tr-even";
          }}
          selectRow={selectRow} ref="requestsTable"
        >
          <TableHeaderColumn dataField='_id' isKey={true} tdStyle={{verticalAlign: 'middle'}} headerAlign='left'
                             dataFormat={(value) => `${value.substring(0, 4)}...`}
                             dataAlign='left'>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='createdAt' dataFormat={this.dateFormatter}
                             tdStyle={{verticalAlign: 'middle'}} headerAlign='center'
                             dataAlign='center'>
            Created
          </TableHeaderColumn>
          <TableHeaderColumn dataField='status' tdStyle={{verticalAlign: 'middle'}} headerAlign='left'
                             dataAlign='left'>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField='executor' tdStyle={{verticalAlign: 'middle'}} headerAlign='left'
                             dataAlign='left'>
            Executor
          </TableHeaderColumn>
          <TableHeaderColumn dataField='assignedDate' dataFormat={this.assignedFormatter}
                             tdStyle={{verticalAlign: 'middle'}} headerAlign='left'
                             dataAlign='left'>
            Assigned
          </TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.renderViewLink} headerAlign='center' dataAlign='center'
                             width='90'>
            &nbsp;
          </TableHeaderColumn>
        </BootstrapTable>

        {this.renderPaginationPanel()}
      </Fragment>
    );
  }
};

export default RequestsPoolTable;
