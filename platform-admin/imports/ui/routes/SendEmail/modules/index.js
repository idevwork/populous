export const SHOW_EMAIL_FORM = 'SHOW_EMAIL_FORM';

const initialState = {
  emails: []
};

const sendEmail = (state = {...initialState}, action) => {
  const {type, payload} = action;

  switch (type) {
    case SHOW_EMAIL_FORM:
      return {
        ...state,
        emails: payload
      };
      break;
    default:
      return state;
  }
};


export default sendEmail;