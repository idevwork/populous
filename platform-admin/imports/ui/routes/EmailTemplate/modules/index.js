export const SET_KEYWORD_FILTER = 'SET_KEYWORD_FILTER';
export const DELETE_EMAIL_TEMPLATE = 'DELETE_EMAIL_TEMPLATE';
export const CLOSE_DELETE_MODAL = 'CLOSE_DELETE_MODAL';

const initialState = {
  keyword: '',
  template: null,
  showDelete: false
};

const emailTemplatesList = (state = {...initialState}, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_KEYWORD_FILTER:
      return {
        ...state,
        keyword: payload
      };
      break;
    case DELETE_EMAIL_TEMPLATE:
      return {
        ...state,
        template: payload,
        showDelete: true
      };
      break;
    case CLOSE_DELETE_MODAL:
      return {
        ...state,
        showDelete: false
      }
    default:
      return state;
  }
};


export default emailTemplatesList;