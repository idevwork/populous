import { push } from 'react-router-redux';

const redirectToActivityLogs = (userId) => {
  return (dispatch) => {
    dispatch(push('/users/' + userId, 'ActivityLog'));
  }
};

export default redirectToActivityLogs;
