import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint'
import { Link } from 'react-router-dom';
import { Button, Input, FormGroup } from 'reactstrap';

const Footer = ({ login, signup }) => {
  const currentYear = new Date().getFullYear()
  return (
    <StyledFooter id="contact-us">
      <div className="desktop-footer">
        <div className="info">
          <div className="left-info">
            <img src="/img/Group 828.png" height="80" />
            <div>+44(0)843 849 6671</div>
            <div>info@populous.world</div>
            <div>© {currentYear} Populous Invoice Platform</div>
          </div>

          <div className="right-info">
            <div className="links-wrapper">
              <div className="support-and-pages">
                <div className="links">
                  <div className="subtitle">SUPPORT</div>
                  <ul>
                    <li><Link to="/services/asked-questions">FAQ</Link></li>
                    <li><Link to="/services/terms-and-conditions">Terms</Link></li>
                  </ul>
                </div>

                <div className="links">
                  <div className="subtitle">PAGES</div>
                  <ul>
                    <li><a href="https://blog.populous.world">News</a></li>
                    <li>Terms of Use</li>
                    <li><a onClick={login}>Login</a></li>
                    <li><a onClick={signup}>Register</a></li>
                  </ul>
                </div>
              </div>

              <div className="follow-wrapper">
                <div className="links follow-up">
                  <div className="subtitle">FOLLOW US</div>
                  <div className="social-icons-container">
                    <a
                      href="https://www.facebook.com/populousworld"
                      className="social-wrapper"
                    >
                      <img src="/img/facebook-logo (1).svg" />
                    </a>

                    <a
                      href="https://twitter.com/BitPopulous"
                      className="social-wrapper"
                    >
                      <img src="/img/twitter-logo-silhouette.svg" />
                    </a>

                    <a href="" className="social-wrapper">
                      <img src="/img/google-plus (1).svg" />
                    </a>

                    <a
                      href="https://www.youtube.com/channel/UCBI-O3zFjYYjJCBxJ77faqw"
                      className="social-wrapper"
                    >
                      <img src="/img/youtube (1).svg" />
                    </a>

                    <a
                      href="https://www.instagram.com/populousworld"
                      className="social-wrapper"
                    >
                      <img src="/img/instagram (1).svg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-wrapper">
              <div className="links">
                <div className="subtitle">CONTACT US</div>
                <div className="input-wrapper">
                  <FormGroup>
                    <Input type="name" placeholder="Name" />
                  </FormGroup>
                  <FormGroup>
                    <Input type="email" placeholder="Email address" />
                  </FormGroup>
                  <FormGroup>
                    <Input type="textarea" placeholder="Message" />
                  </FormGroup>
                  <FormGroup>
                    <Button>Send Message</Button>
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copywriter">
          {currentYear} Populous World Ltd. All Rights Reserved
        </div>
      </div>

      <div className="mobile-footer">
        <div className="links">
          <div className="subtitle">
            <div>CONTACT US</div>
          </div>
          <div className="input-wrapper">
            <FormGroup>
              <Input type="name" placeholder="Name" />
            </FormGroup>
            <FormGroup>
              <Input type="email" placeholder="Email address" />
            </FormGroup>
            <FormGroup>
              <Input type="textarea" placeholder="Message" />
            </FormGroup>
            <FormGroup>
              <Button>Send Message</Button>
            </FormGroup>
          </div>
        </div>

        <div className="links">
          <div className="subtitle">
            <div>SUPPORT</div>
          </div>
          <ul>
            <li><Link to="/services/asked-questions">FAQ</Link></li>
            <li><Link to="/services/terms-and-conditions">Terms</Link></li>
          </ul>
        </div>

        <div className="links">
          <div className="subtitle">
            <div>PAGES</div>
          </div>
          <ul>
            <li><a href="https://blog.populous.world">News</a></li>
            <li>Terms of Use</li>
            <li><a onClick={login}>Login</a></li>
            <li><a onClick={signup}>Register</a></li>
          </ul>
        </div>

        <div className="links">
          <div className="subtitle">
            <div>FOLLOW US</div>
          </div>
          <ul>
            <li><a href="https://www.facebook.com/populousworld">Facebook</a></li>
            <li><a href="https://twitter.com/BitPopulous">Twitter</a></li>
            <li><a href="">Google Plus</a></li>
            <li><a href="https://www.youtube.com/channel/UCBI-O3zFjYYjJCBxJ77faqw">Youtube</a></li>
            <li><a href="https://www.instagram.com/populousworld">Instagram</a></li>
          </ul>
        </div>

        <div className="contacts">
          <img src="/img/Group 828.png" height="80" />
          <div>+44(0)843 849 6671</div>
          <div>info@populous.world</div>
          <div>© {currentYear} Populous World LTD</div>
        </div>

        <div className="copywriter">
          {currentYear} © Copyright Populous World LTD
        </div>
      </div>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  background-color: #2F3A4D;
  color: white;

  ${breakpoint('xs')`
    .desktop-footer {
      display: none;
    }

    .mobile-footer {
      width: 100%;
      height: 100%;
      padding: 35px 50px 80px 50px;
      position: relative;

      .links {
        text-align: center;

        .subtitle {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          > div {
            width: 136px;
            border-bottom: solid 2px #939396;
            padding: 20px 0;
            margin-bottom: 20px;
            font-size: 20px;
            font-weight: bold;
          }
        }

        ul {
          list-style: none;
          padding-left: 0;
          li {
            padding: 10px 0;
            font-size: 16px;
            color: #939396;
            cursor: pointer;
            a {
              color: #939396;              
            }
          }
        }

        .input-wrapper {
          .form-group {
            input, textarea {
              background-color: #384558;
              border: none;
            }

            button.btn {
              width: 100%;
              background-color: #589DF9;
              border: none;
            }
          }
        }
      }

      .contacts {
        display: flex;
        flex-direction: column;
        font-size: 18px;
        font-weight: 500;
        color: white;
        justify-content: center;
        align-items: center;
        text-align: center;

        .img {
          width: 200px;
        }

        div {
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }

      .copywriter {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.8;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        background-color: #384558;
      }
    }
  `}

  ${breakpoint('md')`
    .mobile-footer {
      display: none;
    }

    .desktop-footer {
      display: block;

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 58px 140px;
    
        .left-info {
          div {
            padding: 10px 0;
          }
        }
    
        .right-info {
          display: flex;
          align-items: space-between;
    
          .links-wrapper {
            .support-and-pages {
              display: flex;
            }
          }
    
          .links {
            min-width: 100px;
            padding-right: 50px;
    
            &.follow-up {
              width: 220px;
              padding-right: 0;
            }
    
            .subtitle {
              width: 100%;
              border-bottom: solid 2px #939396;
              padding: 20px 0;
              margin-bottom: 20px;
              font-size: 20px;
              font-weight: bold;
            }
    
            .social-icons-container {
              display: flex;
              align-items: center;
              justify-content: space-between;
    
              .social-wrapper {
                width: 36px;
                height: 36px;
                border-radius: 18px;
                border: solid 1px #B1AFB0;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
    
            .input-wrapper {
              .form-group {
                input, textarea {
                  background-color: #384558;
                  border: none;
                }
    
                button.btn {
                  width: 100%;
                  background-color: #589DF9;
                  border: none;
                }
              }
            }
          }
    
          ul {
            list-style: none;
            padding-left: 0;
            li {
              padding: 10px 0;
              font-size: 16px;
              color: #939396;
              cursor: pointer;
              a {
                color: #939396;              
              }
            }
          }
        }
      }
    }

    .copywriter {
      opacity: 0.8;
      text-align: center;
      padding-top: 20px;
      padding-bottom: 20px;
      background-color: #384558;
    }
  `}

  a {
    text-decoration: none;
    color: white;
  }
`

export default Footer
