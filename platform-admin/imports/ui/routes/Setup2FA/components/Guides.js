import React from 'react';
import { Container, Row, Col, Media, Collapse } from 'reactstrap';

import { P, Small } from '../../../components/styled-components/Typography';

class Guides extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <a href="javascript:;" className={this.state.collapse?'collapse-trigger in':'collapse-trigger'} onClick={this.toggle}>How it works</a>
          <Col xs={'12'} className="p-0 m-t-20">
            <Collapse isOpen={this.state.collapse} className="p-30" style={{'background': '#F5F7FA'}}>
              <Container>
                <Row>
                  <Col xs={'12'}>
                    <P>You must have an authentication app installed on your phone or tablet. This app generates access codes for your Populous account. We will ask you to enter these codes to confirm some important actions for your account, like login or changing account settings.</P>
                    <P>If you lost your authentication app or device, you can reset 2FA via email, like your password.</P>
                    <P>Authentication apps we can recommend are:</P>
                  </Col>
                  <Col xs={'12'} md={'4'}>
                    <img className="pull-left" src="/images/app/img-ga-logo@2x.png" width={48} alt="Google Authenticator" />
                    <div className="p-l-10 pull-left">
                      <P className="m-b-0">
                        Google Authenticator
                      </P>
                      <Small inline>Download:</Small>
                      <Small inline className="m-l-10"><a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8" target="_blank">App Store</a></Small>
                      <Small inline className="m-l-10"><a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en" target="_blank">Google Play</a></Small>
                    </div>
                  </Col>
                  <Col xs={'12'} md={'4'}>
                    <img className="pull-left" src="/images/app/img-authy-logo@2x.png" width={48} alt="Authy" />
                    <div className="p-l-10 pull-left">
                      <P className="m-b-0">
                        Authy
                      </P>
                      <Small inline>Download:</Small>
                      <Small inline className="m-l-10"><a href="https://itunes.apple.com/us/app/authy/id494168017" target="_blank">App Store</a></Small>
                      <Small inline className="m-l-10"><a href="https://play.google.com/store/apps/details?id=com.authy.authy&hl=en" target="_blank">Google Play</a></Small>
                    </div>
                  </Col>
                  <Col xs={'12'} md={'4'}>
                    <img className="pull-left" src="/images/app/img-duo-logo@2x.png" width={48} alt="Duo Mobile" />
                    <div className="p-l-10 pull-left">
                      <P className="m-b-0">
                        Duo Mobile
                      </P>
                      <Small inline>Download:</Small>
                      <Small inline className="m-l-10"><a href="https://itunes.apple.com/us/app/duo-mobile/id422663827?mt=8" target="_blank">App Store</a></Small>
                      <Small inline className="m-l-10"><a href="https://play.google.com/store/apps/details?id=com.duosecurity.duomobile&hl=en" target="_blank">Google Play</a></Small>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Collapse>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Guides;
