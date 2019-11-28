import React from 'react';
import PropTypes from 'prop-types';

import Datetime from '../../react-datetime/DateTime';
import { StyledInput } from "../../styled-components/Inputs";


const DateTime = ({initialDate, onChangeDueDate, className, isOpen=false}) => {
  const today = Datetime.moment();

  const onChange = (value) => {
    if (onChangeDueDate) {
      onChangeDueDate(value)
    }
  };

  function renderInput({className, ...props}, openCalendar, closeCalendar) {
    return <StyledInput className="with-arrow" {...props} disabled />
  }

  function addDayClasses(currentDate) {

    if(typeof initialDate==='string'){
      initialDate = Datetime.moment(initialDate);
    }

    if (initialDate && currentDate.isSame(initialDate, 'day')) {
      return ' start-date';
    }

    return '';
  }

  function renderDay(props, currentDate) {
    props.className += addDayClasses(currentDate);

    return (<td {...props}>{currentDate.date()}</td>);
  }

  return (
          <Datetime
            value={initialDate}
            onChange={(date) => onChange(date)}
            renderDay={renderDay}
            dateFormat={'DD-MM-YYYY'}
            timeFormat={false}
            isValidDate={(date) => {
              return date.diff(today, 'days') >= 0;
            }}
            renderInput={renderInput}
            open={isOpen}
            className={className}
          />
  );
};

DateTime.propTypes = {
  onChange: PropTypes.func,
};

export default DateTime;