import React from 'react';
import { Row, Col, Label, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import Datetime from '../../react-datetime/DateTime';

import { StyledInput } from "../../styled-components/Inputs";
import { LABEL } from "../../styled-components/Typography";


const DateTimeRange = ({ start: startDate, end: endDate, onChange: externalOnchange }) => {
  const today = Datetime.moment();

  function onChange(field, value) {
    if (externalOnchange) {
      externalOnchange({
        start: startDate,
        end: endDate,
        [field]: value,
      })
    }
  }

  function renderInput({className, ...props}, openCalendar, closeCalendar) {
    return <StyledInput className="with-arrow" {...props}/>
  }

  function addDayClasses(currentDate) {

    if(typeof startDate==='string'){
      startDate = Datetime.moment(startDate);
    }
    if(typeof endDate==='string'){
      endDate = Datetime.moment(startDate);
    }

    if (startDate && currentDate.isSame(startDate, 'day')) {
      return ' start-date';
    } else if (endDate && currentDate.isSame(endDate)) {
      return ' end-date';
    } else if (startDate && startDate.isBefore(currentDate)
      && endDate && endDate.isAfter(currentDate, 'day')) {
      return ' in-range-date';
    }

    return '';
  }

  function renderDay(props, currentDate, selectedDate) {
    props.className += addDayClasses(currentDate);

    return (<td {...props}>{currentDate.date()}</td>);
  }

  return (
    <Row>
      <Col xs="12" sm="6">
        <FormGroup>
          <LABEL>Start</LABEL>
          <Datetime
            value={startDate}
            onChange={(date) => onChange('start', date)}

            renderDay={renderDay}
            isValidDate={(date) => {
              return date.diff(today, 'days') >= 0;
            }}
            renderInput={renderInput}
          />
        </FormGroup>
      </Col>
      <Col xs="12" sm="6">
        <FormGroup>
          <LABEL>End</LABEL>
          <Datetime
            value={endDate}
            onChange={(date) => onChange('end', date)}
            renderDay={renderDay}
            isValidDate={(date) => {
              const isBeforeCurrent = date.diff(today, 'days') >= 0;

              if (!startDate) {
                return isBeforeCurrent;
              }


              return date.diff(startDate, 'days') >= 0 && isBeforeCurrent;
            }}
            renderInput={renderInput}
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

DateTimeRange.propTypes = {
  onChange: PropTypes.func,
};

export default DateTimeRange;