import React from 'react';
import Select from 'react-select';
import {statuses, userRoles, industryKeys} from 'meteor/populous:constants';
import {Form, FormGroup, Label} from 'reactstrap';

import {StyledInput} from '../../../components/styled-components/Inputs';


class MySearchField extends React.Component {

  handleKeywordChange = (event) => {
    const data = event.nativeEvent.target.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    this.props.onKeywordChange(data);
  };

  getIndustrySelectOptions = () => {
    let industryOptions = [{value: 'all', label: 'All'}];
    for (let key in industryKeys) {

      if (industryKeys[key] && industryKeys[key].sicCodes.length) {
        industryKeys[key].sicCodes.forEach(code => {
          industryOptions.push({
            value: code.code,
            label: code.description,
          });
        });
      }
    }

    return industryOptions;
  };

  render() {
    let statusOptions = [{value: 'all', label: 'All'}];
    for (let statusValue in statuses) {
      statusOptions.push({
        value: statusValue,
        label: statuses[statusValue]
      });
    }

    const roleOptions = [
      {value: 'all', label: 'All'},
      {value: userRoles.investor, label: 'Investor'},
      {value: userRoles.borrower, label: 'Borrower'},
      {value: userRoles.admin, label: 'Admin'},
      {value: 'provider', label: 'Provider'},
    ];
    const {onStatusChange, onRoleChange, status, role, onSicChange, sic} = this.props;

    return (
      <Form inline className="d-flex">
        <FormGroup>
          <Label for="kyc-status">Industry</Label>
          <Select
            className="custom-selectbox m-r-15"
            style={{ width: '240px' }}
            simpleValue
            value={sic}
            searchable={false}
            onChange={onSicChange}
            options={this.getIndustrySelectOptions()}
            arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg"/> }
          />
        </FormGroup>
        <FormGroup>
          <Label for="kyc-status">Role</Label>
          <Select
            className="custom-selectbox m-r-15"
            style={{ width: '120px' }}
            simpleValue
            value={role}
            searchable={false}
            onChange={onRoleChange}
            options={roleOptions}
            arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg"/> }
          />
        </FormGroup>
        <FormGroup>
          <Label for="kyc-status">KYC Status</Label>
          <Select
            className="custom-selectbox m-r-15"
            style={{width: '130px'}}
            simpleValue
            value={status}
            searchable={false}
            onChange={onStatusChange}
            options={statusOptions}
            arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg"/> }
          />

          <StyledInput placeholder='Search...' onChange={this.handleKeywordChange } />
        </FormGroup>
      </Form>
    );
  }
}

export default MySearchField;
