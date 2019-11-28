import React, {Fragment} from 'react';
import moment from 'moment';
import {statuses} from 'meteor/populous:constants';
import {H3, Small, P} from '../../../components/styled-components/Typography';
import {AccountStatus} from '../../../components/styled-components/Users/UserProfile';
import PdfReview from '../../../components/PdfReview';
import InnerLoading from '../../../components/InnerLoading';
import InvestorCustomerProfile from "./InvestorCustomerProfile";
import BorrowerCustomerProfile from "./BorrowerCustomerProfile";

const CustomerProfile =
  ({
     user,
     loading,
     bankStatementDocuments,
     idDocuments,
     addressDocuments,
     livePhotoDocument,
     pdfFile,
     pdfPreview,
     openPdfPreview,
     closePdfPreview,
   }) => {
    if (loading) {
      return <InnerLoading/>;
    }

    if (!user) {
      return <div></div>;
    }

    const kycStatusIcons = {
      [statuses.verified]: 'ico-check.svg',
      [statuses.pending]: 'ico-in-progress.svg',
      [statuses.unverified]: 'ico-cross.svg',
      [statuses.declined]: 'ico-cross.svg'
    };

    const kycStatus = {
      [statuses.verified]: 'Verified',
      [statuses.pending]: 'Waiting for verification',
      [statuses.unverified]: 'Unverified',
      [statuses.declined]: 'Rejected'
    }

    const renderDocuments = (documents, title) => {
      return documents.map((file) => (
        <Fragment key={file._id}>
          <a href="javascript:void(0);" onClick={() => {
            openPdfPreview(file._id, file.type, user._id);
          }}>
            {file.name}
          </a> ({moment(file.createdAt).format('DD-MM-YYYY')})
        </Fragment>));
    }

    return (
      <div className="position-relative">
        <H3>Populous customer profile (KYC)</H3>
        <AccountStatus>
          <Small className="m-b-5">KYC data status:</Small>
          <div className="d-inline-flex align-items-center">
            <img src={`/images/icons/${kycStatusIcons[user.KYCStatus]}`} className="m-r-10"/>
            {kycStatus[user.KYCStatus]}
          </div>
        </AccountStatus>
        <div className={'p-t-30 p-l-15 p-r-15 p-b-40'}>
          {user.isInvestor() && <InvestorCustomerProfile
            user={user}
            idDocs={renderDocuments(idDocuments)}
            addressDocs={renderDocuments(addressDocuments)}
            livePhotoDocument={renderDocuments(livePhotoDocument)}
          />}

          {user.isBorrower() && <BorrowerCustomerProfile
            user={user}
            idDocs={renderDocuments(idDocuments)}
            bankDocs={renderDocuments(bankStatementDocuments)}
            addressDocs={renderDocuments(addressDocuments)}
            livePhotoDocument={renderDocuments(livePhotoDocument)}
          />}
        </div>
        {
          pdfPreview &&
          <PdfReview file={pdfFile} close={() => closePdfPreview()}/>
        }
      </div>
    );
  };

export default CustomerProfile;
