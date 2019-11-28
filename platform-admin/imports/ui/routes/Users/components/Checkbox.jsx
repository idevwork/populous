import React from 'react';

const Checkbox = ({rowIndex, checked, onChange, indeterminate}) => {  
  return (
    <input className='react-bs-select-all'
      type='checkbox'
      name={ 'checkbox' + rowIndex }
      id={ 'checkbox' + rowIndex }
      checked={ checked }
      onChange={ onChange }
      ref={ input => {
        if (input) {
          input.indeterminate = indeterminate;
        }
      } } 
    />
  );
}

export default Checkbox;
