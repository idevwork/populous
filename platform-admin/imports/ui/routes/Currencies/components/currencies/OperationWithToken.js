import React, {Fragment} from 'react';
import {Row, Col, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import { H3 } from '../../../../components/styled-components/Typography';
import { MCard } from '../../../../components/styled-components/Divs';
import Tab from '../../../../components/styled-components/Tab';
import CreateCurrencyForm from './CreateCurrencyForm';
import TransferCurrencyForm from './TransferCurrencyForm';
import DestroyCurrencyForm from './DestroyCurrencyForm';
import MintCurrencyForm from './MintCurrencyForm';

class OperationWithToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      switch(tab) {
        case '1':
          this.props.dispatch(reset('createCurrencyForm'));
          break;
        case '2':
          this.props.dispatch(reset('mintCurrencyForm'));
          break;
        case '3':
          this.props.dispatch(reset('destroyCurrencyForm'));
          break;
        case '4':
          this.props.dispatch(reset('transferCurrencyForm'));
          break;
      }

      this.setState({
        activeTab: tab
      });
    }
  }

  getTabControls() {
    return (
      <Fragment>
        <Tab width="25%" size={'0.9rem'} className={classnames({active: this.state.activeTab === '1'})}
          style={{textTransform: 'none'}}
          onClick={() => {
            this.toggle('1');
          }}>
          Create
        </Tab>
        <Tab width="25%" size={'0.9rem'} className={classnames({active: this.state.activeTab === '2'})}
          style={{textTransform: 'none'}}
          disabled={true}
          onClick={() => {
            // this.toggle('2');
          }}>
          Mint
        </Tab>
        <Tab width="25%" size={'0.9rem'} className={classnames({active: this.state.activeTab === '3'})}
          style={{textTransform: 'none'}}
          onClick={() => {
            this.toggle('3');
          }}>
          Destroy
        </Tab>
        <Tab width="25%" size={'0.9rem'} className={classnames({active: this.state.activeTab === '4'})}
          style={{textTransform: 'none'}}
          onClick={() => {
            this.toggle('4');
          }}>
          Transfer
        </Tab>
      </Fragment>
    );
  }

  getTabContent() {
    return (
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <CreateCurrencyForm />
        </TabPane>

        <TabPane tabId="2">
          <MintCurrencyForm currencies={this.props.currencies} />
        </TabPane>

        <TabPane tabId="3">
          <DestroyCurrencyForm currencies={this.props.currencies} deleteCurrency={this.props.deleteCurrency}/>
        </TabPane>

        <TabPane tabId="4">
          <TransferCurrencyForm currencies={this.props.currencies}/>
        </TabPane>
      </TabContent>
    );
  }

  render() {
    return (
      <MCard style={{minHeight: '520px'}}>
        <Row className="card-body">
          <Col xs={12}>
            <H3 className="m-b-30">OPERATIONS WITH TOKENS</H3>
          </Col>

          <Col xs={12} className="text-center">
            {this.getTabControls()}
          </Col>

          <Col xs={12} className="p-t-20">
            {this.getTabContent()}
          </Col>
        </Row>
      </MCard>
    );
  }
}

export default connect()(OperationWithToken);
