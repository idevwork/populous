import React, {Fragment} from 'react';
import {Col, Row} from "reactstrap";
import { countries, statuses, employeeNumbers } from 'meteor/populous:constants';
import {LABEL, P} from "../../../components/styled-components/Typography";
import moment from "moment/moment";
import checkTableValue from "./checkTableValue";


const InvestorCustomerProfile = ({user, idDocs, addressDocs, livePhotoDocument}) => {
  const residentalCountry = countries.filter((country)=> country.key === user.residentalCountry)[0];

  return (
    <Row className="table-row">
      <Col className="title" xs={12}>
        <P>Company Information</P>
      </Col>
      <Col xs={12}>
        <LABEL>Company Name</LABEL>
        <P>
          {checkTableValue(user.companyName)}
        </P>
      </Col>
      <Col xs={12}>
        <LABEL>Company Number</LABEL>
        <P>
          {checkTableValue(user.companyNumber)}
        </P>
      </Col>
      <Col className="title" xs={12}>
        <P>Company contact person</P>
      </Col>
      <Col xs={12} sm={6}>
        <LABEL>First Name</LABEL>
        <P>
          {checkTableValue(user.firstName)}
        </P>
      </Col>
      <Col xs={12} sm={6} className="col-sep">
        <LABEL>Last Name</LABEL>
        <P>
          {checkTableValue(user.lastName)}
        </P>
      </Col>
      <Col xs={12} sm={6}>
        <LABEL>Date of Birth</LABEL>
        <P>
          {checkTableValue(user.dateOfBirth, undefined, (value) => moment(user.dateOfBirth).format('DD/MM/YYYY'))}
        </P>
      </Col>
      <Col xs={12} sm={6} className="col-sep">
        <LABEL>Gender</LABEL>
        <P>
          {checkTableValue(user.gender)}
        </P>
      </Col>
      <Col xs={12} sm={6}>
        <LABEL>Residental Address</LABEL>
        <P>
          {checkTableValue(user.residentalAddressLine1)}
        </P>
      </Col>
      <Col xs={12} sm={6} className="col-sep">
        <LABEL>Office, floor, etc</LABEL>
        <P>
          {checkTableValue(user.residentalAddressLine2)}
        </P>
      </Col>
      <Col xs={8} sm={4}>
        <LABEL>City</LABEL>
        <P>
          {checkTableValue(user.residentalCity)}
        </P>
      </Col>
      <Col xs={4} sm={2} className="col-sep">
        <LABEL>Postal Code</LABEL>
        <P>
          {checkTableValue(user.residentalPostcode, 'n/p')}
        </P>
      </Col>
      <Col xs={12} sm={6} className="col-sep">
        <LABEL>Country</LABEL>
        <P>
          {checkTableValue(residentalCountry, 'not-provided', (country)=>country.name)}
        </P>
      </Col>
      <Col xs={12}>
        <LABEL>Phone Number</LABEL>
        <P>
          {checkTableValue(user.phoneAreaCode + ' ' + user.phoneNumber, undefined, undefined, (value)=>{
            const codeAndNumber = value.split(' ');
            const isValidCode = codeAndNumber[0]!=='null' && codeAndNumber[0]!=='undefined';
            const isValidPhone = codeAndNumber[1]!=='null' && codeAndNumber[1]!=='undefined';

            return isValidCode && isValidPhone;
          })}
        </P>
      </Col>
      {checkTableValue(user.residentalCountry) === 'CA' &&
      <Fragment>
        <Col xs={12} sm={6}>
          <LABEL>Social insurance number</LABEL>
          <P>{checkTableValue(user.socialInsuranceNumber)}</P>
        </Col>
        <Col xs={12} sm={6} className="col-sep">
          <LABEL>Passport</LABEL>
          <P>{checkTableValue(user.passport)}</P>
        </Col>
      </Fragment>
      }
      <Col xs={12} sm={6}>
        <LABEL>ID Document</LABEL>
        <P>{checkTableValue(user.idDocumentType)}</P>
      </Col>
      <Col xs={12} sm={6} className="col-sep p-t-30">
        <div>
          {checkTableValue(idDocs)}
        </div>
      </Col>
      <Col xs={12} sm={6}>
        <LABEL>Address Proof Document</LABEL>
        <div>
          {checkTableValue(addressDocs)}
        </div>
      </Col>
      <Col xs={12} sm={6} className="col-sep">
        <LABEL>Photo</LABEL>
        <div>
          {checkTableValue(livePhotoDocument)}
        </div>
      </Col>
    </Row>
  );
}

export default InvestorCustomerProfile;
