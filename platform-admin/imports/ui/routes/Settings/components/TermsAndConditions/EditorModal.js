import React, {Fragment} from 'react';
import Select from 'react-select';
import { Modal, ModalHeader, ModalBody, Row, Col, FormGroup } from 'reactstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { LABEL } from '../../../../components/styled-components/Typography';
import { PrimaryButton, DangerButton } from '../../../../components/styled-components/Buttons';
import { StyledInput } from "../../../../components/styled-components/Inputs";


const wrapperStyle = {
  marginTop: 10,
  height: '100%',
  border: '1px solid #c9c9c9',
  borderBottomWidth: '2px'
};
const editorStyle = {
  marginBottom: 30,
  padding: '5px 10px',
  height: 250,
  width: '100%'
};
const toolbarStyle = {
  background: '#fff',
  borderTop: '4px solid #333',
  borderBottom: '2px solid #c9c9c9',
};
const charactersStyle = {
  position: 'absolute',
  bottom: 17,
  right: 16,
  padding: '2px 10px',
  border: '1px solid #E1E5EB',
  borderRight: 'none',
  borderBottom: 'none',
  color: '#c9c9c9',
};

const initialState = {
  editorState: EditorState.createEmpty(),
  position: '',
  heading: '',
  charactersBody: 0
};

class EditorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataModal && prevProps.dataModal !== this.props.dataModal) {
      if (this.props.dataModal.content) {
        const {content, position, title} = this.props.dataModal;
        const blocksFromHtml = htmlToDraft(content);
        const {contentBlocks, entityMap} = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const contEnteditorState = EditorState.createWithContent(contentState);

        this.setState({
          position: position,
          heading: title,
          editorState: contEnteditorState,
        });
      } else {
        initialState.position =  this.props.dataModal.position;
        this.setState(initialState);
      }
    }
  }

  onEditorStateChange = (editorState) => {
    const charactersBody = draftToHtml(convertToRaw(editorState.getCurrentContent())).length;
    this.setState({
      editorState,
      charactersBody
    });
  };

  onFieldsStateChange = (field) => {
    this.setState(field);
  };

  saveSection = (e) => {
    e.preventDefault();
    const {editorState, position, heading} = this.state;
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    if (this.props.dataModal && this.props.dataModal.content) {
      const isUpdatedPosition = this.props.dataModal.position !== position;
      const isIncremetPosition = this.props.dataModal.position < position;
      this.props.formActions.saveSectionTC({position, heading, body}, isUpdatedPosition, false, isIncremetPosition, this.props.dataModal);
      this.props.toggle();
    } else {
      this.props.formActions.saveSectionTC({position, heading, body}, true, true);
      this.props.toggle();
    }
  };

  cancelSection = (e) => {
    e.preventDefault();
    if (this.props.dataModal && this.props.dataModal.content) {
      this.props.formActions.removeSectionTC(this.props.dataModal);
      this.props.toggle();
    } else {
      this.props.toggle();
    }
  };

  render() {
    const {isOpen, toggle, dataModal, termsAndConditions, className} = this.props;
    const { editorState, position, heading } = this.state;
    const positionOptions = termsAndConditions.map((item, index) => ({
      value: item.position,
      label: ++index,
    }));

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="custom" style={{maxWidth: '992px'}}>
        <ModalHeader toggle={toggle}>{dataModal ? 'Edit' : 'Create' } section</ModalHeader>
        <ModalBody>
          <form className={`form custom ${className}`}>
            <Row>
              {(dataModal && dataModal.content) &&
              <Col xs={12} sm={2}>
                <FormGroup>
                  <LABEL>Position</LABEL>
                  <Select
                    className="custom-selectbox m-t-5"
                    style={{width: '100%'}}
                    simpleValue
                    value={position}
                    searchable={false}
                    onChange={data => this.onFieldsStateChange({position: data})}
                    options={positionOptions}
                    arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg"/> }
                  />
                </FormGroup>
              </Col>
              }
              <Col xs={12} sm={(dataModal && dataModal.content) ? 10 : 12}>
                <FormGroup>
                  <LABEL>Heading</LABEL>
                  <StyledInput
                    value={heading}
                    type="text"
                    onChange={data => this.onFieldsStateChange({heading: data.target.value})}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <FormGroup>
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbar"
                    wrapperClassName="wrapper"
                    editorClassName="editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{emoji:{inDropdown: false}}}
                    wrapperStyle={wrapperStyle}
                    editorStyle={editorStyle}
                    toolbarStyle={toolbarStyle}
                  />

                  <span style={charactersStyle}>
                      {this.state.charactersBody}
                    </span>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="text-center m-t-20">
                <DangerButton onClick={ (e) => this.cancelSection(e) } className="m-r-20">
                  {(dataModal && dataModal.content) ? 'Delete' : 'Cancel'}
                </DangerButton>
                <PrimaryButton onClick={(e) => this.saveSection(e)}>
                  {(dataModal && dataModal.content) ? 'Save' : 'Create'}
                </PrimaryButton>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default EditorModal;
