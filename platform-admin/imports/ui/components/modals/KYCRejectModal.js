import React from 'react';
import styled from 'styled-components';
import {FormGroup, Modal, ModalHeader, ModalBody, Input, Form} from 'reactstrap';
import {Small, LABEL} from '../styled-components/Typography';
import {PrimaryButton} from '../styled-components/Buttons';


const KYCRejectReasons = [
  "Information doesn't match the documents copies",
  "The documents are not fully provided",
  "Inappropriate document(s) provided",
  "The documents copies aren't legible or clear",
];

const FormLabel = styled.label`
  color: ${props => props.theme.colors.charcoalGrey};
  line-height: 1.2;
  text-transform: none !important;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
  
  .check {
    width: 25px !important;
    height: 25px !important;
    
    &:after{
     width: 8px !important;
     height: 14px !important;
     margin: 2px 8px !important;
    }
  }
  
  .other-reason {
    margin-top: -6px; 
    padding: 0 10px 0 10px;
    width: 100%;
    
    .form-control {
      font-size: 0.875rem !important;
    }
    
    .form-control:disabled {
      background-color: transparent !important;
    }
  }
`;

const initialState = {
  selectedReasons: [],
  otherReason: '',
  selectedOtherReason: false,
};

class KYCRejectModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    }
  }

  onChangeReasons = (event, reason) => {
    let reasons = this.state.selectedReasons;
    if (event.target.checked) {
      reasons.push(reason);
    } else {
      if (reasons.indexOf(reason) !== -1) {
        reasons = reasons.splice(reasons.indexOf(reason), 1);
      }
    }

    this.setState(reasons);
  };

  getRejectReason = () => {
    if (KYCRejectReasons.length) {
      return KYCRejectReasons.map((reason, index) => (
        <div className='checkbox-personalized p-t-10' key={index}>
          <input className='react-bs-select-all'
                 type='checkbox'
                 name={ 'checkbox' + index }
                 id={ 'checkbox' + index }
                 checked={this.state.selectedReasons.indexOf(reason) !== -1}
                 onChange={(event) => this.onChangeReasons(event, reason)}
          />
          <FormLabel className="p-0 d-flex" htmlFor={ 'checkbox' + index }>
            <div className='check'></div>
            <div className="p-l-10 m-t-5 "><Small>{reason}</Small></div>
          </FormLabel>
        </div>
      ));
    }
  };

  getOtherRejectReason = () => {
    const indexOtherReason = KYCRejectReasons.length + 1;
    return (
        <div className='checkbox-personalized p-t-10' key={indexOtherReason}>
          <input className='react-bs-select-all'
                 type='checkbox'
                 name={ 'checkbox' + indexOtherReason }
                 id={ 'checkbox' + indexOtherReason }
                 checked={this.state.selectedOtherReason}
                 onChange={(event) => this.setState({selectedOtherReason: event.target.checked})}
          />
          <FormLabel className="p-0 d-flex" htmlFor={ 'checkbox' + indexOtherReason }>
            <div className='check'></div>
            <div className="other-reason">
              <Input
                name="otherReason"
                type="text"
                value={this.state.otherReason}
                placeholder="Other reason..."
                disabled={!this.state.selectedOtherReason}
                onChange={(event) => this.setState({otherReason: event.target.value})}
              />
            </div>
          </FormLabel>
        </div>
    );
  };

  submitRejectKYC = (e) => {
    e.preventDefault();
    let reasons = this.state.selectedReasons;

    if(this.state.selectedOtherReason) {
      const {otherReason} = e.target;
      reasons.push(otherReason.value);
    }

    this.props.submitRejectKYCForm(this.props.user, reasons);
    this.setState(initialState);
    this.props.toggleRejectKYCModal();
  };

  render() {
    const {rejectKYCModal, toggleRejectKYCModal} = this.props;
    return (
      <Modal isOpen={rejectKYCModal} toggle={toggleRejectKYCModal} className="custom">
        <ModalHeader toggle={toggleRejectKYCModal}>Specify the reason</ModalHeader>
        <ModalBody>
          <Form className="form custom" onSubmit={(e) => this.submitRejectKYC(e)}>
            <FormGroup>
              <LABEL className='m-b-10' for="reason">Reason</LABEL>
              {this.getRejectReason()}
              {this.getOtherRejectReason()}
            </FormGroup>
            <div className="d-flex justify-content-center align-content-center m-t-20">
              <PrimaryButton type="button" outline onClick={() => toggleRejectKYCModal()}>Cancel</PrimaryButton>
              <PrimaryButton>REJECT KYC data</PrimaryButton>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

export default KYCRejectModal;