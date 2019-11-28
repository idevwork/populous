import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';

const mapStateToProps = ({ app }) => ({
  currentUser: app.currentUser,
});

export default connect(mapStateToProps)(Dashboard);
