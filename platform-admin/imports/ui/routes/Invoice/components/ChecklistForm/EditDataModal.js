import React from 'react';
import {Modal, ModalHeader, ModalBody, FormGroup} from 'reactstrap';

import {LABEL} from '../../../../components/styled-components/Typography';
import {PrimaryButton} from '../../../../components/styled-components/Buttons';
import {StyledInput} from "../../../../components/styled-components/Inputs";


const initialState = {
  value: ''
};


class EditDataModal extends React.Component {
  state = initialState;

  onFieldsStateChange = (field) => {
    this.setState(field);
  };

  saveChanges = () => {
    const {dataModal: {name}, updateInvoiceField, updateDebtorName, toggle} = this.props;
    const {value} = this.state;

    if (name !== 'debtorName') {
      updateInvoiceField(name, value);
    } else {
      updateDebtorName(value)
    }
    toggle(null);
  };

  render() {
    const {isOpen, toggle, dataModal} = this.props;
    const {value} = this.state;

    if (!dataModal) {
      return null;
    }

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="custom">
        <ModalHeader toggle={()=>toggle(null)}>Edit the invoice</ModalHeader>
        <ModalBody>
          <div className="p-b-20">
            <FormGroup>
              <LABEL>{dataModal.title}</LABEL>
              <StyledInput
                value={value || dataModal.value}
                type="text"
                onChange={data => this.onFieldsStateChange({value: data.target.value})}
              />
            </FormGroup>
          </div>
          <div className="d-flex justify-content-center">
            <PrimaryButton block onClick={this.saveChanges} style={{maxWidth: '150px'}} disabled={!value || value === dataModal.value}>
              Save
            </PrimaryButton>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default EditDataModal;
