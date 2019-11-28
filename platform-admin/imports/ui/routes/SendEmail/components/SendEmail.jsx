import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row, FormGroup, Input } from 'reactstrap';
import { NavLink as NavLINK } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { H1, LABEL } from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import { sendEmail } from '../modules/actions';
import { StyledInput } from "../../../components/styled-components/Inputs";
import Loading from "../../../components/Loading";

const wrapperStyle = {
  marginTop: 20,
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

class SendEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      subject: '',
      charactersBody: 0,
      recepients: ''
    };
  }

  componentWillMount() {
    if(this.props.initialValues) {
      const {recepients} = this.props.initialValues;
      this.setState({
        recepients: recepients
      });
    }
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

  sendEmail = (e) => {
    e.preventDefault();
    const {editorState, subject} = this.state;
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.sendEmail(subject, body);
  }

  render() {
    const {	loading, history, templates } = this.props;
    const { editorState, subject, recepients } = this.state;

    let options = [], _templates = [];
    if(templates) {
      templates.map((template) => {
        options[template._id] = template.name;
        _templates[template._id] = template;
      });
    }

    const onTemplateChange = (event) => {
      if(event.nativeEvent.target.value) {
        const selectedTemplate = _templates[event.nativeEvent.target.value];

        this.onFieldsStateChange({subject: selectedTemplate.subject});

        if(selectedTemplate.body) {
          const charactersBody = selectedTemplate.body.length;
          this.onFieldsStateChange({charactersBody: charactersBody});

          const blocksFromHtml = htmlToDraft(selectedTemplate.body);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
          const contentEditorState = EditorState.createWithContent(contentState);

          this.onFieldsStateChange({editorState: contentEditorState});
        }
      }
    };

    return(
      (!loading) ?
        <Container>
          <Row className="m-b-30 m-t-30">
            <Col md={'12'}>
              <H1>
                <NavLINK to="/users" className="m-r-10">
                  <img src="/images/icons/ico-arrow-back.svg" />
                </NavLINK>
                Send Email
              </H1>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <form className="form custom multi">
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <LABEL>RECEPIENTS</LABEL>
                      <StyledInput
                        value={recepients}
                        type="text"
                        placeholder="Recepients"
                        style={{backgroundColor: 'transparent'}}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <LABEL>SELECT TEMPLATE</LABEL>
                      <Input
                        name="template"
                        type="select"
                        style={{marginTop: '-5px'}}
                        onChange={onTemplateChange}
                      >
                        <option value="">Select...</option>
                        {Object.keys(options).map(c =>
                          <option key={c} value={c}>
                            {options[c]}
                          </option>
                        )}
                      </Input>
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
                        placeholder=""
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
                    <PrimaryButton outline onClick={ () => { history.push('/users') } }>
                      Cancel
                    </PrimaryButton>
                    <PrimaryButton onClick={this.sendEmail} disabled={(!this.state.subject.length || this.state.charactersBody < 9)}>
                      Send Email
                    </PrimaryButton>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
        :
        <Loading />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  sendEmail: (subject, body) => {
    dispatch(sendEmail(subject, body));
  },
});

export default connect(null, mapDispatchToProps)(SendEmail);
