import React, {Fragment} from 'react';
import {Row, Col, FormGroup} from 'reactstrap';
import {populousEvents} from 'meteor/populous:constants';
import {toastr} from 'react-redux-toastr';

import {Small, P} from '../../../../components/styled-components/Typography/index';
import {typeToLabel} from "../constants";
import {CopyToClipboard} from "react-copy-to-clipboard";


const PokenWithdraw = ({ledger, withdrawAmount, fee, toBank, address, bankId, feeCurrency }) => {
  return (
    <Fragment>
      <div className={'m-b-10'}>
        <Small>Activity</Small>
        <P className="m-t-5 m-b-0">{typeToLabel[populousEvents.pokenWithdraw]}</P>
      </div>

      <Row className={'m-b-10'}>
        <Col xs="12" lg="6">
          <Small>Amount</Small>
          <P className="m-t-5 m-b-0">{`${withdrawAmount} PPT`}</P>
        </Col>
        <Col xs="6" lg="6">
          <Small>Fee Amount</Small>
          <P className="m-t-5 m-b-0">{`${fee} ${(toBank ? feeCurrency : 'PPT')}`}</P>
        </Col>
      </Row>

      {address && <Row>
        <Col xs="12" lg="6">
          <Small>Destination</Small>
          <P className="m-t-5 m-b-0">
            <a href="#" style={{wordWrap: 'break-word', width: '90%', display: 'inline', lineHeight: '32px'}}>
              {address.address}
            </a>
            <CopyToClipboard
              text={address.address}
              onCopy={() => toastr.success('successfully copied to clipboard')}
            >
              <img src="/images/icons/clipboard.png" width="19" height="23"
                   style={{marginLeft: '7px', cursor: 'pointer'}}/>
            </CopyToClipboard>
          </P>
        </Col>
      </Row>}
    </Fragment>
  )
};

export default PokenWithdraw;
