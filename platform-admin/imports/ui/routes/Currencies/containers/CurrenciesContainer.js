import { Meteor } from 'meteor/meteor';
import { Currency, LedgerLog } from 'meteor/populous:api';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { User } from 'meteor/populous:api';
import Currencies from "../components/currencies/Currencies";
import { getCurrencyBalance, ChangeHistoryCurrency, ChangeDatePeriod, ChangeSearchQuery,
   enableCurrency, deleteCurrency, } from "../modules/actions";

const reduxData = connect(
  state => ({...state.app, ...state.currenciesList}),
  (dispatch) => bindActionCreators({
    getCurrencyBalance, ChangeHistoryCurrency, ChangeDatePeriod, ChangeSearchQuery,
    enableCurrency, deleteCurrency
  }, dispatch)
);

const meteorData = withTracker(({historyFilters, currenciesBalance}) => {

  const handle = Meteor.subscribe('currencies');
  const resolver = Meteor.subscribe('ledgerLogs.populous');
  const loading = !handle.ready();
  const data = {
    loading,
    currencies: [],
    history: []
  };

  if (!loading ) {
    data.currencies = Currency.find({}).fetch();

    if (!currenciesBalance) {
      getCurrencyBalance();
    }
  }

  if(resolver.ready()){
    let query = {fromUserId: "Populous"};

    if(historyFilters.currency){
      query.fromCurrency = historyFilters.currency;
    }

    query.createdAt = {};
    if (historyFilters.fromDate) {
      query.createdAt.$gte = new Date(historyFilters.fromDate);
    }
    if (historyFilters.toDate) {
      query.createdAt.$lte =  new Date(historyFilters.toDate);
    }

    if(historyFilters.search) {
      const fullTextRegExp = new RegExp('.*' + historyFilters.search + '.*', 'i');
      query = {...query, ...{
        $or: [
          {_id: fullTextRegExp},
          {fromUserId: fullTextRegExp},
          {toUserId: fullTextRegExp},
          {fromValue: +historyFilters.search},
          {toValue: +historyFilters.search}
        ]
      }};
    }

    data.history = LedgerLog.find(query, {sort: { createdAt: -1 }}).fetch();
  }

  return data;
});

export default compose(reduxData, meteorData)(Currencies);
