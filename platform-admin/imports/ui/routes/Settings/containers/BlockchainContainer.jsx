import { Meteor } from 'meteor/meteor';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { BlockchainLog } from 'meteor/populous:api';
import { Config, configKeys } from 'meteor/populous:config';

import { updateBlockchain, updateBlockchainSignerKey, getBlockchainConfig, getBalanceOfAddress, checkActionStatus } from '../modules/actions';
import BlockchainIndex from '../components/Blockchain';

const mapStateToProps = ({ settings, app }) => {
  const {currentBlockchain, address, balance, actionStatus} = settings;
  return {
    form: {currentBlockchain, address, balance, actionStatus},
    ...app,
  };
};

const mapDispatchToProps = dispatch =>
  ({
    formActions: bindActionCreators({
      updateBlockchain,
      updateBlockchainSignerKey,
      getBlockchainConfig,
      getBalanceOfAddress,
      checkActionStatus
    }, dispatch)
  });

const reduxData = connect(
  mapStateToProps,
  mapDispatchToProps
);

const meteorData = withTracker(() => {
  const blockchainSubsc = Meteor.subscribe('blockchainLog.all');
  let blockchainLogs = [];

  if (blockchainSubsc.ready()) {
    blockchainLogs = BlockchainLog.find({}, { $sort: { createdAt: -1 } }).fetch();
  }

  return {
    loading: !blockchainSubsc.ready(),
    blockchainLogs
  };
});

export default compose(reduxData, meteorData)(BlockchainIndex);