import { Meteor } from 'meteor/meteor';
import {push} from 'react-router-redux';
import store from '../../store';
import { SET_CURRENT_USER } from "../wrappers/PrivateApp/modules/index";

export default {
  logout(event) {
    event.preventDefault();
    Meteor.logout(err => {
      if (err) {
        // TODO: Handle error
      } else {
        store.dispatch({type: SET_CURRENT_USER, user: null});
        store.dispatch(push('/login'));
      }
    })
  },
}