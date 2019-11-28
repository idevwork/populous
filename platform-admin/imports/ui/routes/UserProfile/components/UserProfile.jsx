import React, {Fragment} from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { userRoles } from 'meteor/populous:constants';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { NavLink as NavLINK } from 'react-router-dom';

import { H1, P, Small } from '../../../components/styled-components/Typography';
import {
  USER_PROFILE_TAB_GENERAL,
  USER_PROFILE_TAB_PROFILE,
  USER_PROFILE_TAB_BANK,
  USER_PROFILE_TAB_ACTIVITY,
  USER_PROFILE_TAB_INVOICES,
  USER_PROFILE_TAB_WALLET,
  EXTERNAL_WALLET,
  USER_PROFILE_TAB_PROVIDER,
  USER_PROFILE_TAB_BANK_PAGES
} from '../modules';

import { CustomTab } from '../../../components/styled-components/Tab';
import GeneralSettings from '../containers/GeneralSettingsContainer';
import CustomerProfile from '../containers/CustomerProfileContainer';
import BankAccount from '../containers/BankAccountContainer';
import ActivityLog from '../ActivityLog/ActivityLogContainer';
import UserInvoices from '../containers/InvoicesContainer';
import ExternalWallets from '../containers/ExternalWallets';
import Loading from "../../../components/Loading";
import ProviderPane from "./ProviderPane";
import WalletPane from "../containers/UserWalletContainer";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match: { params: { userId } } } = this.props;
    this.props.reset(userId);
  }

  render() {
    const { loading, activeTab, setActiveTab, user, className } = this.props;

    if(loading) {
      return <Loading />;
    }

    if(!user) {
      return (
        <Container className={className}>
          <Row className="m-b-30 m-t-30">
            <Col>
              <H1>
                <NavLINK to="/users" className="m-r-10">
                  <img src="/images/icons/ico-arrow-back.svg" />
                </NavLINK>
                User #{this.props.userId}
              </H1>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <P className="m-b-30">This user doesn't exist anymore.</P>
              <img src="/images/img-no-result.png" width={160} alt="No User" />
            </Col>
          </Row>
        </Container>
      );
    }

    const isBorrower = user.isBorrower();
    const isInvestor = user.isInvestor();
    const isProvider = user.isProvider();

    return (
      <Container className={className}>
        <Row className="m-b-30 m-t-30">
          <Col>
            <H1>
              <NavLINK to="/users" className="m-r-10">
                <img src="/images/icons/ico-arrow-back.svg" />
              </NavLINK>
              User #{user._id}
            </H1>
          </Col>
        </Row>
        <CustomTab className="m-t-50 user-fixed-height">
          <Row>
            <Col xs="12" md="5" lg="4" xl="3">
              <Nav vertical pills className="flex-column h-100 list-group">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === USER_PROFILE_TAB_GENERAL })}
                    onClick={() => { setActiveTab(USER_PROFILE_TAB_GENERAL); }}
                  >
                    General
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === USER_PROFILE_TAB_PROFILE })}
                    onClick={() => { setActiveTab(USER_PROFILE_TAB_PROFILE); }}
                  >
                    Populous Customer Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === USER_PROFILE_TAB_BANK })}
                    onClick={() => { setActiveTab(USER_PROFILE_TAB_BANK); }}
                  >
                    Bank Accounts
                  </NavLink>
                </NavItem>
                { (isBorrower || isProvider) && <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === USER_PROFILE_TAB_INVOICES })}
                    onClick={() => { setActiveTab(USER_PROFILE_TAB_INVOICES); }}
                  >
                    Invoices
                  </NavLink>
                </NavItem>}
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === USER_PROFILE_TAB_ACTIVITY })}
                    onClick={() => { setActiveTab(USER_PROFILE_TAB_ACTIVITY); }}
                  >
                    Activity Log
                  </NavLink>
                </NavItem>
                {isInvestor &&
                <Fragment>
                  <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === EXTERNAL_WALLET })}
                    onClick={() => { setActiveTab(EXTERNAL_WALLET); }}
                  >
                    Wallet Addresses
                  </NavLink>
                </NavItem>
                  <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === USER_PROFILE_TAB_PROVIDER })}
                    onClick={() => { setActiveTab(USER_PROFILE_TAB_PROVIDER); }}
                  >
                    provider
                  </NavLink>
                </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === USER_PROFILE_TAB_WALLET })}
                      onClick={() => { setActiveTab(USER_PROFILE_TAB_WALLET); }}
                    >
                      Wallet
                    </NavLink>
                  </NavItem>
                </Fragment>}
              </Nav>
            </Col>
            <Col xs="12" md="7" lg="8" xl="9">
              <TabContent className="p-20" activeTab={activeTab}>
                <TabPane tabId={USER_PROFILE_TAB_GENERAL}>
                  <GeneralSettings />
                </TabPane>
                <TabPane tabId={USER_PROFILE_TAB_PROFILE}>
                  <CustomerProfile />
                </TabPane>
                <TabPane tabId={USER_PROFILE_TAB_BANK}>
                  <BankAccount />
                </TabPane>
                <TabPane tabId={USER_PROFILE_TAB_ACTIVITY}>
                  <ActivityLog />
                </TabPane>
                {isInvestor &&
                <Fragment>
                  <TabPane tabId={EXTERNAL_WALLET}>
                  <ExternalWallets />
                </TabPane>
                  <TabPane tabId={USER_PROFILE_TAB_PROVIDER}>
                  <ProviderPane user={user} />
                </TabPane>
                  <TabPane tabId={USER_PROFILE_TAB_WALLET}>
                    <WalletPane />
                  </TabPane>
                </Fragment>}
                {(isBorrower || isProvider) && <TabPane tabId={USER_PROFILE_TAB_INVOICES}>
                  <UserInvoices />
                </TabPane>}
              </TabContent>
            </Col>
          </Row>
        </CustomTab>
      </Container>
    );
  }
};

export default styled(UserProfile)`
  & h1{
    text-transform: none;
  }
`;
