import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import moment from 'moment';
import Sidebar from 'react-sidebar';
import { userRoles } from 'meteor/populous:constants';

import SidebarContent from './SidebarContent';
import Dashboard from '../../../routes/Dashboard';
import Invoices from '../../../routes/InvoicesList';
import Invoice from '../../../routes/Invoice';
import ContractTemplate from '../../../routes/ContractTemplate';
import Users from '../../../routes/Users';
import Currencies from '../../../routes/Currencies';
import UserProfile from '../../../routes/UserProfile';
import TransactionsList from '../../../routes/Transactions';
import AddEmailTemplate from '../../../routes/AddEmailTemplate';
import EmailTemplate from '../../../routes/EmailTemplate';
import SendEmail from '../../../routes/SendEmail';
import Settings from '../../../routes/Settings';
import Requests from '../../../routes/Requests';
import ResetTwoFAKey from '../../../routes/ResetTwoFAKey';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import ConfirmModal from '../../../components/ConfirmModal';
import { Page, Content } from '../../../components/styled-components/Divs';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import { P } from '../../../components/styled-components/Typography';

const styles = {
  content: {
    zIndex: 0
  },
  overlay: {
    zIndex: 3
  },
  sidebar: {
    zIndex: 4
  }
};

class PrivateApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idleOpen: false,
      interval: 60,
      intervalId: null,
      timeout: 1000 * 60 * 10,
      open: false
    };

    this.toggleIdleModal = this.toggleIdleModal.bind(this);
    this.onIdle = this.onIdle.bind(this);
    this.onActive = this.onActive.bind(this);
    this.timer = this.timer.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.slideMenuHandler = this.slideMenuHandler.bind(this);
  }

  timer() {
    if (this.state.interval > 0) {
      this.setState({ interval: this.state.interval-1 });
    } else {
      this.setState({interval: 60});
      clearInterval(this.state.intervalId);
      this.setState({idleOpen: false});
      this.props.logout();
   }
  }

  onIdle() {
    if (!this.state.idleOpen) {
      this.setState({idleOpen: true});
      const intervalId = setInterval(this.timer, 1000);
      this.setState({intervalId: intervalId});
    }
  }

  onActive() {

  }

  toggleIdleModal() {
    this.setState({idleOpen: !this.state.idleOpen});
    this.setState({interval: 60});
    clearInterval(this.state.intervalId);
  }

  onSetOpen(open) {
    this.setState({open: open});
  }

  slideMenuHandler() {
    this.setState(
      {open: !this.state.open}
    );
  }

  componentDidMount() {
    const expireDate = moment(Meteor._localStorage.getItem('Meteor.loginTokenExpires')).utc();
    const currentDate = moment().add(91, 'days').utc();
    if(expireDate > currentDate) {//Disable Idle Timer with Keep me signed in
      this.refs.idleTimer.pause();
    }
  }

  render() {
    const { currentUser, logout } = this.props;

    const sidebar = <SidebarContent isOpen={this.state.open} onSetOpen={this.onSetOpen} currentUser={currentUser} logout={logout} />;

    const sidebarProps = {
      sidebar: sidebar,
      docked: false,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: true,
      shadow: true,
      pullRight: true,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
      transitions: true,
      onSetOpen: this.onSetOpen,
    };

    return (
      <IdleTimer
        ref="idleTimer"
        element={document}
        activeAction={this.onActive}
        idleAction={this.onIdle}
        timeout={this.state.timeout}
        format="MM-DD-YYYY HH:MM:ss.SSS">
        <Sidebar {...sidebarProps} styles={styles}>
          <Page className="app">
            <Header onToggle={this.onSetOpen} slideMenuHandler={this.slideMenuHandler} />
            <Content>
              <div className="p-t-20 p-b-20">
                <Switch>
                  {/*<Route exact path="/" component={Dashboard} />*/}
                  <Route exact path="/invoices" component={Invoices} />
                  <Route exact path="/contractTemplate" component={ContractTemplate} />
                  <Route exact path="/invoices/:invoiceId" component={Invoice} />
                  <Route exact path="/users" component={Users} />
                  <Route exact path="/currencies" component={Currencies} />
                  <Route exact path="/users/:userId" component={UserProfile} />
                  <Route exact path="/transactions-list" component={TransactionsList} />
                  <Route exact path="/add-email-template" component={AddEmailTemplate} />
                  <Route exact path="/send-email" component={SendEmail} />
                  <Route exact path="/email-templates" component={EmailTemplate} />
                  <Route exact path="/settings" component={Settings} />
                  <Route exact path="/requests-list" component={Requests} />
                  <Route exact path="/settings/reset-2-fa" component={ResetTwoFAKey}/>

                  <Route exact path="/" render={() => (<Redirect to="/users"/>)}/>
                  <Redirect from="*" to="/users" />
                </Switch>
              </div>
            </Content>
            <Footer />
            <ConfirmModal />
          </Page>
        </Sidebar>
        <Modal isOpen={this.state.idleOpen} toggle={this.toggleIdleModal} className="custom">
          <ModalHeader toggle={this.toggleIdleModal}>Confirm you are here</ModalHeader>
          <ModalBody>
            <P>We have noticed that you are idle for a while. If you are away, <b>your session will end in {this.state.interval} seconds.</b></P>
            <P>Are you still here?</P>
            <div className="d-flex justify-content-center align-content-center">
              <PrimaryButton onClick={()=>this.toggleIdleModal()}>Yes, I am here</PrimaryButton>
            </div>
          </ModalBody>
        </Modal>
      </IdleTimer>
    );
  }
}

export default PrivateApp;
