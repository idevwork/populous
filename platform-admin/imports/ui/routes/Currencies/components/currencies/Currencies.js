import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { userRoles } from 'meteor/populous:constants';

import { H1, H3, P, Small, LinkText } from '../../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import OperationWithToken from './OperationWithToken';
import CurrenciesList from './CurrenciesList';
import HistoryTable from '../history/HistoryTable';

const currencies = ({
  currentUser,
  currencies,
  history,
  ChangeHistoryCurrency,
  ChangeDatePeriod,
  ChangeSearchQuery,
  lastRates,
  enableCurrency,
  deleteCurrency
}) => {

  const currenciesOptions = {};

  currencies.forEach((currency) => {
    if (currency.isActive()) {
      currenciesOptions[currency.symbol] = currency.title;
    }
  });

  return (
    <Fragment>
      <Container>
        <Row className="m-b-30 m-t-30">
          <Col xs={12}>
            <H1>
              CURRENCIES
            </H1>
          </Col>
        </Row>
      </Container>

      <div className="gradient-bg p-b-40">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <H3 className="m-t-20">
                SYSTEM BALANCE
              </H3>
              <div className="p-l-10 p-r-10">
                <CurrenciesList currencies={currencies} enableCurrency={enableCurrency} />
              </div>
            </Col>

            <Col xs={12} md={6}>
              <OperationWithToken currencies={{...currenciesOptions}} deleteCurrency={deleteCurrency} />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row>
          <Col xs={12}>
            <HistoryTable
              currencies={currencies}
              history={history}
              actions={{ChangeHistoryCurrency,ChangeDatePeriod,ChangeSearchQuery}}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default currencies;
