import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { User, Bank } from 'meteor/populous:api';
import BankAccount from '../components/BankAccount';
import { changeBank } from '../modules/actions';

const reduxData = connect(
  state => ({ ...state.userProfile }),
  dispatch => ({
    changeBank: (bank) => dispatch(changeBank(bank)),
  })
);

const meteorData = withTracker((state) => {
  const userId = state.userId;
  if(!userId) {
    return {
      loading: true
    };
  }
  const handler = Meteor.subscribe('bank.user', userId);
  const bankAccounts = Bank.find({ userId }).fetch();
  let selectedBank = null;
  if (state.selectedBankId) {
    selectedBank = Bank.findOne(state.selectedBankId);
  }

  return {
    loading: !handler.ready(),
    bankAccounts: bankAccounts,
    selectedBank: selectedBank
  };
});

export default compose(reduxData, meteorData)(BankAccount);
