import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Link } from 'react-router-dom';
import { Navbar } from 'reactstrap';

import CustomButton from '../PublicCustomButton';

class PublicHeader extends React.Component {
  render () {
    const { login, signup, getQuote } = this.props

    return (
      <StyledNavbar expand="md">
        <div className="desktop-header-container">
          <div className="nav-controls d-flex align-items-center">
            <Link to="/" className="brand">
              <img className="logo" src="/img/Group 828.png" />
            </Link>
            <div className="links-wrapper">
              <div className="drop-wrapper">
                <div>Our Service</div>

                <div className="custom-popover">
                  <div className="popover-wrapper">

                    <div className="finance-group first-group">
                      <div className="description-group">
                        <div className="title">Invoice finance</div>
                        <div className="description">
                          Invoice Finance is a compatible match for businesses that endure long payment terms with customers.
                        </div>
                      </div>
                      <Link to="/services/invoice-finance">FIND OUT MORE</Link>
                    </div>

                    <div className="finance-group">
                      <div className="description-group">
                        <div className="title">Invoice discounting</div>
                        <div className="description">
                          Our Invoice Discounting mechanism can be a big help when businesses are dealing with the lengthy payment
                        </div>
                      </div>
                      <Link to="/services/invoice-discounting">FIND OUT MORE</Link>
                    </div>

                    <div className="finance-group">
                      <div className="description-group">
                        <div className="title">Invoice factoring</div>
                        <div className="description">
                          Invoice Factoring is an efficient and flexible way to release regular amounts of working capital.
                        </div>
                      </div>
                      <Link to="/services/invoice-factoring">FIND OUT MORE</Link>
                    </div>

                    <div className="triangle"></div>
                  </div>
                </div>
                
              </div>
              <Link to="/services/knowledge-base">Knowledge Base</Link>
              <a href="/#about-us">About Us</a>
              <a href="#contact-us">Contact Us</a>
              <Link to="/services/invest">Invest</Link>
            </div>
          </div>
  
          <div className="login-controls">
            <CustomButton onClick={login} size="md">Log in</CustomButton>
            <CustomButton className="active" onClick={signup} size="md">Sign up</CustomButton>
            <CustomButton onClick={getQuote} size="md">Get A Quote</CustomButton>
          </div>
        </div>

        <div className="mobile-header-container">
          <img src="/img/mobile/menu-icon.svg" width="6" height="24" />
          <img src="/img/mobile/mobile-logo.png" />
          <img src="/img/mobile/login-icon.svg" width="24" height="24"  />
        </div>
      </StyledNavbar>
    )
  }
}

const StyledNavbar = styled(Navbar)`
  background-color: #2b3f5c;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  z-index: 3;
  font-size: 14px;
  padding: 0 !important;

  ${breakpoint('xs')`
    .desktop-header-container {
      display: none;
    }

    .mobile-header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 10px 20px;
    }
  `}

  ${breakpoint('md')`
    .mobile-header-container {
      display: none;
    }
    .desktop-header-container {
      width: 100%;
      padding: 0px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .nav-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        flex-basis: 700px;

        .brand {
          padding: 0;
          .logo {
            height: 80px;
          }
        }

        .links-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-basis: 500px;
          height: 100px;

          .drop-wrapper {
            color: white;
            padding-left: 10px;
            padding-right: 10px;
            height: 100%;
            display: flex;
            align-items: center;

            .custom-popover {
              display: none;
            }

            &:hover {
              border-bottom: solid 5px #589DF9;
              position: relative;

              .custom-popover {
                display: block;
                padding-top: 40px;
                position: absolute;
                z-index: 3;
                top: 100px;
                left: -100px;
              }
              
              .popover-wrapper {
                display: flex;
                padding: 35px 40px;
                background: white;
                color: #364154;

                .finance-group {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;

                  .description-group {
                    width: 250px;
                    padding: 0 20px;
                    border-left: solid 1px #589DF9;
                    margin-bottom: 35px;

                    .title {
                      font-size: 18px;
                      white-space: nowrap;
                      color: #589DF9;
                      margin-bottom: 5px;
                    }

                    .description {
                      font-size: 12px;
                    }
                  }

                  a {
                    padding: 0 20px;
                    color: #589DF9;
                  }

                  &.first-group {
                    .description-group {
                      width: 220px;
                      margin-right: 20px;
                      border-left: none;
                      padding: 0;
                    }

                    a {
                      padding: 0;
                    }
                  }
                }

                .triangle {
                  position: absolute;
                  z-index: 2;
                  width: 30px;
                  height: 30px;
                  top: 30px;
                  left: 125px;
                  background: white;
                  transform: rotate(45deg);
                }
              }
            }
          }

          button.dropdown-toggle {
            background-color: transparent;
            border: none;
            color: white;
            &:focus {
              box-shadow: none;
            }
          }

          a {
            color: white;
            text-decoration: none;

            &:hover {
              color: white;
              text-decoration: none;
            }
          }
        }
      }

      .login-controls {
        display: flex;
        flex: 1;
        flex-basis: 40%;
        justify-content: flex-end;
        align-items: center;

        button {
          color: white;
          background-color: transparent;
          border: none;
          font-size: 14px;

          &.active {
            border-radius: 30px;
            margin: 0 10px;
            background-color: #5ca0f6;
            border-color: #5ca0f6;
            font-weight: bold;
          }
        }
      }
    }  
  `}
`

export default PublicHeader
