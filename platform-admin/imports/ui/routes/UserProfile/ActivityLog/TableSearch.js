import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import {Col, Label, Row} from 'reactstrap';

import {StyledInput} from '../../../components/styled-components/Inputs';
import {typeToLabel} from "./constants";
import DateRangePickerWrapper from "../../../components/DatePicker/DateRangePickerWrapper";

const activityOptions = [
  {value: '', label: 'All'},
  ...(
    Object.keys(typeToLabel).map(
      (activityType) => ({
        value: activityType,
        label: typeToLabel[activityType]
      })
    )
  ),
];

class TableSearch extends React.Component {
  handleKeywordChange(event) {
    const data = event.nativeEvent.target.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    this.props.onKeywordChange(data);
  }

  render() {
const {className, activity, onActivityChange, keyword, dates = {}, onDatesChange,} = this.props;

    return (
      <Row noGutters className={className}>
        <Col lg={6} xs={12}
             className={'d-flex align-items-center range-picker'}>
            <Label>Period</Label>

            <DateRangePickerWrapper
              onChange={onDatesChange}
              {...dates}
              inner={{
            isOutsideRange: () =>false,
          }}/>
        </Col>
        <Col lg={4} xs={7}>
          <div className={'d-flex align-items-center activity-select'}>
            <Label>Activity</Label>
            <Select
              className="custom-selectbox priority-item"
              simpleValue
              value={activity}
              searchable={false}
              onChange={onActivityChange}
              options={activityOptions}
              arrowRenderer={() => <img src="/images/icons/ico-arrow-down.svg"/>}
            />
          </div>
        </Col>
        <Col lg={2} xs={5}>
          <StyledInput valuealue={keyword}
                       placeholder='Search...'
                       onChange={(event) => this.handleKeywordChange(event)} className="transaction-search-key"/>
        </Col>
      </Row>
    );
  }
}

export default styled(TableSearch)`
  .range-picker, .activity-select{
    padding-right: 15px;
      
    label{
      margin: 0;
      margin-right: 10px;
    }
  } 
  
  //TODO: move to 'var(--breakpoint-lg)' in future
  
  @media (max-width: 992px){
    .range-picker{
    
      margin-bottom: 10px;
      padding-right: 0;
    }
  }
`;
