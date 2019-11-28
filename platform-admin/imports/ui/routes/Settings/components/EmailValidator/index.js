import React, {Fragment} from 'react';
import {Row, Col} from 'reactstrap';
import {Field, reduxForm,} from 'redux-form';

import {H3, P, Mute, Lead} from "../../../../components/styled-components/Typography";
import Loading from '../../../../components/Loading';
import {PrimaryButton} from '../../../../components/styled-components/Buttons';
import {renderInputReactstrap} from '../../../../form-helpers/renderFields';
import EmailsTable from "./EmailsTable";
import EditorModal from './EditorModal';

const initialState = {
  dataModal: null,
  showModal: false,
};

class EmailValidator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };
  }

  toggleModal = (targetObject) => {
    this.setState({
      dataModal: this.state.showModal ? null : targetObject,
      showModal: !this.state.showModal,
    });
  };


  render() {
    const {loading, emailValidateData, handleSubmit, formActions, onKeywordChange} = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Fragment>
        <Row>
          <Col>
            <H3>EMAIL VALIDATOR TOOL</H3>
          </Col>
        </Row>

        <form onSubmit={handleSubmit} className="form custom">
          <Row className="m-0 m-t-20 m-b-20 p-0">
            <Col className="p-0" xs="12">
              <P>Add Populous newsletter emails below to track them in the email validator tool.</P>
            </Col>
            <Col className="p-l-0 p-r-30" xs="12" lg="4" xl="5">
              <Field
                name="subject"
                type="string"
                label="Email Subject"
                required="true"
                placeholder=""
                component={renderInputReactstrap}
              />
            </Col>
            <Col className="p-l-0 p-r-30" xs="12" lg="4" xl="5">
              <Field
                name="url"
                type="string"
                label="URL to email"
                required="true"
                placeholder=""
                component={renderInputReactstrap}
              />
              <Mute className="m-t-5">Given by aweber.com</Mute>
            </Col>
            <Col className="p-0" xs="12" lg="4" xl="2">
              <PrimaryButton onClick={this.handleSubmit} style={{padding: '13px 40px'}} className="m-t-20">
                ADD
              </PrimaryButton>
            </Col>
          </Row>
        </form>

        <Row>
          <Col>
            <Lead>Emails added</Lead>
            <EmailsTable
              emails={emailValidateData}
              toggleModal={this.toggleModal}
              removeEmailValidate={formActions.removeEmailValidate}
              onKeywordChange={onKeywordChange}
            />
          </Col>
        </Row>

        { this.state.dataModal &&
          <EditorModal
            isOpen={this.state.showModal}
            toggle={this.toggleModal}
            dataModal={this.state.dataModal}
            formActions={formActions}
          />
        }

      </Fragment>
    )
  }
}


const formName = 'EmailValidatorForm';

export default reduxForm({
  form: formName,
  onSubmit: (values, dispatch, props) => {
    const {url, subject} = values;
    props.formActions.saveEmailValidate({url, subject});
  }
})(EmailValidator);
