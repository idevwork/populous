export const SET_CONTRACT_TEMPLATE = 'SET_CONTRACT_TEMPLATE';

const initialState = {
  loading: true,
  template: null,
};

const contractTemplate = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTRACT_TEMPLATE:
      return { ...state };

    default:
      return state;
  }
};

export default contractTemplate;
