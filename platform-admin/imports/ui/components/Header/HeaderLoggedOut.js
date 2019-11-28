import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

import Logo from './components/Logo';

export default class HeaderLoggedOut extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const {page} = this.props;
    return (
      <div style={{ backgroundColor: '#2b3f5c' }}>
        <Navbar dark expand className="login-header">
          <Logo />
        </Navbar>
      </div>
    );
  }
}
