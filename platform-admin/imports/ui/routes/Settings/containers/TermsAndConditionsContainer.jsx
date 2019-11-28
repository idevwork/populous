import { Meteor } from 'meteor/meteor';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { TermsAndConditions, createSectionTC } from 'meteor/populous:api';

import TermsAndConditionsComponent from '../components/TermsAndConditions';
import { removeSectionTC, saveSectionTC } from '../modules/actions';


const mapStateToProps = ({settings}) => {
  return {
    settings
  };
};

const mapDispatchToProps = dispatch =>
  ({
    formActions: bindActionCreators({
      removeSectionTC,
      saveSectionTC
    }, dispatch)
  });

const reduxData = connect(
  mapStateToProps,
  mapDispatchToProps
);

const meteorData = withTracker(() => {
  const termsAndConditionsSubsc = Meteor.subscribe('termsAndConditions');

  let termsAndConditions = [], lastUpdate;

  if (termsAndConditionsSubsc.ready()) {
    termsAndConditions = TermsAndConditions.find({}, { sort: {position: 1} }).fetch();
    lastUpdate = new TermsAndConditions().getLastUpdate();
  }

  return {
    loading: !termsAndConditionsSubsc.ready(),
    termsAndConditions,
    lastUpdate
  };
});

export default compose(reduxData, meteorData)(TermsAndConditionsComponent);