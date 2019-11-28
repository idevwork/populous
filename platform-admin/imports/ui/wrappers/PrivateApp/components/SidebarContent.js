import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import MaterialTitlePanel from './MaterialTitlePanel';
import { SidebarBody } from '../../../components/styled-components/Divs';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
    scroll: 'no',
    overflow: 'hidden'
  },
  sidebarLink: {
    display: 'block',
    padding: '5px 0px',
    color: 'white',
    textDecoration: 'none',
    outline: 'none'
  }
};

class SidebarContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = this.props.style ? {...styles.sidebar, ...this.props.style} : styles.sidebar;
    const { dispatch, logout, isOpen } = this.props;

    const currentUser = this.props.currentUser || false;
    const avatar = (currentUser) ? currentUser.avatar() : null;
    const {firstName = '', lastName = ''} = currentUser;

    return (
      <MaterialTitlePanel title="" isOpen={isOpen} style={style} onSetOpen={(open)=>{
        this.props.onSetOpen(open);
      }} >
        <SidebarBody className="custom-sidebar">
          <div className="links-content">
            <div className="links">
              <div onClick={()=>{this.props.onSetOpen(false);}}>
                <Link to="/settings" style={styles.sidebarLink}><span>PLATFORM SETTINGS</span></Link>
              </div>
              <div onClick={()=>{this.props.onSetOpen(false);}}>
                <Link to="/" style={styles.sidebarLink}><span>PRIVACY POLICY</span></Link>
              </div>
              <div onClick={()=>{this.props.onSetOpen(false);}}>
                <Link to="/" style={styles.sidebarLink}><span>{"TERMS & CONDITIONS"}</span></Link>
              </div>
            </div>
          </div>
          <div className="outer-links">
            <div className="avatar-content" onClick={()=>{}} >
              <div className="avatar-body">
                <div className="avatar">
                  { avatar
                    ? <img src={avatar.link()} height={30} />
                    : <img src="/images/icons/menu-user.png" height={30} />
                  }
                </div>
                <div style={{display: 'table-cell', textAlign: 'left', verticalAlign: 'middle'}}>
                  <span>{firstName + "\n" + lastName}</span>
                </div>
              </div>
            </div>
            <div className="space"></div>
            <div className="logout" onClick={()=>{
              Meteor.logout(err => {
                if (err) {
                  toastr.error('Error logging out', err.reason);
                } else {
                  logout();
                }
              });
            }} >
              <img src="/images/icons/logout.png" height={30} />
            </div>
          </div>
        </SidebarBody>
      </MaterialTitlePanel>
    );
  }
}

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default connect()(SidebarContent);
