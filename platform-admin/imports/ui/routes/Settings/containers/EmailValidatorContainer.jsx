import { Meteor } from 'meteor/meteor';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { EmailValidate } from 'meteor/populous:api';

import EmailValidator from '../components/EmailValidator';
import { saveEmailValidate, removeEmailValidate } from '../modules/actions';
import { SET_KEYWORD_VALIDATOR_TOOL_FILTER } from '../modules';

const mapStateToProps = ({settings}) => {
  return {
    settings
  };
};

const mapDispatchToProps = dispatch =>
  ({
    formActions: bindActionCreators({
      saveEmailValidate,
      removeEmailValidate
    }, dispatch),

    onKeywordChange: (keyword) => {
      dispatch({ type: SET_KEYWORD_VALIDATOR_TOOL_FILTER, payload: keyword })
    },
  });

const reduxData = connect(
  mapStateToProps,
  mapDispatchToProps
);

const meteorData = withTracker(({settings: {keywordValidatorTool}}) => {
  const emailValidateSubsc = Meteor.subscribe('emailValidate.all');
  let emailValidateData = [], query = {};
  if (emailValidateSubsc.ready()) {
    if (keywordValidatorTool) {
      const fullTextRegExp = new RegExp('.*' + keywordValidatorTool + '.*', 'i');
      query = {
        '$or': [
          {subject: fullTextRegExp},
          {url: fullTextRegExp}
        ]
      }
    }

    emailValidateData = EmailValidate.find(query).fetch();
  }

  return {
    loading: !emailValidateSubsc.ready(),
    emailValidateData
  };
});

export default compose(reduxData, meteorData)(EmailValidator);