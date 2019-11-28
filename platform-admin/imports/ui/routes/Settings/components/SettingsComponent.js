import React from 'react';
import classnames from 'classnames';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import { H1 } from '../../../components/styled-components/Typography';
import {
  SETTINGS_MAINTENANCE,
  SETTINGS_WALLET,
  SETTINGS_BLOCKCHAIN,
  SETTINGS_TERMS_AND_CONDITIONS,
  SETTINGS_EMAIL_VALIDATOR_TOOL,
  SETTINGS_INVOICE_SEARCH_TOOL,
  SETTINGS_BANK_PAGES
} from "../modules";
import Maintenance from '../containers/MaintenanceContainer';
import Blockchain from '../containers/BlockchainContainer';
import TermsAndConditions from '../containers/TermsAndConditionsContainer';
import EmailValidator from '../containers/EmailValidatorContainer';
import InvoiceSearchTool from '../containers/InvoiceSearchToolContainer';
import { CustomTab } from "../../../components/styled-components/Tab";
import ExternalWallets from '../../UserProfile/containers/ExternalWallets';
import BankPages from '../containers/BankPagesContainer';

const SettingsComponent  = ({activeTab, setActiveTab}) => {
  return (
    <Container>
      <Row className="m-b-30 m-t-30">
        <Col>
          <H1>
            Platform settings
          </H1>
        </Col>
      </Row>
      <CustomTab className="m-t-50">
        <Row>
          <Col xs="12" md="5" lg="4" xl="3">
            <Nav vertical pills className="flex-column h-100 list-group">
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === SETTINGS_MAINTENANCE })}
                  onClick={() => {
                    setActiveTab(SETTINGS_MAINTENANCE);
                  }}
                >
                  Maintenance time
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === SETTINGS_WALLET })}
                  onClick={() => {
                    setActiveTab(SETTINGS_WALLET);
                  }}
                >
                  Wallet Addresses
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === SETTINGS_BLOCKCHAIN })}
                  onClick={() => {
                    setActiveTab(SETTINGS_BLOCKCHAIN);
                  }}
                >
                  Blockchain
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === SETTINGS_TERMS_AND_CONDITIONS })}
                  onClick={() => {
                    setActiveTab(SETTINGS_TERMS_AND_CONDITIONS);
                  }}
                >
                  Terms and Conditions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === SETTINGS_EMAIL_VALIDATOR_TOOL })}
                  onClick={() => {
                    setActiveTab(SETTINGS_EMAIL_VALIDATOR_TOOL);
                  }}
                >
                  Email validator tool
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === SETTINGS_INVOICE_SEARCH_TOOL })}
                  onClick={() => {
                    setActiveTab(SETTINGS_INVOICE_SEARCH_TOOL);
                  }}
                >
                  Invoice search tool
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === SETTINGS_BANK_PAGES })}
                  onClick={() => {
                    setActiveTab(SETTINGS_BANK_PAGES);
                  }}
                >
                  Bank Pages
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col xs="12" md="7" lg="8" xl="9">
            <TabContent className="p-20" activeTab={activeTab}>
              <TabPane tabId={SETTINGS_MAINTENANCE}>
               <Maintenance/>
              </TabPane>
              <TabPane tabId={SETTINGS_WALLET}>
               <ExternalWallets isAdmin={true} />
              </TabPane>
              <TabPane tabId={SETTINGS_BLOCKCHAIN}>
               <Blockchain/>
              </TabPane>
              <TabPane tabId={SETTINGS_TERMS_AND_CONDITIONS}>
                <TermsAndConditions/>
              </TabPane>
              <TabPane tabId={SETTINGS_EMAIL_VALIDATOR_TOOL}>
                <EmailValidator/>
              </TabPane>
              <TabPane tabId={SETTINGS_INVOICE_SEARCH_TOOL}>
                <InvoiceSearchTool/>
              </TabPane>
              <TabPane tabId={SETTINGS_BANK_PAGES}>
                <BankPages/>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </CustomTab>
    </Container>
  );
};

export default SettingsComponent;
