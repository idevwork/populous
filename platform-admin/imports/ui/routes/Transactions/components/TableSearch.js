import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { Form, FormGroup, Label } from 'reactstrap';

import { StyledInput } from '../../../components/styled-components/Inputs';

class TableSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      keyword: props.keyword
    };
  }

  handleStatusChange(selectedOption) {
    this.setState({status: selectedOption});
    this.props.onStatusChange(selectedOption);
  }

  handleTypeChange(selectedOption) {
    this.setState({type: selectedOption});
    this.props.onTypeChange(selectedOption);
  }

  handleKeywordChange(event) {
    const data = event.nativeEvent.target.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    this.props.onKeywordChange(data);
  }

  render() {
    const statusOptions = [
      { value: 'all', label: 'All'}
    ];
    const typeOptions = [
      { value: 'all', label: 'All'}
    ];

    return (
      <Form inline>
        <FormGroup>
          <Label>Type</Label>
          <Select
            className="custom-selectbox m-r-15"
            style={{ width: '200px' }}
            simpleValue
            value = {this.state.type}
            searchable={false}
            onChange={(option) => this.handleTypeChange(option)}
            options={typeOptions}
            arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg" /> }
          />
          <div className="transaction-status-search">
            <Label>Status</Label>
            <Select
              className="custom-selectbox m-r-15"
              style={{ width: '200px' }}
              simpleValue
              value = {this.state.status}
              searchable={false}
              onChange={(option) => this.handleStatusChange(option)}
              options={statusOptions}
              arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg" /> }
            />
          </div>
          <StyledInput defaultValue={ this.props.defaultValue }
                      placeholder='Search...'
                      onChange={(event) => this.handleKeywordChange(event) } className="transaction-search-key" />
        </FormGroup>
      </Form>
    );
  }
}

export default TableSearch;
