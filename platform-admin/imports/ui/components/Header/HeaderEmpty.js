import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
  Container,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Navbar,
  NavItem,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import {
  SET_CURRENT_USER,
  APP_LOADING,
} from '../../wrappers/PrivateApp/modules';
import Logo from './components/Logo';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { user, dispatch } = this.props;

    return (
      <div style={{ backgroundColor: '#2b3f5c' }}>
        <Navbar className="header" color="faded" dark expand="lg">
          <Logo />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="icon-link"
                  href="#logout"
                  onClick={e => {
                    e.preventDefault();
                    Meteor.logout(err => {
                      if (err) {
                        toastr.error('Error logging out', err.reason);
                      } else {
                        dispatch(push('/login'));
                        dispatch({ type: SET_CURRENT_USER, user: null });
                        dispatch({ type: APP_LOADING, loading: true });
                      }
                    });
                  }}
                >
                  <img src="/images/icons/logout.png" height={20} /><span>Logout</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default connect()(Header);
