import React, {Fragment} from 'react';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Col, Pagination, PaginationItem, PaginationLink,} from 'reactstrap';

import { LinkButton } from '../../../components/styled-components/Buttons';
import TableSearch from './TableSearch';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {typeToLabel} from "./constants";


class ActivityLogTable extends React.Component {
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

  renderShowsTotal(start, to, total) {
    return (
      <p>
        Showing { start } to { to } of { total } entries
      </p>
    );
  }

  renderViewLink = (cell, row,) => {
    return (
      <LinkButton md className="p-0 m-0" onClick={() => this.props.toggleModal(row)}>View</LinkButton>
    );
  }

  render() {
    const { logs, activity, keyword, dates, onActivityChange, onKeywordChange, onDatesChange, } = this.props;
    const options = {
      paginationShowsTotal: this.renderShowsTotal,
      paginationPanel: this.renderPaginationPanel,
      sizePerPageList: [ 5, 15, 30 ],
      sizePerPage: 15
    };

    return (
      <Fragment>
      <TableSearch
        activity={activity}
        onActivityChange={onActivityChange}
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        dates={dates}
        onDatesChange={onDatesChange}
      />
      <BootstrapTable data={ logs } options={ options }
                      bordered={ false } pagination
                      containerStyle={{marginBottom: '20px'}}
                      bodyStyle={{ border: '#e1e5eb 2px solid', borderTopWidth: '0px' }}
                      trClassName={(row, rowIndex)=>{ return rowIndex % 2 === 0 ? "tr-odd" : "tr-even"; }}>

        <TableHeaderColumn dataField='_id' tdStyle={{verticalAlign: 'middle'}}
                           headerAlign='left' dataAlign='left' hidden={true} isKey={true}>
          ID
        </TableHeaderColumn>

        <TableHeaderColumn dataField='createdAt' tdStyle={{verticalAlign: 'middle'}}
                           dataFormat={(col) => moment(col).format('MM-DD-YYYY, hh:mm a')}
                           headerAlign='left' dataAlign='left'>
          Date, Time
        </TableHeaderColumn>

        <TableHeaderColumn dataField='type' tdStyle={{verticalAlign: 'middle'}}
                           dataFormat={(col) => typeToLabel[col] }
                           headerAlign='left' dataAlign='left'>
          Activity
        </TableHeaderColumn>

        <TableHeaderColumn dataFormat={ this.renderViewLink } headerAlign='center'
                           dataAlign='center' width='70'>
          &nbsp;
        </TableHeaderColumn>
      </BootstrapTable>
      </Fragment>
    );
  }
};

export default ActivityLogTable;
