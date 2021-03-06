import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import {reduxForm} from 'redux-form';
import {
  countries,
  averageInvoiceValues,
  averageInvoiceVolumes
} from 'meteor/populous:constants';
import moment from 'moment';

import {PrimaryButton} from '../../../../components/styled-components/Buttons';
import {H2, P, LABEL} from '../../../../components/styled-components/Typography';


class InvestorFormReviewPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {handleSubmit, previousPage, submitting} = this.props;
    const residentalCountry = countries.filter((country) => country.key === this.props.valuesForReview.residentalCountry)[0];
    const documentLabels = {
      DrivingLicence: 'Driving licence',
      IdentityCard: 'Identity card',
      ResidencePermit: 'Residence permit',
      Passport: 'Passport'
    };

    return (
      <form className="form" onSubmit={handleSubmit}>
        <H2 className="text-center m-b-30">
          Please review provided information
        </H2>

        <Row className="table-row">
          <Col className="title" xs={12}>
            <P>Company Information</P>
          </Col>
          <Col xs={12}>
            <LABEL>Company Name</LABEL>
            <P>{this.props.valuesForReview.companyName}</P>
          </Col>
          <Col xs={12}>
            <LABEL>Company Number</LABEL>
            <P>{this.props.valuesForReview.companyNumber}</P>
          </Col>
          <Col className="title" xs={12}>
            <P>Profile Information</P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>First Name</LABEL>
            <P>{this.props.valuesForReview.firstName}</P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Last Name</LABEL>
            <P>{this.props.valuesForReview.lastName}</P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Date of Birth</LABEL>
            <P>{moment(this.props.valuesForReview.dateOfBirth).format('DD/MM/YYYY')}</P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Gender</LABEL>
            <P>{this.props.valuesForReview.gender}</P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Residental Address</LABEL>
            <P>{this.props.valuesForReview.residentalAddressLine1}</P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Office, floor, etc</LABEL>
            <P>{this.props.valuesForReview.residentalAddressLine2}</P>
          </Col>
          <Col xs={12} sm={4}>
            <LABEL>City</LABEL>
            <P>{this.props.valuesForReview.residentalCity}</P>
          </Col>
          <Col xs={12} sm={2} className="col-sep">
            <LABEL>Postal Code</LABEL>
            <P>{this.props.valuesForReview.residentalPostcode}</P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Country</LABEL>
            <P>{residentalCountry ? residentalCountry.name : ''}</P>
          </Col>
          {this.props.valuesForReview.residentalCountry === 'CA' &&
          <Fragment>
            <Col xs={12} sm={6}>
              <LABEL>Social insurance number</LABEL>
              <P>{this.props.valuesForReview.socialInsuranceNumber}</P>
            </Col>
            <Col xs={12} sm={6} className="col-sep">
              <LABEL>Passport</LABEL>
              <P>{this.props.valuesForReview.passport}</P>
            </Col>
          </Fragment>
          }
          <Col xs={12}>
            <LABEL>Phone Number</LABEL>
            <P>{this.props.valuesForReview.phoneAreaCode} {this.props.valuesForReview.phoneNumber}</P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>ID Document</LABEL>
            <P>{documentLabels[this.props.valuesForReview.idDocumentType]}</P>
          </Col>
          <Col xs={12} sm={6} className="col-sep p-t-30">
            {this.props.valuesForReview.personalIdentification.length > 0 ?
             this.props.valuesForReview.personalIdentification.map((doc, i) => <P className="blue"
                                                                              key={i}>{doc.name}</P>) :
              <P>No Personal Identification added</P>}
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Address Proof Document</LABEL>
            {this.props.valuesForReview.addressIdentification.length > 0 ?
             this.props.valuesForReview.addressIdentification.map((doc, i) => <P className="blue"
                                                                             key={i}>{doc.name}</P>) :
              <P>No Address Proof Document added</P>}
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Photo</LABEL>
            {this.props.valuesForReview.livePhoto && this.props.valuesForReview.livePhoto.length > 0 ?
             this.props.valuesForReview.livePhoto.map((doc, i) => <P className="blue" key={i}>{doc.name}</P>) :
              <P>No Photo added</P>}
          </Col>
        </Row>

        <Row className="m-t-40">
          <Col md={{size: '3', offset: 3}} xs={6} className="p-r-10">
            <PrimaryButton outline block className="previous" onClick={previousPage}>
              Previous
            </PrimaryButton>
          </Col>
          <Col md={3} xs={6} className="p-l-10">
            <PrimaryButton block type="submit" disabled={submitting}>
              Submit Data
            </PrimaryButton>
          </Col>
        </Row>
      </form>
    );
  }
}

InvestorFormReviewPage = reduxForm({
  form: 'kycwizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
  // validate
})(InvestorFormReviewPage);

export default connect((state, ownProps) => ({
  valuesForReview: ownProps.initialValuesReduxForm,
}))(InvestorFormReviewPage);
