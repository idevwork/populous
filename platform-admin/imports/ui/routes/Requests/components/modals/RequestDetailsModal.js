import React, {Fragment} from 'react';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';

import { Small, P } from '../../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { removeWithMyQueue, markComplete } from '../MyQueue/modules/actions';
import { addToMyQueue, unassign } from '../../../Requests/components/MyQueue/modules/actions';

const RequestDetailsModal = (props) => {
  const { isOpen, isMyQueue, toggle, dataModal } = props;

  if (!dataModal) {
    return null;
  }

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
              <P>{dataModal.type}</P>
            </Col>
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

            {isMyQueue &&
              <Col className="m-t-30">
                <PrimaryButton
                  style={{width: 260}}
                  className="m-t-5 m-b-30"
                  onClick={() => {
                    markComplete(dataModal.dataId);
                    toggle();
                  }}
                >
                  MARK AS COMPLETED
                </PrimaryButton>
                <PrimaryButton
                  style={{width: 260}}
                  outline className="m-0"
                  onClick={() => {
                    removeWithMyQueue(dataModal.dataId);
                    toggle();
                  }}
                >
                  REMOVE FROM MY QUEUE
                </PrimaryButton>
              </Col>
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

export default RequestDetailsModal;
