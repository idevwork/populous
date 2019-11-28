import React, {Fragment} from 'react';
import { Row, Col, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment';
import { MainText, SubText, HistoryCardWrapper } from "../../../../components/styled-components/Users/InvoiceCard";
import { scientificToDecimal } from '../../../../utils/formatter';
import floor from "../../../../../helpers/formatters/floor";

const HistoryCard = ({history}) => {

  let imgPath, title, sign;

  if(history) {
    switch (history.type) {
      case 'transfer':
        imgPath = '/images/icons/ico-transfer-history.png';
        title = 'Transferred';
        sign = '';
        break;
      case 'repayment':
        imgPath = '/images/icons/ico-transfer-history.png';
        title = 'Repayment';
        sign = '';
        break;
      case 'mint':
        imgPath = '/images/icons/ico-mint-history.png';
        title = 'Minted';
        sign = '+';
        break;
      case 'destroy':
        imgPath = '/images/icons/ico-destroy-history.png';
        title = 'Destroyed';
        sign = '-';
        break;
      default:
        return null;
    }
  }

  const toDecimal = (value) => {
    let decimal = floor(value);

    if (value > 0 && parseFloat(decimal) === 0) {
      decimal = scientificToDecimal(value.toPrecision(2));
    }

    return decimal;
  };

  return (
    <HistoryCardWrapper>
      <Row>
        <Col xs={6}>
          <div className="img">
            <img src={imgPath} width="50"/>
          </div>
          <div className="info">
            <p className="m-b-5">{title}</p>
            <SubText>{moment(history.createdAt).format('DD-MM-YYYY, hh:mm:ss a')}</SubText>
          </div>
        </Col>

        <Col xs={3} className="text-right align-items-center justify-content-center d-md-flex">
          <MainText>{sign} {toDecimal(history.toValue)} {history.toCurrency}</MainText>
        </Col>

        <Col xs={3} className="justify-content-end align-items-center d-none d-md-flex">
          <MainText>{floor(history.fromValue)} {history.fromCurrency}</MainText>
        </Col>

        {
          history &&
          <Col xs={12} style={{paddingLeft: '85px', paddingTop:'8px'}}>
            <SubText>ID {history._id}</SubText>
            { history.type === 'transfer' &&
              <Fragment>
                &emsp;<SubText>{history.fromUserId}</SubText>
                &emsp;<img src="/images/icons/ico-arrow-right.png" width="20"/>
                &emsp;<SubText>{history.toUser()?history.toUser().emailAddress():null}</SubText>
              </Fragment>
            }
            { history.type === 'repayment' &&
              <Fragment>
                &emsp;<img src="/images/icons/ico-arrow-right.png" width="20"/>
                &emsp;<SubText>{history.toUser()?history.toUser().emailAddress():null}</SubText>
              </Fragment>
            }
          </Col>
        }
      </Row>
    </HistoryCardWrapper>
  );
};

export default HistoryCard;
