import React, {Fragment} from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

import {requestTypes, typeToLabel} from './constants';
import { StyledInput } from '../../../../components/styled-components/Inputs';


const optionsType = Object
  .values(requestTypes)
  .map( (typeValue) => (
    {
      value: typeValue,
      label: typeToLabel[typeValue],
    }
  ));

const optionsStatus = [
  {
    value:'all',
    label:'All'
  },
  {
    value:'Being processed',
    label:'Being processed'
  },
  {
    value:'Opened',
    label:'Opened'
  },
  {
    value:'Completed',
    label:'Completed'
  },
];

class TableSearch extends React.Component {

  handleKeywordChange = ({target:{value}}) => {
    this.props.onKeywordChange(value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"));
  };

  render() {
    const {keyword, type, status, onTypeChange, onStatusChange, } = this.props;

    return (
      <Form inline>
        <FormGroup>
          <Label>Type</Label>
          <Select
            className="custom-selectbox m-r-15"
            style={{ width: '150px' }}
            simpleValue
            value = {type}
            searchable={false}
            clearable={false}
            onChange={onTypeChange}
            options={optionsType}
            arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg" /> }
          />

          {this.props.onStatusChange &&
          <Fragment>
            <Label>Status</Label>
            <Select
              className="custom-selectbox m-r-15"
              style={{width: '150px'}}
              simpleValue
              value={status}
              searchable={false}
              clearable={false}
              onChange={onStatusChange}
              options={optionsStatus}
              arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg"/> }
            />
          </Fragment>
          }

          <StyledInput defaultValue={ keyword }
                      placeholder='Search...'
                      onBlur={this.handleKeywordChange} />
        </FormGroup>
      </Form>
    );
  }
}

export default TableSearch;
