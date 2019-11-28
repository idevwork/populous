import React, {Fragment, Component} from 'react';
import { ledgerActionsTypes } from 'meteor/populous:constants';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components'

import { Mute } from '../../../../components/styled-components/Typography/index';
import { StyledInput} from '../../../../components/styled-components/Inputs';
import DateRangePickerWrapper from "../../../../components/DatePicker/DateRangePickerWrapper";
import {UnderLineDiv} from "../../../../components/styled-components/Divs";


class HistoryFilters extends Component{

  updatePeriod = (period) => {
    const {updateFilters} = this.props;
    if ((!period.startDate && !period.endDate) || period.startDate || period.endDate) {
      updateFilters(period);
    }
  };

  updateTransactionType = (type) => {
    const {updateFilters} = this.props;
    updateFilters({
      transactionType: type !== 'all' ? type : null
    });
  };

  updateSearch = (search) => {
    const {updateFilters} = this.props;
    updateFilters({search});
  };

  render(){

    const {className} = this.props;

    return (
      <Row className={className}>
        <Col md={5} className={'filterBlock'}>
          <Mute className="m-r-15 m-t-15 filterTitle">Period</Mute>
          <UnderLineDiv style={{display:'inline-block', width: '240px', paddingLeft:'5px'}}>
            <DateRangePickerWrapper
              inner={{noBorder: true, isOutsideRange: ()=>false,}}
              onChange={(dates) => this.updatePeriod(dates)}
            />
          </UnderLineDiv>
        </Col>
        <Col md={4} className={'filterBlock'}>
          <Mute className="m-r-15 m-t-15 filterTitle">
            Transactions
          </Mute>
          <UnderLineDiv style={{display:'inline-block', width: '160px', paddingLeft:'5px'}}>
            <StyledInput
              type="select"
              style={{width: '150px', border: 'none'}}
              onChange={(e)=>{this.updateTransactionType(e.target.value)}}
            >
              <option value={'all'} >{'All'}</option>
              <option value={ledgerActionsTypes.deposit} >{'Deposit'}</option>
              <option value={ledgerActionsTypes.withdraw} >{'Withdraw'}</option>
              <option value={ledgerActionsTypes.exchange} >{'Exchange'}</option>
              <option value={ledgerActionsTypes.crowdsale} >{'Invoice repayment'}</option>
            </StyledInput>
          </UnderLineDiv>
        </Col>
        <Col md={3} className={'filterBlock'}>
          <UnderLineDiv style={{display:'inline-block', width: '160px'}}>
            <StyledInput defaultValue={''}
                         placeholder='Search...'
                         style={{display:'inline-block', width: '160px', border: 'none'}}
                         onChange={(e) => {this.updateSearch(e.target.value)}}
            />
          </UnderLineDiv>
        </Col>
      </Row>
    )
  }
}

export default styled(HistoryFilters)`
  .filterBlock{
    display: flex;
    justify-content: flex-end;
    
    .filterTitle{
      font-size: 16px;
    }
  }
  .DateInput_input__focused, .DateInput_input {
    border: none;
  }
  .DateRangePickerInput_arrow {
    margin-right: 20px;
  }
`;