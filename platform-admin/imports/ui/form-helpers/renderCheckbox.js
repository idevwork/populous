import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

/**
 * Can also be used for default form fields,
 * but this works for a checkbox nicely,
 * given that it doesn't require styling (yet)
 */
const renderCheckbox = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <FormGroup check>
    <Label check>
      <Input {...input} type={type} />{' '}
      {label}
    </Label>
    {touched &&
        ((error && <span className="error">{error}</span>) ||
          (warning && <span className="error">{warning}</span>))}
  </FormGroup>;
export default renderCheckbox;


export const CustomCheckbox = ({label, name, input={},className, ...props}) => {

  const nameValue = input.name || name;

  return (
    <FormGroup className={className}>
    <Input type="checkbox" id={nameValue} addon {...input} {...props}/>
    <Label  htmlFor={nameValue}>
      <div className="custom-checkbox"/>
      {label}
    </Label>
  </FormGroup>
  );
};
