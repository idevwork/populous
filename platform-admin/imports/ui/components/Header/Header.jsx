import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Navigation from './components/Navigation';

const initalState = {
  isOpen: false,
};

class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...initalState,
    };
  }

  render() {

    const {pathname, className, currentUser} = this.props;

    return (
      <header className={className}>
        <Navigation isOpen={this.state.isOpen}
                    pathname={pathname}
                    slideMenuHandler={this.props.slideMenuHandler}
                    currentUser={currentUser}
          />
        { this.props.children &&
          <div className="title">
            {this.props.children}
          </div>
        }
      </header>
    );
  }

}

const Header = styled(HeaderComponent)`
  background: ${props =>
    (props.backgroundImg ? (`url(${props.backgroundImg}) right top no-repeat,` ): '') + '#29405e'
  };

  .title{
    padding: 20px 30px 20px;
  }

  @media (max-width: 992px){
    background-position: top 52px center;

    .title{
      padding-top: 200px;
    }
  }
`;

const mapStateToProps = ({router, app: {currentUser}}) => ({
  pathname: router.location.pathname,
  currentUser,
});

export default connect(mapStateToProps)(Header);
