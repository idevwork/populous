import React, { Component } from 'react';

import { H3, } from '../../../components/styled-components/Typography/index';
import InnerLoading from '../../../components/InnerLoading/index';
import ActivityLogTable from './ActivityLogTable';
import ActivityLogModal from './ActivityLogModal';
import {filterKeys} from "./constants";


const initialState = {
  activityLog: null,
  activityModal: false,
};

class ActivityLogs extends Component {
  state={...initialState};

  toggleModal = (activityLog = null) => {
    const {activityModal} = this.state;

    const newState = {
      ...initialState
    };

    if(!activityModal){
      newState.activityLog = activityLog;
      newState.activityModal = true;
    }

    this.setState(newState);
  }

  render() {
    const {
      loading,
      activityLogs,
      filters,
      updateActivityFilter
    } = this.props;

    if(loading) {
      return <InnerLoading />;
    }
    return (
      <div>
        <H3 className="m-b-20">Activity Log</H3>
        <ActivityLogTable
          logs={activityLogs}

                          activity={filters[filterKeys.activity]}
          onActivityChange={updateActivityFilter.bind(undefined, filterKeys.activity)}
                          keyword={filters[filterKeys.keyword]}
          onKeywordChange={updateActivityFilter.bind(undefined, filterKeys.keyword)}
          dates={filters[filterKeys.dateRange]}
          onDatesChange={updateActivityFilter.bind(undefined, filterKeys.dateRange)}

          toggleModal={this.toggleModal}
        />
        <ActivityLogModal isOpen={this.state.activityModal} toggle={this.toggleModal} activityLog={this.state.activityLog} />
      </div>
    );
  }

}


export default ActivityLogs;
