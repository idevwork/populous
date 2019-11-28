import React from 'react';
import { Row, Col } from 'reactstrap';
import { StyledInput} from '../../../../components/styled-components/Inputs';
import { Small } from '../../../../components/styled-components/Typography';
import DateRangePickerWrapper from "../../../../components/DatePicker/DateRangePickerWrapper";
import {UnderLineDiv} from "../../../../components/styled-components/Divs";
import { HistoryChangeFilter } from '../../modules/actions';

class HistoryFilterForm extends React.Component {
  getCurrenciesList() {
    const currencies = this.props.currencies;
    if (currencies) {
      return currencies.map((item, index) => {
        return (
          <option key={item.symbol} value={item.symbol}>{item.title}</option>
        );
      });
    } else {
      return '';
    }
  }

  dateChange(data) {
    let fromDate = null, toDate = null;
    if (data.date.startDate)
      fromDate = data.date.startDate.toISOString();
    if (data.date.endDate)
      toDate = data.date.endDate.toISOString();
    this.props.onDateChange(fromDate, toDate);
  }

  searchHandler(event){
    const data = event.target.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    this.props.onSearch(data);
  }

  render() {
    const { historyAmount } = this.props;

    return (
      <Row>
        <Col md={'2'} xs={'12'} className="m-b-10">
          <Small style={{display:'inline', fontSize: '16px', color: '#a5acb5'}}>Token</Small>
          <StyledInput
            type="select"
            style={{display:'inline', width: '100px'}}
            onChange={this.props.onCurrencyChange}
          >
            <option value={''} >{'All'}</option>
            {this.getCurrenciesList()}
          </StyledInput>
        </Col>

        <Col md={'4'} xs={'12'} className="m-b-10">
          <Small style={{display:'inline', fontSize: '16px', color: '#a5acb5'}}>Period</Small>
          <UnderLineDiv style={{display:'inline-block', width: '240px', paddingLeft:'5px'}}>
            <DateRangePickerWrapper
              inner={{noBorder: true, isOutsideRange: ()=>false, openDirection: historyAmount>=0&&historyAmount<=3?'up':'down'}}
              onChange={data => this.dateChange({date: data})}
            />
          </UnderLineDiv>
        </Col>

        <Col md={'4'} xs={'12'} className="m-b-10 offset-md-2">
          <StyledInput
            style={{color: '#C0C5CC', fontSize: '16px'}}
            placeholder="Search..."
            onChange={this.searchHandler.bind(this)} />
        </Col>
      </Row>
    );
  }
}

export default HistoryFilterForm;
