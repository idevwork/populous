import {Meteor} from 'meteor/meteor';
import { ContractTemplate } from 'meteor/populous:api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import ContractTemplateComponent from '../components/ContractTemplate';
import CreateContractTemplate from "../modules/actions";

const reduxData = connect(
    state => ({...state.app, ...state.template}),
    {
        CreateContractTemplate
    }
);

const meteorData = withTracker((state) => {
    const handle = Meteor.subscribe('contractTemplate');
    const loading = !handle.ready();
    const data = {
        loading,
        template: ''
    };

    if (!loading) {
      if (ContractTemplate.find({}, { sort: { updatedAt: -1 }, limit: 1 }).count() == 1) {
        data.template = ContractTemplate.find({}, { sort: { updatedAt: -1 }, limit: 1 }).fetch()[0].template;
      }
    }

    return data;
});

export default compose(reduxData, meteorData)(ContractTemplateComponent);
