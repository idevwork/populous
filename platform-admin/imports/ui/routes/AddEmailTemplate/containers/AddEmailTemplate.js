import {Meteor} from 'meteor/meteor';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';
import { EmailTemplate } from 'meteor/populous:api';

import AddEmailTemplate from "../components/AddEmailTemplate";
import EmailActions from "../modules/actions";

export default connect(
  state => ({
    initialValues: state.newEmailTemplate.template,
    isEdit: state.newEmailTemplate.isEdit
  }),
  {
    ...EmailActions
  }
)(AddEmailTemplate);
