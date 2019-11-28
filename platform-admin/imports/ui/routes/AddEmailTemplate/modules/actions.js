import { toastr } from 'react-redux-toastr';
import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';
import { EmailTemplate } from 'meteor/populous:api';

import { SHOW_CREATE_TEMPLATE, SHOW_EDIT_TEMPLATE, INIT_EDIT_STATE } from "./";

export const createEmailTemplate = (name, subject, body) => {
  return (dispatch, getState) => {
    const { newEmailTemplate } = getState();

    if (newEmailTemplate.isEdit) {
      const template = newEmailTemplate.template;
      template.updateTemplate({name, subject, body}, (err, newTemplate) => {
        if (err) {
          toastr.error('Error', err.reason);
        } else {
          toastr.success('Success', 'Email template have been updated');
          dispatch(initEditState());
          dispatch(push('/email-templates'));
        }
      });
    } else {
      const template = new EmailTemplate({
        name,
        subject,
        body
      });

      template.create((err, newTemplate) => {
        if (err) {
          toastr.error('Error', err.reason);
        } else {
          toastr.success('Success', 'New email template have been created');
          dispatch(initEditState());
          dispatch(push('/email-templates'));
        }
      });
    }  	
  };
}

export const cancelEmailTemplate = () => {
  return (dispatch, getState) => {
    dispatch(initEditState());
    dispatch(push('/email-templates'));
  };
}

export const initEditState = () => {
  return {
    type: INIT_EDIT_STATE
  }
}

export const showCreateTemplate = () => {
  return {
    type: SHOW_CREATE_TEMPLATE
  }
}

export const showEditTemplate = (template) => {
  return {
    type: SHOW_EDIT_TEMPLATE,
    payload: template
  }
}