import {Meteor} from 'meteor/meteor';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';
import {User} from 'meteor/populous:api';
import { sessionService } from 'redux-react-session'


import TransactionsList from "../components/TransactionsList";
import TransactionActions from "../modules/actions";
import {transactionsSort} from "../modules/constants";
import store from "../../../../store/index";
const RECORDS_PER_PAGE = 10;

const reduxData = connect(
  state => ({...state.app, ...state.TransactionsList}),
  {
    ...TransactionActions
  }
);

const meteorData = withTracker((state) => {
  const {sortBy, email_changed, firstNameChanged, lastNameChanged} = state.filters;
  let sort = transactionsSort[sortBy];
  if (!sort)
    sort = {column: 'First-Name-Ascending'};
  let transactions;
  transactions = [
    {id: 123456788, ethAddress: '0x1J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '02-06-2007, 9:20 am', status: 'Pending' },
    {id: 123456789, ethAddress: '0x2J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '22-11-2017, 8:13 pm', status: 'Completed' },
    {id: 123456790, ethAddress: '0x3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '03-01-2018, 11:22 pm', status: 'Pending' },
    {id: 123456788, ethAddress: '0x4J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '02-06-2007, 9:20 am', status: 'Pending' },
    {id: 123456789, ethAddress: '0x5J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '22-11-2017, 8:13 pm', status: 'Completed' },
    {id: 123456790, ethAddress: '0x6J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '03-01-2018, 11:22 pm', status: 'Pending' },
    {id: 123456788, ethAddress: '0x7J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '02-06-2007, 9:20 am', status: 'Pending' },
    {id: 123456789, ethAddress: '0x8J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '22-11-2017, 8:13 pm', status: 'Completed' },
    {id: 123456790, ethAddress: '0x9J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '03-01-2018, 11:22 pm', status: 'Pending' },
    {id: 123456788, ethAddress: '0x0J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '02-06-2007, 9:20 am', status: 'Pending' },
    {id: 123456789, ethAddress: '0x1J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '22-11-2017, 8:13 pm', status: 'Completed' },
    {id: 123456790, ethAddress: '0x2J98t1WpEZ73CNmQviecrnyiWrnqRhWNLyEZ73CNmQviecrnyiWrnqRhWNLy', type: 'Token creation', description: 'GBP token creation', created_at: '03-01-2018, 11:22 pm', status: 'Pending' },
  ];

  return {
    // loading: !handle.ready(),
    transactions,
  };
});

// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(TransactionsList);
