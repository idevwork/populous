import React from 'react';
import PropTypes from 'prop-types';
import { countries } from 'meteor/populous:constants';
import classNames from 'classnames';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';

import { StyledInput } from '../components/styled-components/Inputs';
import { LABEL } from '../components/styled-components/Typography';
import ShowHideIcon from '../components/Icons/ShowHide'

export const renderField = ({ input, label, type, style, meta: { touched, error } }) => (
  <div>
    { label && <label>{label}</label> }
    <div>
      {
        type == 'textarea' ?
        (
          <textarea {...input} style={style} />
        )
        :
        (
          <input {...input} type={type} style={style} />
        )
      }
      { touched && error && <span>{error}</span> }
    </div>
  </div>
);

export const renderInputReactstrap = props => {
  const { input, label, placeholder, errorHint, passwordSuccess, togglePasswordType, showHide, type, meta: { touched, error, submitFailed, dirty } = {}, style, required } = props;

  // https://www.npmjs.com/package/classnames
  const classes = classNames({
    success: touched && !error,
    danger: touched && error
  });

  return (
    <FormGroup color={classes}  className={showHide && 'login-password-field'}>
      <LABEL>{label}</LABEL>
      <StyledInput {...input} type={type} placeholder={placeholder} state={classes} style={style} required={required} />
      { touched && error && <FormFeedback>{error}
        {errorHint && error === 'Too weak' &&
          <span className="question-mark">
            <img src="/images/icons/ico-question.svg" height="20"/>
            <p className="tooltip-error">Password must be at least 8 characters long and have at least one capital letter, one digit, and one special character</p>
          </span>
        }
      </FormFeedback> }
      {!(touched && error) && passwordSuccess && dirty && submitFailed && <p style={{color: '#7ac996', marginTop: '0.25rem'}}>{passwordSuccess}</p>}

      { showHide && input.value.length > 0 &&
        <span className="password-show" onClick={togglePasswordType}>
          <ShowHideIcon color={type === 'password' ? '#A5ACB5' : '#636466'}/>
        </span>
      }
    </FormGroup>
  );
};

renderInputReactstrap.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any
  })
};

export const renderCountrySelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option>Select a country...</option>
      {
        countries.map(country => (
            <option value={country.key} key={country.key}>
              {country.name}
            </option>
          )
        )
      }
    </select>
    { touched && error && <span> {error} </span> }
  </div>
);
