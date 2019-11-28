import {Meteor} from 'meteor/meteor';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {ActivityLog} from 'meteor/populous:api';
import {invoiceStatuses} from 'meteor/populous:constants';
import {withTracker} from 'meteor/react-meteor-data';
import moment from 'moment';

import ActivityLogs from "./ActivityLogs";
import {updateActivityFilter} from '../modules/actions';
import {filterKeys} from "./constants";

const reduxData = connect(
  ({userProfile: {userId, activityFilters}}) => ({
    userId,
    filters: {...activityFilters}
  }),
  {
    updateActivityFilter
  }
);

const meteorData = withTracker(({userId, filters}) => {
  const activityLogsHandler = Meteor.subscribe('activityLog.user', userId);
  const subscriptionReady = activityLogsHandler.ready();
  let activityLogs = [];

  if (subscriptionReady) {
    const query = {userId};
    const activityFilter = filters[filterKeys.activity];
    const keywordFilter = filters[filterKeys.keyword];
    const {startDate, endDate} = filters[filterKeys.dateRange] || {};

    if (!!activityFilter) {
      query.type = activityFilter;
    }

    const dateFilter = {};

    if(startDate){
      dateFilter.$gte= startDate.startOf('day').toDate();
    }

    if(endDate){
      dateFilter.$lte= endDate.startOf('day').toDate();
    }

    if(Object.keys(dateFilter).length){
      query.createdAt = dateFilter;
    }

    activityLogs = ActivityLog
      .find(query, {sort: {createdAt: -1}})
      .fetch();
  }

  return {
    loading: !subscriptionReady,
    activityLogs
  };
});

export default compose(reduxData, meteorData)(ActivityLogs);
