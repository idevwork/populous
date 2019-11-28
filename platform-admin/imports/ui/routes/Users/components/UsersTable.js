import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Pagination, PaginationItem, PaginationLink, Table, Form, FormGroup, Label, ButtonGroup} from 'reactstrap';
import {toastr} from 'react-redux-toastr';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import CustomCheckbox from '../../../components/styled-components/Forms/CustomCheckbox';
import {PrimaryButton, DangerButton} from '../../../components/styled-components/Buttons';
import {StyledInput} from '../../../components/styled-components/Inputs';
import MySearchField from './MySearchField';
import Checkbox from './Checkbox';

class UsersTable extends React.Component {

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
            <div className='check'/>
          </label>
        </div>
      );
    }
  };

  sendEmail = () => {
    const selectedKeys = this.refs.userTable.state.selectedRowKeys;
    if (selectedKeys.length === 0) {
      toastr.error('Error', 'Please select at least one user');
      return;
    }
    let emails = [];
    this.props.users.map((user) => {
      if (selectedKeys.indexOf(user._id) >= 0) {
        emails.push(user.email);
      }
    });
    this.props.sendEmail(emails);
  };

  createCustomButtonGroup = props => {
    return (
      <ButtonGroup>
        <PrimaryButton md onClick={() => this.sendEmail()} className='m-0 m-r-20'>
          Send Email
        </PrimaryButton>
      </ButtonGroup>
    );
  }

  createCustomToolBar = (props) => {
    return (
      <div className='row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-2'>
          {props.components.btnGroup}
        </div>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-10'>
          {props.components.searchPanel}
        </div>
      </div>
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
  }

  renderShowsTotal(start, to, total) {
    return (
      <p>
        Showing {start} to {to} of {total} entries
      </p>
    );
  }

  nameMerger(cell, row, enumObject, index) {
    return (
      <span>{row.firstName + ' ' + row.lastName}</span>
    );
  }

  activeFormatter(cell, row, enumObject, index) {
    return (
      <Link className="link-btn" to={'/users/' + row._id}>
        View
      </Link>
    );
  }

  render() {
    const {users, filters, onStatusChange, onRoleChange, onKeywordChange, onSicChange} = this.props;

    const options = {
      searchField: (props) => (
        <MySearchField {...filters}
                       onStatusChange={onStatusChange}
                       onRoleChange={onRoleChange}
                       onSicChange={onSicChange}
                       onKeywordChange={onKeywordChange}/>
      ),
      toolBar: this.createCustomToolBar,
      btnGroup: this.createCustomButtonGroup,
      paginationShowsTotal: this.renderShowsTotal,
      paginationPanel: this.renderPaginationPanel,
      sizePerPageList: [5, 15, 30],
      sizePerPage: 15,
    };
    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      className: 'table-row-selected',
      columnWidth: '60px',
      customComponent: this.customMultiSelect
    };
    return (
      <BootstrapTable selectRow={selectRow} data={users} options={options} bordered={false}
                      pagination search searchPlaceholder="Search..."
                      containerStyle={{marginBottom: '20px'}}
                      bodyStyle={{border: '#e1e5eb 2px solid', borderTopWidth: '0px'}}
                      trClassName={(row, rowIndex) => {
                        return rowIndex % 2 === 0 ? "tr-odd" : "tr-even";
                      }}
                      ref="userTable">
        <TableHeaderColumn dataField='email' tdStyle={{verticalAlign: 'middle'}} headerAlign='left'
                           dataAlign='left'>Email</TableHeaderColumn>
        <TableHeaderColumn dataFormat={this.nameMerger.bind(this)} tdStyle={{verticalAlign: 'middle'}}
                           headerAlign='left' dataAlign='left'>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='_id' tdStyle={{verticalAlign: 'middle'}} headerAlign='left' dataAlign='left'
                           isKey={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='party' tdStyle={{verticalAlign: 'middle'}} headerAlign='center' dataAlign='center'
                           width='120'>Party</TableHeaderColumn>
        <TableHeaderColumn dataField='KYCStatus' tdStyle={{verticalAlign: 'middle'}} headerAlign='center'
                           dataAlign='center' width='150'>KYC data status</TableHeaderColumn>
        <TableHeaderColumn dataField='accountStatus' tdStyle={{verticalAlign: 'middle'}} headerAlign='center'
                           dataFormat={(value, document) => {
                             if (!document.emails[0].verified) {
                               return 'Unverified email';
                             }
                             return value;
                           }}
                           dataAlign='center' width='130'>Account status</TableHeaderColumn>
        <TableHeaderColumn dataFormat={this.activeFormatter.bind(this)} headerAlign='center' dataAlign='center'
                           width='100'>&nbsp;</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default UsersTable;
