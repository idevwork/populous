import React from 'react';
import Select from 'react-select';
import {Row, Col, FormGroup} from 'reactstrap';
import {H3, Small, P, LABEL} from '../../../components/styled-components/Typography';
import {countries} from 'meteor/populous:constants';
import InnerLoading from '../../../components/InnerLoading';

const initialSate = {
  showNumber: false,
  showSortCode: false,
};


class BankAccount extends React.Component {
  state = {...initialSate};

  toggleHiddenNumber = (type) => {
    this.setState({[type]: !this.state[type]});
  };

  render() {
    const {loading, bankAccounts, changeBank, selectedBankId, selectedBank} = this.props;
    const {showNumber, showSortCode} = this.state;

    if (loading) {
      return <InnerLoading />;
    }

    const hideNumber = (number) => {
      let times = number.length - 4;
      if (times < 0) times = 0;
      return '*'.repeat(times) + number.slice(-4);
    };

    return (
      <div className="position-relative">
        <H3>Bank Accounts</H3>
        <Row>
          <Col sm="12">
            { !bankAccounts || !bankAccounts.length
              ?
              <P className="m-t-20">There is no bank account.</P>
              :
              <div className="d-flex flex-column m-t-20">
                <Row>
                  <Col md="5">
                    <FormGroup>
                      <LABEL>Bank Accounts</LABEL>
                      <Select
                        className="custom-selectbox d-block"
                        simpleValue
                        value={selectedBankId}
                        searchable={false}
                        onChange={changeBank}
                        options={
                          bankAccounts.map((bank) => {
                            return {value: bank._id, label: bank.name}
                          })
                        }
                        arrowRenderer={
                          () => <img src="/images/icons/ico-arrow-down.svg"/>
                        }
                      />
                    </FormGroup>
                  </Col>
                  { selectedBank &&
                  <Col md="7">
                    <FormGroup>
                      <Small>Bank name</Small>
                      <P>{selectedBank.name}</P>
                    </FormGroup>
                    <FormGroup>
                      <Small>Country</Small>
                      <P>{selectedBank.country && countries.find(c => c.key === selectedBank.country).name}</P>
                    </FormGroup>
                    <Row>
                      <Col xs="4">
                        <FormGroup>
                          <Small>Currency</Small>
                          <P>{selectedBank.currency}</P>
                        </FormGroup>
                      </Col>
                      <Col xs="4">
                        <FormGroup>
                          <Small>Account Number</Small>
                          <P>
                            { showNumber ? selectedBank.number : hideNumber(selectedBank.number) }
                            <img src="/images/icons/ico-show.svg" className="m-l-10"
                                 style={{cursor: 'pointer'}}
                                 onClick={() => this.toggleHiddenNumber('showNumber')} />
                          </P>
                        </FormGroup>
                      </Col>
                      <Col xs="4">
                        <FormGroup>
                          <Small>Sort code</Small>
                          <P>
                            { showSortCode ? selectedBank.sortCode : hideNumber(selectedBank.sortCode) }
                            <img src="/images/icons/ico-show.svg" className="m-l-10"
                                 style={{cursor: 'pointer'}}
                                 onClick={() => this.toggleHiddenNumber('showSortCode')} />
                          </P>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <P><img src="/images/icons/ico-check.svg"/> Approved</P>
                    </FormGroup>
                  </Col>
                  }
                </Row>
              </div>
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default BankAccount;
