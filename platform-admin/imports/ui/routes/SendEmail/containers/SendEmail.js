import {Meteor} from 'meteor/meteor';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';
import { EmailTemplate } from 'meteor/populous:api';
import {change} from 'redux-form';

import SendEmail from "../components/SendEmail";
import { sendEmail } from "../modules/actions";

const reduxData = connect(
  state => ({
    initialValues: {
      recepients: state.sendEmail.emails.join(', ')
    }
  }),
  (dispatch) => ({
    sendEmail: (title, body) => dispatch(sendEmail(title, body)),
    changeFieldValue: (field, value) => dispatch(change('SendEmail', field, value))
  })
);

const meteorData = withTracker((state) => {

  let templates;
  const handle = Meteor.subscribe('email_template.all');
  // When the subscription is ready, find the templates
  if (handle.ready()) {

    // Find all of the pending templates
    templates = EmailTemplate.find({systemName:{$exists: false}}).fetch();
  }
  return {
    loading: !handle.ready(),
    templates
  };
});

// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(SendEmail);
