import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';
import { Meteor } from 'meteor/meteor';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const APP_READY = 'APP_READY';
export const ACCOUNTS_USER_SUBSCRIPTION_READY = 'ACCOUNTS_USER_SUBSCRIPTION_READY';
export const ACCOUNTS_USER_SUBSCRIPTION_CHANGED = 'ACCOUNTS_USER_SUBSCRIPTION_CHANGED';
export const ACCOUNTS_USER_SUB = 'accounts.user';

const initialState = {
  currentUser: null,
  loading: true,
};

const app = (state = initialState, action) => {
  switch (action.type) {

    case SET_CURRENT_USER:
      return { ...state, currentUser: action.user };

    case APP_READY:
      return { ...state, loading: false };

    case ACCOUNTS_USER_SUBSCRIPTION_READY:
      return {...state, loading: !action.payload.ready};

    case ACCOUNTS_USER_SUBSCRIPTION_CHANGED:
      if(!action.payload[0] || (Meteor.userId() && action.payload[0] && Meteor.userId() == action.payload[0]._id)) {
        return {
          ...state,
          currentUser: action.payload[0]
        };
      }

    case STOP_SUBSCRIPTION:
      if (action.payload === ACCOUNTS_USER_SUB) {
        return {...state, currentUser: null};
      }

    default:
      return state;
  }
};

export default app;
