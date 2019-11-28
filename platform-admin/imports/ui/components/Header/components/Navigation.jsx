import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarToggler,
} from 'reactstrap';

import Auth from '../../../services/Auth';
import Logo from './Logo';
import UsersIcon from '../../Icons/Users';
import InvoicesIcon from '../../Icons/Invoices';
import CurrenciesIcon from '../../Icons/Currencies';
import TransactionsIcon from '../../Icons/Transactions';
import RequestsIcon from '../../Icons/Requests';

const NavigationComponent =
  ({
     isOpen = false,
     pathname = false,
     currentUser = null,
     slideMenuHandler
   }) => {
    const isActive = to => to === pathname;

    return (
      <div style={{ backgroundColor: currentUser ? '#2b3f5c' : '' }}>
        <Navbar className="header icon-header" color="faded" dark expand="lg">
          <Logo />
          { currentUser &&
            <div className="navbar-collapse">
              <Nav className="ml-auto" navbar>
                { currentUser ?
                  <Fragment>
                    <NavItem className={isActive('/users') ? 'current-page' : ''}>
                      <Link className="nav-link icon-link" to="/users">
                        <UsersIcon color={isActive('/users') ? '#3c74bb' : 'white'}/>
                        <span>Users</span></Link>
                    </NavItem>
                    <NavItem className={isActive('/invoices') ? 'current-page' : ''}>
                      <Link className="nav-link icon-link" to="/invoices">
                        <InvoicesIcon color={isActive('/invoices') ? '#3c74bb' : 'white'}/>
                        <span>Invoices</span></Link>
                    </NavItem>
                    <NavItem className={isActive('/currencies') ? 'current-page' : ''}>
                      <Link className="nav-link icon-link" to="/currencies">
                        <CurrenciesIcon color={isActive('/currencies') ? '#3c74bb' : 'white'}/>
                        <span>Currencies</span></Link>
                    </NavItem>
                    <NavItem className={isActive('/transactions-list') ? 'current-page' : ''}>
                      <Link className="nav-link icon-link" to="/transactions-list">
                        <TransactionsIcon color={isActive('/transactions-list') ? '#3c74bb' : 'white'}/>
                        <span>Transactions</span></Link>
                    </NavItem>
                    <NavItem className={isActive('/requests-list') ? 'current-page' : ''}>
                      <Link className="nav-link icon-link" to="/requests-list">
                        <RequestsIcon color={isActive('/requests-list') ? '#3c74bb' : 'white'}/>
                        <span>Requests</span></Link>
                    </NavItem>
                    <NavItem>
                      <NavLink className="icon-link hamburger-link"
                               href="#sidemenu"
                               onClick={e => {
                                 e.preventDefault();
                                 slideMenuHandler();
                               }}
                      >
                        <button type="button" className="hamburger-button">
                          <span></span>
                          <span></span>
                          <span></span>
                        </button>
                      </NavLink>
                    </NavItem>
                  </Fragment>
                  :
                  <Fragment>
                  </Fragment>
                }
              </Nav>
            </div>
          }
        </Navbar>
      </div>
    );
  };

const Navigation = styled(NavigationComponent)`
  background-color: transparent;
`;

export default Navigation;
