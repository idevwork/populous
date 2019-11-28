import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { User } from 'meteor/populous:api';
import UserProfile from '../components/UserProfile';
import { setActiveTab, reset } from '../modules/actions';
import { USER_PROFILE_TAB_GENERAL, USER_PROFILE_TAB_ACTIVITY } from '../modules';

const reduxData = connect(
  state => ({ ...state.app, ...state.router, ...state.userProfile }),
  dispatch => ({
    setActiveTab: (tab) => dispatch(setActiveTab(tab)),
    reset: (userId) => dispatch(reset(userId))
  })
);

const meteorData = withTracker(({setActiveTab, userId, activeTab, location:{state}}) => {
  const handler = Meteor.subscribe('accounts.user-kyc', userId);
  const user = User.findOne({ _id: userId });

  if (!activeTab && state === 'ActivityLog') {
    setActiveTab(USER_PROFILE_TAB_ACTIVITY);
  } else if (!activeTab && user) {
    setActiveTab(USER_PROFILE_TAB_GENERAL);
  }

  return {
    loading: !handler.ready(),
    userId,
    user
  };
});

export default compose(reduxData, meteorData)(UserProfile);
