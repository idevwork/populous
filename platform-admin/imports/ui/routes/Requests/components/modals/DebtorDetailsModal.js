import React, {Fragment} from 'react';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';

import { Small, P } from '../../../../components/styled-components/Typography';
import { PrimaryButton, DangerButton, LinkButton } from '../../../../components/styled-components/Buttons';
import { removeWithMyQueue, markComplete, updateDebtor } from '../MyQueue/modules/actions';
import { validateDebtorForm } from '../../../../form-helpers/validation';
import { renderInputReactstrap } from '../../../../form-helpers/renderInputTextFields';
import { renderCountrySelector } from '../../../../form-helpers/renderSelectFields';
import { addToMyQueue, unassign } from '../../../Requests/components/MyQueue/modules/actions';

class DebtorDetailsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEdit: false,
    };

    this.toggleEditPanel = this.toggleEditPanel.bind(this);
  }

  toggleEditPanel() {
    this.setState({ showEdit: !this.state.showEdit });
  }

  render() {
    const { isOpen, toggle, isMyQueue, dataModal } = this.props;
    const { showEdit } = this.state;

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
                <Small className="m-b-5">Type</Small>
                <P>New debtor</P>
              </Col>

              <Col>
                <Small className="m-t-20 m-b-5">Debtor name</Small>
                <P>{dataModal.debtorName}</P>
              </Col>

              <Col>
                <Small className="m-t-20 m-b-5">Country of registration</Small>
                <P>{dataModal.countryName}</P>
              </Col>

              <Col>
                <Small className="m-t-20 m-b-5">Company number</Small>
                <P>{dataModal.companyNumber}</P>
              </Col>

              <Col>
                <Small className="m-t-20 m-b-5">Requested by</Small>
                <P><a href="javascript:void(0);">{dataModal.requestedUserEmail}</a></P>
              </Col>

              { isMyQueue &&
              <Col>
                <LinkButton onClick={() => this.toggleEditPanel()} className="p-0">
                  <img src="/images/icons/ico-edit-blue.png" className="m-r-10" />
                  Edit Debtor Detail
                </LinkButton>
              </Col>
              }

              { showEdit &&
              <form className="p-10 form" onSubmit={this.props.handleSubmit}>
                <Col className="m-t-10">
                  <Field
                    name="debtorName"
                    type="text"
                    component={renderInputReactstrap}
                    label="Debtor name"
                    placeholder={''}
                  />
                </Col>
                <Col className="m-t-20">
                  <Field name="country" label="Country of registration" component={renderCountrySelector} />
                </Col>
                <Col className="m-t-20">
                  <Field
                    name="companyNumber"
                    type="text"
                    component={renderInputReactstrap}
                    label="Company number"
                    placeholder={''}
                  />
                </Col>

                {isMyQueue &&
                <Col className="text-center m-t-30">
                  <PrimaryButton md>
                    SAVE CHANGES
                  </PrimaryButton>
                </Col>
                }
              </form>
              }
            </Col>

            <Col span={6}>
              <Col>
                <Small className="m-b-5">Request ID</Small>
                <P>{dataModal._id}</P>
              </Col>

              <Col>
                <Small className="m-t-20 m-b-5">Date, Time</Small>
                <P>{ moment(dataModal.createdAt).format('DD-MM-YYYY, hh:mm a') }</P>
              </Col>

              <Col>
                <Small className="m-t-20 m-b-5">Status</Small>
                <P className="m-b-5">{dataModal.status}</P>
              </Col>

              { dataModal.executor &&
              <Col>
                <Small className="m-t-20 m-b-5">Executor</Small>
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
              <Col className="m-t-30">
                <PrimaryButton
                  style={{width: 260}}
                  className="m-t-5 m-b-30"
                  onClick={() => {
                    markComplete(dataModal.dataId);
                    toggle();
                  }}
                >
                  CONFIRM NEW DEBTOR
                </PrimaryButton>

                <PrimaryButton
                  style={{width: 260, marginLeft: 0}}
                  outline className="m-b-30"
                  onClick={() => {
                    removeWithMyQueue(dataModal.dataId);
                    toggle();
                  }}
                >
                  REMOVE FROM MY QUEUE
                </PrimaryButton>

                <DangerButton
                  style={{width: 260}}
                  className="m-0"
                  onClick={() => {
                    console.log('delete request', dataModal.dataId);
                  }}
                >
                  DELETE REQUEST
                </DangerButton>
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
  }
}

export default reduxForm({
  form: 'debtorForm',
  validate: validateDebtorForm,
  onSubmit: (values, dispatch, props) => {
    updateDebtor(props.dataModal.dataId, values);
    props.toggle();
  },
})(DebtorDetailsModal);
