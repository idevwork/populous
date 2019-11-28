import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import Tab from '../../../../components/styled-components/Tab';
import { Small } from '../../../../components/styled-components/Typography';
import { LinkButton } from '../../../../components/styled-components/Buttons';

const styleList = {
  padding: '16px',
  borderTop: 'solid 2px #e1e5eb'
};

class CurrenciesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllCurrencies: false,
    };
  }

  toggleShowAllCurrencies = () => {
    this.setState({
      showAllCurrencies: !this.state.showAllCurrencies
    });
  };

  getTabContent(data, showAllCurrencies) {
    let currencyBalances = this.props.currenciesBalance;
    return data.map((item, index) => {
      const style = index ? styleList : {padding: '16px'};
      const balance = currencyBalances ? currencyBalances[item.symbol] : 0;
      const colorStyle = item.enabled ? 'green-color' : 'red-color';

      if (showAllCurrencies) {
        return (
          <Row key={index} style={style}>
            <Col xs={6}>
              <span className={`p-r-10 ${colorStyle}`}>&#9679;</span>
              {item.title}
            </Col>
            <Col xs={3} className="text-right">
              {(typeof balance === 'undefined') ? 'pending' : balance.toFixed(2)}
            </Col>
            <Col xs={3} className="text-right">
              <LinkButton className="p-0" onClick={() => this.props.enableCurrency(item)}>{item.enabled ? 'DISABLE' : 'ENABLE'}</LinkButton>
            </Col>
          </Row>
        );
      } else if (index < 4) {
        return (
          <Row key={index} style={style}>
            <Col xs={6}>
              <span className={`p-r-10 ${colorStyle}`}>&#9679;</span>
              {item.title}
            </Col>
            <Col xs={3} className="text-right">
              {(typeof balance === 'undefined') ? 'pending' : balance.toFixed(2)}
            </Col>
            <Col xs={3} className="text-right">
              <LinkButton className="p-0" onClick={() => this.props.enableCurrency(item)}>
                {item.enabled ? 'DISABLE' : 'ENABLE'}
              </LinkButton>
            </Col>
          </Row>
        );
      }
    });
  }

  render() {
    const showAllCurrencies = this.state.showAllCurrencies;
    return (
      <div className="card-body">

        <div className="p-t-20">
          <Row>
            <Col xs={6}>&nbsp;</Col>
            <Col xs={3}>
              <Small className="pull-right">AMOUNT</Small>
            </Col>
            <Col xs={3}>
              <Small className="pull-right">ACTIONS</Small>
            </Col>
          </Row>
        </div>

        <div className="p-t-20">
          {this.getTabContent(this.props.currencies, showAllCurrencies)}
          {this.props.currencies.length > 4  &&
          <img src="/images/icons/ico-more-hide.svg" className={"showMoreCurrencies" + (!showAllCurrencies && 'rotate')}
               onClick={this.toggleShowAllCurrencies}/>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesBalance: state.currenciesList.currenciesBalance
});

export default connect(mapStateToProps)(CurrenciesList);
