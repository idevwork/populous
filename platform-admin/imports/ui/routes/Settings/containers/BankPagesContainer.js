import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import BankPages from '../components/BankPages';
import { loadTransactionsForAccount } from '../modules/actions';
import { Config, configKeys} from 'meteor/populous:config';

const reduxData = connect(
  state => ({ transactions: state.settings.transactions }),
  {loadTransactionsForAccount}
);

const meteorData = withTracker(() => {
  const handler = Meteor.subscribe('config.all');
  const tideConfig = Config.findOne({ key: configKeys.tide });

  return {
    loading: !handler.ready(),
    tideConfig: tideConfig
  };
});

export default compose(reduxData, meteorData)(BankPages);
