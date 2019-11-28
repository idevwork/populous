import React from 'react';
import { Row, Col } from 'reactstrap';

import { H2, Small, P } from '../../../../components/styled-components/Typography';
import { LinkedCard } from '../../../../components/styled-components/LinkedCard';
import HistoryFilterForm from './HistoryFilterForm';
import HistoryCard from './HistoryCard';
import HistoryPagination from './HistoryPagination';

class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPage: 5,
      entries: 0,
    };
  }

  getNextPage = ()=> {
    this.setState({
      page: this.state.page + 1
    });
  }

  getPrevPage = ()=> {
    if(this.state.page>=1){
      this.setState({
        page: this.state.page - 1
      });
    }
  }

  getFirstPage = ()=> {
    this.setState({
      page: 1
    });
  }

  getLastPage = ()=> {
    this.setState({
      page: Math.ceil(this.props.history.length / this.state.perPage)
    });
  }

  render() {

    const to = this.state.perPage*this.state.page;
    const from = to-this.state.perPage;
    const histories = this.props.history.slice(from, to);
    const currenciesOptions = {};

    this.props.currencies.forEach((currency) => {
      if (currency.isActive()) {
        currenciesOptions[currency.symbol] = currency.title;
      }
    });

    const historyList = histories.map((item, index) => {
      if (item.fromCurrency && currenciesOptions[item.fromCurrency]) {
        item.fromCurrency = currenciesOptions[item.fromCurrency];
      }
      if (item.toCurrency && currenciesOptions[item.toCurrency]) {
        item.toCurrency = currenciesOptions[item.toCurrency];
      }
      return (
        <HistoryCard history={item} key={index} />
      );
    });

    return (
      <Row className="m-t-40">
        <Col xs={12}>
          <H2>HISTORY</H2>
        </Col>

        <Col xs={12}>
          <HistoryFilterForm
            currencies={this.props.currencies}
            onCurrencyChange={this.props.actions.ChangeHistoryCurrency}
            onDateChange={this.props.actions.ChangeDatePeriod}
            onSearch={this.props.actions.ChangeSearchQuery}
            historyAmount={histories.length}
          />
        </Col>

        <Col xs={12} className="m-t-10">
          {
            histories.length > 0 && 
            <div>
              <Row className="d-none d-sm-flex m-0" style={{borderBottom: "solid 2px #e1e5eb"}}>
                <Col xs={4}>
                  <Small className="m-b-5">Description</Small>
                </Col>
                <Col xs={4} className="text-right">
                  <Small className="m-b-5">Amount</Small>
                </Col>
                <Col xs={4} className="justify-content-end d-none d-md-flex">
                  <Small className="m-b-5">System balance</Small>
                </Col>
              </Row>
              <Row>
                <Col>
                  {historyList}
                </Col>
              </Row>

              <HistoryPagination
                total={this.props.history.length}
                totalPages={Math.ceil(this.props.history.length / this.state.perPage)}
                page={this.state.page}
                getNext={this.getNextPage}
                getPrev={this.getPrevPage}
                getFirst={this.getFirstPage}
                getLast={this.getLastPage}
                loaded={histories.length}
                from={from+1}
                to={from+histories.length}
                hasNextPage={this.props.history[to]}
              />
            </div>
          }
          {
            histories.length==0 &&
            <div className="text-center">
              <P>No History to display</P>
              <img src="/images/no-transactions.png" height={80} alt="No transactions" />
            </div>
          }
        </Col>
      </Row>
    );
  }
}

export default HistoryTable;
