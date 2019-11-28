import { Meteor } from 'meteor/meteor';
import { compose, bindActionCreators } from 'redux';
import { connect  } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { User } from 'meteor/populous:api';
import { setActiveTab, reset } from '../modules/actions';
import SettingsComponent from "../components/SettingsComponent";

const reduxData = connect(
  state => ({ ...state.settings }),
  dispatch => {
    return bindActionCreators({setActiveTab,}, dispatch);
  }
);


export default reduxData(SettingsComponent);
