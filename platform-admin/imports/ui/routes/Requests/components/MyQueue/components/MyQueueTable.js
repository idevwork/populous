import React from 'react';
import moment from 'moment';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router-dom';

import {LinkButton} from '../../../../../components/styled-components/Buttons';
import MyQueueTableSearch from '../../tablesComponents/TableSearch';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class MyQueueTable extends React.Component {

  createCustomToolBar = (props) => {
    return (
      <div className='row col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-end'>
        {props.components.searchPanel}
      </div>
    );
  }

  renderViewLink(cell, row, enumObject, index) {
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
        onClick={() => this.props.toggle(requests[index])}
      >
        View
      </LinkButton>
    );
  }

  render() {
    const {requests} = this.props;
    // Sort so the new requests are at the top
    const _requests = requests.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    });

    const options = {
      searchField: (props) => (
        <MyQueueTableSearch
          type={this.props.type} onTypeChange={this.props.onTypeChange}
          keyword={this.props.keyword} onKeywordChange={this.props.onKeywordChange}
        />
      ),
      toolBar: this.createCustomToolBar,
    };

    return (
      <BootstrapTable data={_requests} options={options} bordered={false} search searchPlaceholder="Search..."
                      containerStyle={{marginBottom: '20px'}}
                      bodyStyle={{border: '#e1e5eb 2px solid', borderTopWidth: '0px'}} trClassName={(row, rowIndex) => {
        return rowIndex % 2 === 0 ? "tr-odd" : "tr-even";
      }}>
        <TableHeaderColumn dataField='_id' isKey={true} tdStyle={{verticalAlign: 'middle'}}
                           dataFormat={(value) => `${value.substring(0, 3)}...`}
                           headerAlign='left' dataAlign='lef'>
          ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField='description' tdStyle={{verticalAlign: 'middle'}} headerAlign='left'
                           dataAlign='left'>
          Description
        </TableHeaderColumn>
        <TableHeaderColumn dataField='createdAt'
                           dataFormat={(value) => moment(value).format('DD-MM-YYYY, hh:mm a')}
                           tdStyle={{verticalAlign: 'middle'}} headerAlign='center'
                           dataAlign='center'>
          Created
        </TableHeaderColumn>
        <TableHeaderColumn dataFormat={this.renderViewLink.bind(this)} headerAlign='center' dataAlign='center'
                           width='90'>
          &nbsp;
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
};

export default MyQueueTable;
