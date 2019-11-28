import React from 'react';
import { Input, FormGroup, FormFeedback } from 'reactstrap';
import { countries } from 'meteor/populous:constants';

import { LABEL } from '../components/styled-components/Typography';

export const renderSelectReactstrap = ({
  options,
  id,
  name,
  input,
  label,
  placeholder,
  className,
  meta: { touched, error },
  required,
  onChange
}) => {
  return(
    <FormGroup>
      <LABEL>{label}</LABEL>
      <Input
        placeholder={placeholder}
        id={id}
        name={name}
        className={className}
        type="select"
        style={{marginTop: '-5px'}}
        {...input}

        required={required}
      >
        <option disabled value="">Select...</option>
        {Object.keys(options).map(c =>
          <option key={c} value={c}>
            {options[c]}
          </option>
        )}
      </Input>
      { touched && error && <FormFeedback style={{display: 'block'}}>{error}</FormFeedback> }
    </FormGroup>);
};

export const renderCountrySelector = ({ input, meta: { touched, error } }) =>
  <FormGroup>
    <label>Country</label>
    <Input {...input} type="select">
      <option disabled value="">Select a country...</option>
      {countries.map(country =>
        <option value={country.key} key={country.key}>
          {country.name}
        </option>
      )}
    </Input>
    {touched && error && <span className="error"> {error} </span>}
  </FormGroup>;
