import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink as NavLINK } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { H1 } from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons';

const wrapperStyle = {
  border: '1px solid #c9c9c9',
  borderBottomWidth: '2px'
};
const editorStyle = {
  padding: '5px 10px',
  height: 250,
  width: '100%',
};
const toolbarStyle = {
  background: '#ffffff',
  borderTop: '4px solid #333',
  borderBottom: '2px solid #c9c9c9',
};

class ContractTemplateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.saveContractTemplate = this.saveContractTemplate.bind(this);
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }
  saveContractTemplate = () => {
    const { editorState } = this.state;
    this.props.CreateContractTemplate({template: draftToHtml(convertToRaw(editorState.getCurrentContent()))});
  }
  componentWillReceiveProps = (nextProps) => {
    const blocksFromHtml = htmlToDraft(nextProps.template);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({
      editorState,
    });
  }
  render() {
    const { editorState } = this.state;
    const {history} = this.props;
    return (
      <Container>
        <Row className="m-b-30 m-t-30">
          <Col>
            <H1>
              <NavLINK to="/invoices" className="m-r-10">
                <img src="/images/icons/ico-arrow-back.svg" />
              </NavLINK>
              Contract Template
            </H1>
          </Col>
        </Row>
        <Row className="m-t-50 justify-content-center">
          <Col className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbar"
              wrapperClassName="wrapper"
              editorClassName="editor"
              onEditorStateChange={this.onEditorStateChange}
              toolbar={{
               options: ['history', 'blockType', 'fontSize', 'fontFamily', 'inline', 'list', 'textAlign', 'link', 'image'],
                inline: {options:['bold', 'italic']}
              }}
              wrapperStyle={wrapperStyle}
              editorStyle={editorStyle}
              toolbarStyle={toolbarStyle}
            />
          </Col>
        </Row>
        <Row className="m-t-30">
          <Col className="text-center">
            <PrimaryButton outline onClick={()=>{history.push('/invoices')}}>Cancel</PrimaryButton>
            <PrimaryButton onClick={this.saveContractTemplate}>Save</PrimaryButton>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ContractTemplateComponent;
