import React, { Fragment } from 'react';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { statuses } from 'meteor/populous:constants';

import PdfReview from '../../../../components/PdfReview';
import { Small, P } from '../../../../components/styled-components/Typography';
import { PrimaryButton, DangerButton } from '../../../../components/styled-components/Buttons';
import { removeWithMyQueue, decline2FASecret } from '../MyQueue/modules/actions';
import { addToMyQueue, unassign } from '../../../Requests/components/MyQueue/modules/actions';

const Reset2faDetailsModal = (props) => {
  const { isOpen, isMyQueue, toggle, dataModal, pdfFile, pdfPreview, openPdfPreview, closePdfPreview, reset2FA } = props;

  if (!dataModal) {
    return null;
  }

  const renderDocuments = (documents) => {
    return (
      <Fragment>
        { documents.map((file, _) =>
          <div key={file._id}>
            <div className="m-b-5">
              <a href="javascript:void(0);" onClick={() => {
                openPdfPreview(file._id, file.type, dataModal.userId);
              }}>
                {file.name}
              </a>
            </div>
            <Small style={{color:'#a5acb5'}}>({file.verified ? 'Verified' : 'Unverified'})</Small>
          </div>
        )}
      </Fragment>
    );
  };

  let expiredDate, currentDate, isExpired;
  if (moment(dataModal.assignedDate).isValid()) {
    expiredDate = moment(dataModal.assignedDate).add(24, 'hours');
    currentDate = moment().utc();
    isExpired = currentDate.isAfter(expiredDate);
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="custom" style={{maxWidth: '992px'}}>
      <ModalHeader toggle={toggle}>Request details</ModalHeader>
      <ModalBody>
        <Row>
          <Col span={6}>
            <Col>
              <Small className="m-b-10">Type</Small>
              <P>2FA reset</P>
            </Col>
            <Col className="m-t-20">
              <Small className="m-b-10">Requested by</Small>
              <P>
                <a href={'/users/' + dataModal.userId} target="_blank">
                  {dataModal.userId}
                </a>
              </P>
            </Col>
            <Col className="m-t-20">
              <Small className="m-b-10">Submitted photo</Small>
              <P>
                { dataModal.twoFAFile &&
                  <a href="javascript:void(0);" onClick={() =>
                    openPdfPreview(dataModal.twoFAFile._id, dataModal.twoFAFile.type, dataModal.userId)}
                  >
                    {dataModal.twoFAFile.name}
                  </a>
                }
              </P>
            </Col>
            <Col className="m-t-20">
              { dataModal.idDocuments && dataModal.idDocuments.length > 0 &&
              <Fragment>
                <Small className="m-b-10">ID document in KYC</Small>
                {renderDocuments(dataModal.idDocuments)}
              </Fragment>
              }
            </Col>

            {
              pdfPreview &&
              <PdfReview file={pdfFile} close={() => closePdfPreview()} />
            }
          </Col>

          <Col span={6}>
            <Col>
              <Small className="m-b-10">Request ID</Small>
              <P>{dataModal._id}</P>
            </Col>
            <Col>
              <Small className="m-t-20 m-b-10">Date, Time</Small>
              <P>{ moment(dataModal.createdAt).format('DD-MM-YYYY, hh:mm a') }</P>
            </Col>
            <Col>
              <Small className="m-t-20 m-b-10">Status</Small>
              <P className="m-b-10">{dataModal.status}</P>
            </Col>
            { dataModal.executor &&
            <Col>
              <Small className="m-t-20 m-b-10">Executor</Small>
              <P><a href="javascript:void(0);">{dataModal.executor}</a></P>
            </Col>
            }
            { dataModal.assignedDate &&
            <Col>
              <Small className="m-t-20 m-b-10">Assigned</Small>
              <P className={"m-b-10" + (isExpired ? 'red-color' : '')}>
                {isExpired && <img src="/images/icons/ico-attention.svg" height={24} className="m-r-10 m-b-5"/>}
                {`${moment(dataModal.assignedDate).format('DD-MM-YYYY, hh:mm a')} to ${dataModal.executor}`}
              </P>
            </Col>
            }

            { isMyQueue &&
            <Fragment>
              <Col className="m-t-20">
                <PrimaryButton style={{width: 260}} className="m-t-5 m-b-20"
                               onClick={() => {reset2FA(dataModal.user); toggle();}}>
                  Reset 2fa
                </PrimaryButton>
              </Col>
              <Col>
                <DangerButton style={{width: 260}} className="m-0"
                  onClick={() => {
                    decline2FASecret(dataModal.user);
                    toggle();
                  }}
                >
                  Decline
                </DangerButton>
              </Col>
              <Col className="m-t-20">
                <PrimaryButton style={{width: 260}} outline className="m-0"
                  onClick={() => {
                    removeWithMyQueue(dataModal.dataId);
                    toggle();
                  }}
                >
                  REMOVE FROM MY QUEUE
                </PrimaryButton>
              </Col>
            </Fragment>
            }

            { !isMyQueue && dataModal.status === 'Being processed' &&
            <Fragment>
              <Col className="m-t-20">
                <PrimaryButton style={{width: 260}} outline className="m-0"
                               onClick={() => {
                                 unassign([dataModal.dataId]);
                                 toggle();
                               }}
                >
                  Unassign
                </PrimaryButton>
              </Col>
              <Col className="m-t-20">
                <PrimaryButton style={{width: 260}} outline className="m-0"
                               onClick={() => {
                                 unassign([dataModal.dataId], true);
                                 toggle();
                               }}
                >
                  Reassign to myself
                </PrimaryButton>
              </Col>
            </Fragment>
            }

            { !isMyQueue && dataModal.status === 'Opened' &&
            <Fragment>
              <Col className="m-t-20">
                <PrimaryButton style={{width: 260}} className="m-0"
                               onClick={() => {
                                 addToMyQueue([dataModal.dataId]);
                                 toggle();
                               }}
                >
                  Add to my queue
                </PrimaryButton>
              </Col>
            </Fragment>
            }
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default Reset2faDetailsModal;
