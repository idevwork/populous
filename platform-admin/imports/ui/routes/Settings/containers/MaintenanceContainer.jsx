import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { withTracker } from 'meteor/react-meteor-data';
import { connect  } from 'react-redux';
import { Maintenance } from 'meteor/populous:api';
import { default as MaintenanceComponent } from "../components/Maintenance";
import { deleteClosest } from '../modules/actions';

const reduxData = connect(
  state => ({ ...state.settings }),
  dispatch => ({
    deleteClosest: (document) => dispatch(deleteClosest(document))
  })
);

const meteorData = withTracker(({ activities }) => {
  let completedList = [];
  let closest;
  const subscription = Meteor.subscribe('maintenance.completed');
  const subscriptionClosest = Meteor.subscribe('maintenance.closest');

  if(subscriptionClosest.ready()){
    closest =  Maintenance.findOne({ isCompleted: false });
  }

  if (subscription.ready()) {
    completedList = Maintenance.find({ isCompleted: true }).fetch();
  }
  return {
    completedList,
    closest
  };
});

export default compose(reduxData, meteorData)(MaintenanceComponent);
