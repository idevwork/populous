import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PasswordResetForm from '../components/PasswordResetForm';
import { resetPassword } from '../modules/actions';

export default compose(
  connect(null, { resetPassword }),
  withRouter
)(PasswordResetForm);
