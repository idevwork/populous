import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, FormGroup } from 'reactstrap';
import { NavLink as NavLINK } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { H1, LABEL } from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import { createEmailTemplate } from '../modules/actions';
import { StyledInput } from "../../../components/styled-components/Inputs";
import Loading from "../../../components/Loading";

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

class AddTemplateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      name: '',
      subject: '',
      charactersBody: 0
    };

    this.saveEmailTemplate = this.saveEmailTemplate.bind(this);
  }

  componentWillMount() {
    if(this.props.initialValues) {
      const {body, name, subject} = this.props.initialValues;

      const blocksFromHtml = htmlToDraft(body);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const contEnteditorState = EditorState.createWithContent(contentState);

      this.setState({
        name: name,
        subject: subject,
        editorState: contEnteditorState,
      });
    }
  }

  componentWillUnmount() {
    this.props.initEditState();
  }

  onEditorStateChange = (editorState) => {
    const charactersBody = draftToHtml(convertToRaw(editorState.getCurrentContent())).length;
    this.setState({
      editorState,
      charactersBody
    });
  }

  onFieldsStateChange = (field) => {
    this.setState(field);
  }

  saveEmailTemplate = (e) => {
    e.preventDefault();
    const {editorState, name, subject} = this.state;
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.createEmailTemplate(name, subject, body);
  }

  cancelEmailTemplate = (e) => {
    e.preventDefault();
    this.props.cancelEmailTemplate();
  }

  render() {
    const {loading, history, isEdit} = this.props;
    const { editorState, name, subject } = this.state;

    return (
    (!loading) ?
      <Container>
        <Row className="m-b-30 m-t-30">
          <Col md={'12'}>
            <H1>
              <NavLINK to="/email-templates" className="m-r-10">
                <img src="/images/icons/ico-arrow-back.svg" />
              </NavLINK>
              {isEdit ? 'Edit' : 'Create'} Email Template
            </H1>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <form className="form custom">
              <Row>
                <Col xs={12}>
                  <FormGroup>
                    <LABEL>TEMPLATE NAME</LABEL>
                    <StyledInput
                      value={name}
                      type="text"
                      onChange={data => this.onFieldsStateChange({name: data.target.value})}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <FormGroup>
                    <LABEL>SUBJECT</LABEL>
                    <StyledInput
                      value={subject}
                      type="text"
                      onChange={data => this.onFieldsStateChange({subject: data.target.value})}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <FormGroup>
                    <LABEL>BODY</LABEL>
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
                  <PrimaryButton outline onClick={ (e) => this.cancelEmailTemplate(e) } className="m-r-20">
                    Cancel
                  </PrimaryButton>
                  <PrimaryButton onClick={(e) => this.saveEmailTemplate(e)}>
                    {isEdit ? 'Edit' : 'Create'} Template
                  </PrimaryButton>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      :
      <Loading />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createEmailTemplate: (name, subject, body) => {
    dispatch(createEmailTemplate(name, subject, body));
  },
});

export default connect(null, mapDispatchToProps)(AddTemplateForm);
