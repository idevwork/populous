import { toastr } from 'react-redux-toastr';
import { Meteor } from 'meteor/meteor';
import { EmailTemplate } from 'meteor/populous:api';
import { push } from 'react-router-redux';

import { SET_KEYWORD_FILTER, DELETE_EMAIL_TEMPLATE, CLOSE_DELETE_MODAL } from "./index";
import { showEditTemplate } from '../../AddEmailTemplate/modules/actions'

const onKeywordChange = (keyword) => {
  return { type: SET_KEYWORD_FILTER, payload: keyword };
}

const deleteTemplate = (id) => {
	return (dispatch, getState) => {
		const { emailTemplatesList: {template} } = getState();

    if(template.systemName){
      return;
    }

		template.delete((err, result) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'Email template have been deleted');
        dispatch(closeDeleteModal());
      }
    });
	}
}

const editTemplate = (newData) => {
	return (dispatch, getState) => {
		dispatch(showEditTemplate(newData));
		dispatch(push('/add-email-template'));
	}
}

const onDelete = (template) => {
	return { type: DELETE_EMAIL_TEMPLATE, payload: template };
}

const closeDeleteModal = () => {
	return { type: CLOSE_DELETE_MODAL };
}

export default {
  onKeywordChange,
  deleteTemplate,
  editTemplate,
  onDelete,
  closeDeleteModal
};