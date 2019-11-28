import React, {Fragment} from 'react';
import { Label, Modal, ModalHeader, ModalBody, Form, Row, Col, FormGroup, Input, Container } from 'reactstrap';
import moment from 'moment';

import InnerLoading from '../../../../ui/components/InnerLoading';
import TrashIcon from "../../../components/Icons/TrashIcon";
import { toastr } from 'react-redux-toastr';
import { H3, LABEL,  P } from '../../../components/styled-components/Typography/index';
import { UnderLineDiv } from "../../../components/styled-components/Divs";
import { InputInvisible } from '../../../components/styled-components/Inputs';

import {PrimaryButton} from '../../../components/styled-components/Buttons';

class ExternalWallet extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      timeToAddressActivationList: {},
      timeToActivation: '',
      timeToAddressActivation: '',
      externalAddress: null,
      currentExternalAddress: null
    };
    this.showWalletAddressForm = this.showWalletAddressForm.bind(this);
    this.editWalletAddressEvt = this.editWalletAddressEvt.bind(this);
  }

  componentWillUpdate(nextProps, nextState){
    let externalAddress = '';
    let isNewAddress, timeToActivation;
    let isAddressUpdated = false;
    if (nextProps.externalsAddresses.length) {
      nextProps.externalsAddresses.map((externalAddr, i) => {
        let isNewAddress = !!externalAddr.newAddress;
        if (!externalAddr.timeToAddressActivation && isNewAddress) {
          timeToActivation = moment(externalAddr.updatedAt).add(48, 'hours');
          externalAddr = this.getLeftUntilActivation(timeToActivation, externalAddr, i);
        }
        return externalAddr;
      })
    }
  }

  componentDidUpdate(){
    this.props.externalsAddresses.map((item, i) => {
      if (item.timeToActivation && !item.intervalId) {
        item.intervalId = setInterval(()=>{this.getLeftUntilActivation(item.timeToActivation, item, i)}, 1000);
      }
      return item;
    })
  }

  componentWillUnmount() {
    this.props.externalsAddresses.map((item) => {
      clearInterval(item.intervalId);
      return item;
    });
    this.props.initWalletAddresses();
  }
  showWalletAddressForm(externalAddress) {
    this.setState({externalAddress: externalAddress, currentExternalAddress: externalAddress});
    this.props.toggleWalletAddressEdit(true)
  }
  getLeftUntilActivation = (date, externalAddress, idx) => {
    const toDate = moment(date).valueOf();
    const nowDate = moment().valueOf();
    const tempTime = moment.duration(toDate - nowDate);

    if (Math.sign(tempTime) === -1) {
      return 0;
    }

    let days = tempTime.days();
    let hours = days ? (days * 24 + tempTime.hours()) : tempTime.hours();
    hours = hours < 10 ? ('0' + hours):hours;
    let minutes = tempTime.minutes() < 10 ? ('0' + tempTime.minutes()):tempTime.minutes();
    let seconds = tempTime.seconds() < 10 ? ('0' + tempTime.seconds()): tempTime.seconds();
    externalAddress.timeToAddressActivation = `${hours}:${minutes}:${seconds}`;
    externalAddress.timeToActivation = date;

    const timeToAddressActivationList = this.state.timeToAddressActivationList;
    timeToAddressActivationList[externalAddress.newAddress] = `${hours}:${minutes}:${seconds}`;
    this.setState({timeToAddressActivationList: timeToAddressActivationList});
    if (!tempTime.hours() && !tempTime.minutes() && !tempTime.seconds()) {
      externalAddress.callMethod('confirmationAddress');
    }
    return externalAddress;
  };
  editWalletAddressEvt (e) {
    e.preventDefault();
    const { address } = e.target;
    if (!!address.value) {
      this.props.toggleWalletAddressEdit(false);
      this.props.editWalletAddress(this.state.currentExternalAddress, address.value);
    } else {
      toastr.error('Error', 'Wallet address cannot be empty');
    }
  }
  render(){
    const {
      loading, externalsAddresses, selectExternalAddress, removeWalletAddress, editWalletAddress, toggleWalletAddressEdit,
      showWalletAddressEdit, selectedAddresses,
      toggleAddWalletAddress, showAddWalletAddress, addWalletAddress, currentUser, isAdmin
    } = this.props;

    if (loading) {
      return <Container><InnerLoading /></Container>;
    }

    let externalAddress = this.state.externalAddress;
    let isNewAddress;
    if (!externalAddress && externalsAddresses.length) {
      externalAddress = externalsAddresses[0];
      isNewAddress = !!externalAddress.newAddress;
    }
    
    return (
    <div>
      <H3>Wallet Addresses</H3>
      {isAdmin && <Row>
        <Col xs={12} lg={12} xl={4}  className="m-t-30" style={{maxWidth: 260}}>
          <PrimaryButton onClick={() => toggleAddWalletAddress(true)} md className="m-t-10">+ Add address</PrimaryButton>
        </Col>
      </Row>}
      {externalsAddresses.length > 0 &&
        externalsAddresses.map((address, i) => (
          <Row key={i} className="p-l-15 p-r-30">
            <Col xs={9} lg={9} xl={6} className="m-t-30 p-l-0">
              <Label>Name</Label>
              <Col className="p-l-0">{address.name}</Col>
            </Col>
            <Col xs={3} lg={3} xl={6} className="m-t-30 d-flex p-r-0" style={{justifyContent: 'flex-end'}}>

              {isAdmin && <div onClick={() => this.showWalletAddressForm(address)} className="m-t-15" style={{cursor: 'pointer'}}>
                <img src="/images/icons/ico-edit.svg"/>
              </div>}
              <div onClick={() => removeWalletAddress(address)} className="m-l-20 m-t-15" style={{cursor: 'pointer'}}>
                <TrashIcon color={'#5ca0f6'}/>
              </div>
            </Col>
            <Col xs={12} lg={12} xl={12} className="m-t-15 address-block">
              <Label className="m-l-15">Address</Label>
              <Col>{address.address || address.newAddress}</Col>
              {
                !!address.newAddress && !address.address && 
                <Col className='red-color'>
                  {isAdmin && 'Your'} new address will be available for use after {this.state.timeToAddressActivationList[address.newAddress]}
                </Col>
              }
              {
                !!address.newAddress && address.address && 
                <Col className='red-color'>
                  {isAdmin && 'Your'} wallet address will change to {address.newAddress} after {this.state.timeToAddressActivationList[address.newAddress]}
                </Col>
              }
            </Col>
          </Row>
        ))
      }
      {externalsAddresses.length === 0 && 
        <Row>
          <Col xs={12} lg={12} xl={4}  className="m-t-30" style={{maxWidth: 260}}>
              <P>No external wallet.</P>
          </Col>
        </Row>
      }
        <Modal isOpen={showWalletAddressEdit} toggle={toggleWalletAddressEdit} className="custom">
          <ModalHeader toggle={() => toggleWalletAddressEdit(false)}>EDIT WALLET ADDRESS</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={e => this.editWalletAddressEvt(e)}
              className="form custom"
            >
              <FormGroup>
                <Label for="address">Address</Label>
                <Input name="address" id="address" type="text" defaultValue={externalAddress?(externalAddress.address || externalAddress.newAddress):""} />
              </FormGroup>
              <div className="d-flex justify-content-center align-content-center">
                <PrimaryButton>Save Changes</PrimaryButton>
              </div>
            </Form>
          </ModalBody>
        </Modal>

        <Modal isOpen={showAddWalletAddress} toggle={toggleAddWalletAddress} className="custom">
          <ModalHeader toggle={() => toggleAddWalletAddress(false)}>ADD WALLET ADDRESS</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={e => {
                e.preventDefault();
                const { newAddress, name } = e.target;
                if (!!name.value && !!newAddress.value) {
                  toggleAddWalletAddress(false);
                  addWalletAddress(newAddress.value, name.value);
                } else {
                  toastr.error('Error', 'Wallet name or address cannot be empty');
                }
              }}
              className="form custom"
            >
              <FormGroup>
                <Label for="name">Wallet name</Label>
                <Input name="name" id="name" type="text" />
              </FormGroup>

              <FormGroup>
                <Label for="newAddress">Address</Label>
                <Input name="newAddress" id="newAddress" type="text" />
              </FormGroup>
              <div className="d-flex justify-content-center align-content-center">
                <PrimaryButton>Add wallet address</PrimaryButton>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );

  };
}

export default ExternalWallet;
