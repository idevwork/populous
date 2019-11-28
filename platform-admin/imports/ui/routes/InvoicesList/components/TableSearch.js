import React from 'react';
import Select from 'react-select';
import moment from 'moment';
import {Form, FormGroup, Label} from 'reactstrap';

import {invoiceStatuses} from 'meteor/populous:constants';
import {humanize} from '../../../utils/formatter';
import {StyledInput} from '../../../components/styled-components/Inputs';
import {buildURI} from '../../../components/ExportCSV/ExportCSV';

const invoiceDue = {
  today: 'Today',
  week: 'Week',
  month: 'Month',
};

delete invoiceStatuses.awaitingContract;

class TableSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      due: props.filters.due,
      status: props.filters.status,
      keyword: props.filters.keyword
    };
  }

  handleFieldChange(field, selectedOption) {
    this.setState({[field]: selectedOption});

    if (field === 'status') {
      this.props.onStatusChange(selectedOption);
    } else {
      this.props.onDueChange(selectedOption);
    }
  }

  handleKeywordChange(event) {
    const data = event.nativeEvent.target.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    this.props.onKeywordChange(data);
  }


  getCsv = () => {
    const {invoices} = this.props;
    const csvHeaders = ["invoice ID", "invoice No", "invoice amount", "advanced amount", "overdue", "created", "due date", "status",
      "company name", "company number", "debtor name", "debtor number", "company phone number", "company country"];

    const csvData = [];

    invoices.forEach((invoice) => {
      csvData.push([
        invoice._id, invoice.invoiceNumber, invoice.amount, invoice.salePrice,
        moment().utc().isAfter(invoice.dueDate) ? 'Yes' : 'No', moment(invoice.createdAt).format('DD-MM-YYYY, hh:mm a'),
        moment(invoice.dueDate).format('DD-MM-YYYY, hh:mm a'), invoice.status,
        invoice.borrowerCompanyName, invoice.companyNumber, invoice.debtorName, invoice.debtorNumber,
        invoice.companyPhoneNumber, invoice.companyCountry
      ]);
    });

    return {csvHeaders, csvData};
  };

  render() {
    const {csvHeaders, csvData} = this.getCsv();
    const optionsStatuses = [
      {value: 'all', label: 'All'},
      ...Object.keys(invoiceStatuses).map((status) => ({value: status, label: humanize(status, true)}))
    ];
    const optionsDue = [
      {value: 'all', label: 'All'},
      ...Object.keys(invoiceDue).map((status) => ({value: status, label: humanize(status, true)}))
    ];

    return (
      <Form inline>
        <FormGroup>
          <Label for="invoices-status">Status</Label>
          <Select
            className="custom-selectbox m-r-15 m-l-5"
            style={{width: '200px'}}
            simpleValue
            value={this.state.status}
            searchable={false}
            onChange={this.handleFieldChange.bind(this, 'status')}
            options={optionsStatuses}
            arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg"/> }
          />

          <Label for="invoices-status">Due</Label>
          <Select
            className="custom-selectbox m-r-15 m-l-5"
            style={{width: '200px'}}
            simpleValue
            value={this.state.due}
            searchable={false}
            onChange={this.handleFieldChange.bind(this, 'due')}
            options={optionsDue}
            arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg"/> }
          />

          <StyledInput defaultValue={ this.props.defaultValue }
                       placeholder='Search...'
                       onChange={(event) => this.handleKeywordChange(event) }/>

          <div className="m-l-10">
            <a href={buildURI(csvData, true, csvHeaders, ";")} download={'invoices.csv'}>
              <img src="/images/icons/ico-s-export-blue.svg"/>
            </a>
          </div>
        </FormGroup>
      </Form>
    );
  }
}

export default TableSearch;
