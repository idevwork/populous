import {Meteor} from 'meteor/meteor';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';
import { EmailTemplate } from 'meteor/populous:api';

import TemplatesList from "../components/TemplatesList";
import EmailActions from "../modules/actions";

const reduxData = connect(
  state => ({...state.emailTemplatesList}),
  {
    ...EmailActions
  }
);

const meteorData = withTracker((state) => {
  
  let templates;
  let filter = {};
  if (state.keyword) {
    const fullTextRegExp = new RegExp('.*' + state.keyword + '.*', 'i');
    filter['$or'] = [
      {name: fullTextRegExp},
      {subject: fullTextRegExp}
    ];
  }

  const handle = Meteor.subscribe('email_template.all');
  // When the subscription is ready, find the templates
  if (handle.ready()) {

    // Find all of the pending templates
    templates = EmailTemplate.find(filter).fetch();
  }
  return {
    loading: !handle.ready(),
    templates
  }; 
});

// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(TemplatesList);
