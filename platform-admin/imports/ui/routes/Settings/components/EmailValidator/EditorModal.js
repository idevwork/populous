import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, FormGroup } from 'reactstrap';
import { toastr } from 'react-redux-toastr';

import { LABEL } from '../../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { StyledInput } from "../../../../components/styled-components/Inputs";


const initialState = {
  subject: '',
  url: '',
};

class EditorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  componentDidMount() {
    const {dataModal} = this.props;
    if (dataModal) {
      this.setState({
        subject: dataModal.subject,
        url: dataModal.url,
      });
    }
  }

  onFieldsStateChange = (field) => {
    this.setState(field);
  };

  handelSubmit = () => {
    const {formActions:{saveEmailValidate}, toggle, dataModal} = this.props;
    const {subject, url} = this.state;
    const data = {
      subject: subject.trim(),
      url: url.trim(),
      model: dataModal,
    };

    if (!data.subject || !data.url) {
      return toastr.error('Error', 'Incorrect data!');
    }

    saveEmailValidate(data);
    toggle();
  };

  render() {
    const {isOpen, toggle} = this.props;
    const {subject, url} = this.state;

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="custom" >
        <ModalHeader toggle={toggle}>Edit email link</ModalHeader>
        <ModalBody>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <LABEL>Email Subject</LABEL>
                  <StyledInput
                    value={subject}
                    type="text"
                    onChange={data => this.onFieldsStateChange({subject: data.target.value})}
                    className="p-l-0"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <FormGroup>
                  <LABEL>Url to email</LABEL>
                  <StyledInput
                    value={url}
                    type="text"
                    onChange={data => this.onFieldsStateChange({url: data.target.value})}
                    className="p-l-0"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="text-center m-t-20">
                <PrimaryButton onClick={(e) => this.handelSubmit(e)}>
                  Save changes
                </PrimaryButton>
              </Col>
            </Row>
        </ModalBody>
      </Modal>
    );
  }
}

export default EditorModal;
