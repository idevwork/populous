export const SHOW_CREATE_TEMPLATE = 'SHOW_CREATE_TEMPLATE';
export const SHOW_EDIT_TEMPLATE = 'SHOW_EDIT_TEMPLATE';
export const INIT_EDIT_STATE = 'INIT_EDIT_STATE';

const initialState = {
  template: null,
  isEdit: false
};

const newEmailTemplate = (state = {...initialState}, action) => {
  const {type, payload} = action;

  switch (type) {
    case SHOW_CREATE_TEMPLATE:
      return {
        ...initialState,
        isEdit: false
      };
      break;

    case SHOW_EDIT_TEMPLATE:
      return {
        ...state,
        template: payload,
        isEdit: true
      };
      break;
    case INIT_EDIT_STATE:
      return {
        ...state,
        template: null,
        isEdit: false
      };
    default:
      return state;
  }
};


export default newEmailTemplate;