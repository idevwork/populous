import React, {Fragment} from 'react';
import {Row, Col} from 'reactstrap';

import {H3, LABEL} from '../../../../components/styled-components/Typography/index';
import BlockchainFormSettings from './BlockchainFormSettings';
import BlockchainFormSignerKey from './BlockchainFormSignerKey';
import BlockchainFormCheckBalance from './BlockchainFormCheckBalance';
import BlockchainFormCheckActionStatus from './BlockchainFormCheckActionStatus';
import InvoiceFeeForm from './InvoiceFeeForm';
import PPTExchangeFeeForm from './PPTExchangeFeeForm';

class Blockchain extends React.Component {

  componentDidMount() {
    this.props.formActions.getBlockchainConfig();
  }

  render() {
    const {form, formActions} = this.props;
    const {
      value: blockchain = {
        gasPrice: 0,
        gasLimit: 0,
        securitySignerKey: '',
      }
    } = form.currentBlockchain || {};

    const gweiPrice = blockchain.gasPrice / Math.pow(10, 9);
    const securitySignerKey = blockchain.securitySignerKey;

    return (
      <Fragment>
        <Row>
          <Col>
            <H3>Invoice Fees</H3>
          </Col>
        </Row>
        <InvoiceFeeForm {...formActions} initialValuesReduxForm={({pptInterestFee: blockchain.pptInterestFee})}/>
        <Row>
          <Col>
            <H3>PPT Exchange</H3>
          </Col>
        </Row>
        <PPTExchangeFeeForm {...formActions} initialValuesReduxForm={({pptExchange: blockchain.pptExchange})}/>
        <Row>
          <Col>
            <H3>Blockchain</H3>
          </Col>
        </Row>
        <Row className="border-row m-0 m-t-50 m-b-20 p-0">
          <Col>
            <LABEL>
              Gas price
            </LABEL>
            <div>{gweiPrice} Gwei</div>
          </Col>
          <Col>
            <LABEL>
              Gas limit
            </LABEL>
            <div>{blockchain.gasLimit}</div>
          </Col>
        </Row>
        <BlockchainFormSettings {...form} {...formActions} />
        <Row className="border-row m-0 m-t-50 m-b-20 p-0">
          <Col>
            <LABEL>
              SHA-256 SECURITY SIGNER KEY
            </LABEL>
            { securitySignerKey !== ''
                ? <div>{securitySignerKey}</div>
                : <div>&nbsp;</div>
            }
          </Col>
        </Row>
        <BlockchainFormSignerKey {...form} {...formActions} securitySignerKey={blockchain.securitySignerKey} />
        <hr className="m-t-30" />
        <Row className="m-t-40 m-b-10">
          <Col>
            <H3>Blockchain Contracts</H3>
          </Col>
        </Row>
        <BlockchainFormCheckBalance
          {...form} {...formActions}
        />

        <BlockchainFormCheckActionStatus
          {...form} {...formActions}
        />
      </Fragment>
    );
  };
}


export default Blockchain;
