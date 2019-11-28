import React, { Fragment } from 'react';
import { invoiceStatuses } from 'meteor/populous:constants';
import { Col, Row } from 'reactstrap';

import { H2, Small } from '../../../components/styled-components/Typography';
import BidItem from './BidItem';

const BidList = (props) => {
  const { currentUser, invoice, bidUsers, crowdsale } = props;

  return (
    <Fragment>
      <Row>
        <Col xs="12" className="text-center m-t-40">
          <H2>Bids</H2>
        </Col>
      </Row>
      <Row className="m-t-20">
        <Col xs="12" xl={{size: 10, offset: 1}}>
          { invoice.bids.map((bid, index) =>
              <BidItem currentUser={currentUser} bid={bid} key={index} invoice={invoice} bidUsers={bidUsers} crowdsale={crowdsale} />
            )
          }
        </Col>
      </Row>
    </Fragment>
  );
};

export default BidList;
