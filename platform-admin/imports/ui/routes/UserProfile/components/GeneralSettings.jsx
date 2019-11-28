import React, {Fragment} from 'react';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import 'moment-timezone';
import { toastr } from 'react-redux-toastr';
import {Switch} from 'meteor/populous:ui';
import {userProviderPermissions, userRoles} from 'meteor/populous:constants';
import { Row, Col, FormGroup, Modal, ModalHeader, ModalBody, Input, Form } from 'reactstrap';
import { H3, Small, Lead, LABEL, P, LinkText } from '../../../components/styled-components/Typography';
import { LinkButton, PrimaryButton, DangerButton } from '../../../components/styled-components/Buttons';
import { AvatarDropzone, AccountStatus, HR } from '../../../components/styled-components/Users/UserProfile';
import PdfReview from '../../../components/PdfReview';
import InnerLoading from '../../../components/InnerLoading';
import ChangeFeeModal from './ChangeFeeModal';

const GeneralSettings = ({
  user,
  loading,
  profilePicture,
  nicknameModal,
  toggleNicknameModal,
  timezoneModal,
  toggleTimezoneModal,
  passwordModal,
  changeFeeModal,
  saveGeneralSetting,
  togglePasswordModal,
  changePassword,
  toggleChangeFeeModal,
  changeFee,
  reset2FA,
  suspendAccount,
  activateAccount,
  destroyAccount,
  sendEmail,
  updateUserAvatar,
  pdfFile,
  pdfPreview,
  openPdfPreview,
  closePdfPreview,
  removeNickname
}) => {
  if(loading) {
    return <InnerLoading />;
  }

  if(!user) {
    return <div></div>;
  }

  const submitPasswordForm = (e) => {
    e.preventDefault();
    const {
      password,
      passwordConfirm
    } = e.target;
    if (password.value !== passwordConfirm.value) {
      toastr.error('Error', 'New password do not match.');
      return false;
    }
    if (password.value == '') {
      toastr.error('Error', 'New password is empty.');
      return false;
    }
    togglePasswordModal();
    changePassword(user, password.value);
  };

  const submitChangeFeeForm = ({
    dailyFee,
    dailyPenaltyFee,
    advancedPercentage,
    populousMonthFee
  }) => {
    toggleChangeFeeModal();
    changeFee(user, {
      dailyFee: dailyFee,
      dailyPenaltyFee: dailyPenaltyFee,
      populousMonthFee: populousMonthFee,
      advancedPercentage: advancedPercentage
    });
  };

  const showSendEmailPage = () => {
    let emails = [];
    user.emails.map((email) => {
      if (email.verified) {
        emails.push(email.address);
      }
    });

    sendEmail(emails);
  };

  const handler = (error) => {
    if(error){
      toastr.error('Something went wrong', error.reason || `${error}`);
    }
  };

  const avatar = user.avatar();
  const twoFAFile = user.twoFAKeyIDFile();

  const timeZones = moment.tz.names();
  const offsetTmz = [];
  for (const i in timeZones) {
    const tz = moment.tz(timeZones[i]).format('Z').replace(':00', '').replace(':30', '.5');
    let x = (tz === 0) ? 0 : parseInt(tz).toFixed(2);

    const timeZone = {
      label: `(GMT${moment.tz(timeZones[i]).format('Z')})${timeZones[i]}`,
      value: `${timeZones[i]}`,
      time: `${x}`,
    };
    offsetTmz.push(timeZone);
  }
  offsetTmz.sort((a, b) => a.time - b.time);
  const timeZoneString = `(GMT${moment.tz(user.timezone).format('Z')}) ${user.timezone ? user.timezone : ''}`;
  const isProvider = user.isProvider();

  return (
    <div className="position-relative">
      <H3>General</H3>
      <AccountStatus>
        <Small className="m-b-5">Account status:</Small>
        <div className="d-inline-flex align-items-center">
          <img src={user.isActive() ? '/images/icons/ico-check.svg' : '/images/icons/ico-in-progress.svg'} className="m-r-10" />
          {`${user.isActive() ? 'Active' : 'Suspended'}`}
        </div>
      </AccountStatus>
      <Row>
        <Col sm="12" className={'m-t-20'}>
          <div className="d-flex flex-row">
            <AvatarDropzone>
              { avatar && <img src={ avatar.link() } alt="image preview" className="image-avatar" /> }
              <Dropzone onDrop={(files) => updateUserAvatar(user, files)}
                        accept="image/jpeg,image/jpg,image/tiff,image/gif, image/png"
                        multiple={ false }
                        className="dropzone-avatar"
              >
                <div className="no-image"><img src="/images/icons/ico-plus.svg" /></div>
              </Dropzone>
            </AvatarDropzone>

            <div className="d-flex flex-column m-l-30">
              { user.isInvestor() && !isProvider && <Lead>Investor</Lead> }
              { isProvider && <Lead>Provider</Lead> }
              { user.isBorrower() && <Lead>Borrower</Lead> }
              { user.isAdmin() && <Lead>Administrator</Lead> }
              <div className="d-flex justify-content-between">
                {
                  user.isInvestor() &&
                  <FormGroup>
                    <Small>Nickname</Small>
                    {
                      !!user.nickname ?
                      <P>{user.nickname}</P> :
                      <LinkText onClick={() => toggleNicknameModal(true)}>Add nickname</LinkText>
                    }
                  </FormGroup>
                }
                {
                  user.isInvestor() && user.nickname &&
                  <div>
                    <div onClick={() => toggleNicknameModal(true)} className="m-l-10 edit-btn d-inline">
                      <img src="/images/icons/ico-edit.svg" />
                    </div>
                    <div onClick={() => removeNickname(user)} className="m-l-10 edit-btn d-inline">
                      <img src="/images/icons/ico-trash.svg"/>
                    </div>
                  </div>
                }
              </div>
              <div className="d-flex justify-content-between">
                <FormGroup>
                  <Small>Time Zone</Small>
                  <P className="m-0" style={{ wordBreak: 'break-word' }}>{timeZoneString}</P>
                </FormGroup>
                <div onClick={() => toggleTimezoneModal(true)} className="m-l-10 edit-btn">
                  <img src="/images/icons/ico-edit.svg" />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <div className="d-flex flex-row">
            <div className="d-flex flex-column">
              <HR />
              <Lead>Account</Lead>
              <FormGroup>
                <Small>Email</Small>
                <P className="m-0">{user.emails[0].address}</P>
              </FormGroup>
              <FormGroup>
                <Small>Password</Small>
                <LinkText onClick={() => togglePasswordModal()}>Change Password</LinkText>
              </FormGroup>
              {user.role === userRoles.borrower &&
                <FormGroup>
                  <Small>Bidding</Small>
                  <Switch
                    className={'m-l-10'}
                    onChange={() => {
                      user.callMethod('toggleCreateInvoice', handler)
                    }}
                    checked={user.createInvoice}
                    disabled={false}
                  />
                </FormGroup>
              }
              { twoFAFile &&
                <FormGroup>
                  <div className="d-flex">
                    <img src="/images/icons/ico-attention.png" width="24" height="24" />
                    <div className="m-l-10">
                      <P>This user requested 2-factor authentication reset.</P>
                      <Small>Photo ID provided: </Small>
                      <a href="javascript:void(0);" onClick={() =>
                        openPdfPreview(twoFAFile._id, twoFAFile.type, user._id)}
                      >
                        {twoFAFile.name}
                      </a>
                    </div>
                  </div>
                </FormGroup>
              }
              <FormGroup className="m-t-15">
                <PrimaryButton md onClick={() => reset2FA(user)}>Reset 2fa</PrimaryButton>
                <PrimaryButton md onClick={() => showSendEmailPage(user.emails)}>Send Email</PrimaryButton>
              </FormGroup>
              <HR />
              <FormGroup className="m-t-15">
                { user.isActive()
                  ? <PrimaryButton md onClick={() => suspendAccount(user)}>Suspend Account</PrimaryButton>
                  : <PrimaryButton md onClick={() => activateAccount(user)}>Activate Account</PrimaryButton>
                }
                <DangerButton md onClick={() => destroyAccount(user)}>Delete Account</DangerButton>
              </FormGroup>
            </div>
          </div>
        </Col>
        { user.isBorrower() &&
        <Col sm="6">
          <HR />
          <Lead>Fees</Lead>
          <Row>
            <Col sm="6">Daily rate</Col>
            <Col sm="6" style={{fontWeight: 'bold'}}>{user.fees.dailyFee}% per/day</Col>
          </Row>
          <Row>
            <Col sm="6">Monthly rate</Col>
            <Col sm="6" style={{fontWeight: 'bold'}}>{user.fees.dailyFee * 30}% per/month</Col>
          </Row>
          <Row>
            <Col sm="6">Late payment fee</Col>
            <Col sm="6" style={{fontWeight: 'bold'}}>{user.fees.dailyPenaltyFee}% late</Col>
          </Row>
          <Row>
            <Col sm="6">Monthly Populous Fee</Col>
            <Col sm="6" style={{fontWeight: 'bold'}}>{user.fees.populousMonthFee}%</Col>
          </Row>
          <Row>
            <Col sm="6">Advanced Percentage</Col>
            <Col sm="6" style={{fontWeight: 'bold'}}>{user.fees.advancedPercentage}%</Col>
          </Row>
          <FormGroup className="m-t-15">
            <PrimaryButton md onClick={() => toggleChangeFeeModal(user)}>Change Fees</PrimaryButton>
          </FormGroup>
        </Col>
        }
      </Row>

      {
        pdfPreview &&
        <PdfReview file={pdfFile} close={() => closePdfPreview()} />
      }

      <Modal isOpen={nicknameModal} toggle={toggleNicknameModal} className="custom">
        <ModalHeader toggle={() => toggleNicknameModal(false)}>Edit Account Data</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              e.preventDefault();
              const { nickname } = e.target;
              if (!nickname.value || nickname.value === '') {
                toastr.error('Error', 'Please enter the nickname.');
                return;
              }
              toggleNicknameModal(false);
              saveGeneralSetting(user, {nickname: nickname.value});
            }}
            className="form custom"
          >
            <FormGroup>
              <Small for="nickname">Nickname</Small>
              <Input name="nickname" id="nickname" type="text" defaultValue={user.nickname || ''} />
            </FormGroup>
            <div className="d-flex justify-content-center align-content-center m-t-20">
              <PrimaryButton>Save Settings</PrimaryButton>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <Modal isOpen={timezoneModal} toggle={toggleTimezoneModal} className="custom">
        <ModalHeader toggle={() => toggleTimezoneModal(false)}>Change Time Zone</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              e.preventDefault();
              const { timezone } = e.target;
              if (!timezone.value || timezone.value === user.timezone || timezone.value === '') {
                toastr.error('Error', 'Please choose a valid time zone.');
                return;
              }
              toggleTimezoneModal(false);
              saveGeneralSetting(user, {timezone: timezone.value});
            }}
            className="form custom"
          >
            <FormGroup>
              <LABEL>Time Zone</LABEL>
              <Input type="select" name="timezone" defaultValue={user.timezone || ''}>
                <option value="">Select Time Zone...</option>
                {offsetTmz.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>{item.label}</option>
                  );
                })}
              </Input>
            </FormGroup>
            <div className="d-flex justify-content-center align-content-center m-t-20">
              <PrimaryButton>Change Time Zone</PrimaryButton>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <Modal isOpen={passwordModal} toggle={togglePasswordModal} className="custom">
        <ModalHeader toggle={togglePasswordModal}>Change Password</ModalHeader>
        <ModalBody>
          <Form className="form custom" onSubmit={(e) => submitPasswordForm(e)}>
            <FormGroup>
              <LABEL for="password">New Password</LABEL>
              <Input name="password" id="password" type="password" defaultValue="" />
            </FormGroup>
            <FormGroup>
              <LABEL for="passwordConfirm">Confirm New Password</LABEL>
              <Input name="passwordConfirm" id="passwordConfirm" type="password" defaultValue="" />
            </FormGroup>
            <div className="d-flex justify-content-center align-content-center m-t-20">
              <PrimaryButton>Update Password</PrimaryButton>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      {changeFeeModal && <ChangeFeeModal isOpen={changeFeeModal} toggle={toggleChangeFeeModal} submitChangeFeeForm={submitChangeFeeForm} fees={user.fees}/>}
    </div>
  );
};

export default GeneralSettings;
