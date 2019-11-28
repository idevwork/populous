import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { requestTypes } from 'meteor/populous:constants';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import TrashIcon from "../../../../components/Icons/TrashIcon";
import { StyledInput } from '../../../../components/styled-components/Inputs';


class EmailsTable extends React.Component {
  createCustomToolBar = (props) => {
    return (
      <div className='col-xs-12 col-sm-3'>
        { props.components.searchPanel }
      </div>
    );
  };

  renderEditButton = (cell, row, enumObject, index) => {
    const { emails, toggleModal } = this.props;
    return (
      <span onClick={() => toggleModal(emails[index])} style={{cursor: 'pointer'}}>
        <img src="/images/icons/ico-edit.svg" />
      </span>
    );
  };

  renderRemoveButton = (cell, row, enumObject, index) => {
    const { emails, removeEmailValidate } = this.props;
    return (
      <span onClick={() => removeEmailValidate(emails[index])} style={{cursor: 'pointer'}}>
        <TrashIcon color={'#5ca0f6'}/>
      </span>
    );
  };

  urlFormatter(cell) {
    return (
      <span style={{color:'#5ca0f6'}}>{cell}</span>
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
  };

  renderShowsTotal = (start, to, total) => {
    return (
      <p>
        Showing { start } to { to } of { total } entries
      </p>
    );
  };

  render() {
    const { emails, onKeywordChange } = this.props;
    const options = {
      searchField: (props) => (
        <StyledInput className="p-l-0" placeholder='Search...' onBlur={(event) => onKeywordChange(event.target.value) } />
      ),
      toolBar: this.createCustomToolBar,
      paginationShowsTotal: this.renderShowsTotal,
      sizePerPageList: [ 10, 20, 30 ],
      sizePerPage: 10,
      paginationPanel: this.renderPaginationPanel,
    };

    return (
      <BootstrapTable
        data={ emails } options={ options }  bordered={ false } pagination search searchPlaceholder="Search..."
        containerStyle={{marginBottom: '20px'}} bodyStyle={{ border: '#e1e5eb 2px solid', borderTopWidth: '0px' }}
        trClassName={(row, rowIndex)=>{ return rowIndex % 2 === 0 ? "tr-odd" : "tr-even"; }}
        ref="emailsTable"
      >
        <TableHeaderColumn dataField='subject' isKey={ true } tdStyle={{verticalAlign: 'middle'}} headerAlign='left' dataAlign='lef'>Subject</TableHeaderColumn>
        <TableHeaderColumn dataFormat={this.urlFormatter} dataField='url' tdStyle={{verticalAlign: 'middle'}} headerAlign='left' dataAlign='lef'>Url</TableHeaderColumn>
        <TableHeaderColumn dataFormat={this.renderEditButton} tdStyle={{verticalAlign: 'middle'}} headerAlign='left' dataAlign='lef' width='60' />
        <TableHeaderColumn dataFormat={this.renderRemoveButton} tdStyle={{verticalAlign: 'middle'}} headerAlign='left' dataAlign='lef' width='60' />
      </BootstrapTable>
    );
  }
}

export default EmailsTable;
