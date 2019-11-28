import { toastr } from 'react-redux-toastr';
import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';

import { SHOW_EMAIL_FORM } from "./";

export const sendEmail = (title, body) => {
  return (dispatch, getState) => {
    const emails = getState().sendEmail.emails;
    emails.map((email) => {
    	Meteor.call(
	      'sendEmail',
	      email,
	      title,
	      body
	    );
    });
    toastr.success('Success', 'Sent email successfully');
    dispatch(push('/users'));
  };
}

export const showEmailForm = (emails) => {
  return {
    type: SHOW_EMAIL_FORM,
    payload: emails || []
  }
}
