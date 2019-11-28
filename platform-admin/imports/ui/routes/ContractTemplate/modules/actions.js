import { SET_CONTRACT_TEMPLATE } from "./index";
import { toastr } from 'react-redux-toastr';
import { Meteor } from 'meteor/meteor';
import { ContractTemplate } from 'meteor/populous:api';


const CreateContractTemplate = values => {
  return (dispatch, getState) => {
    const contractTemplate = new ContractTemplate({
        template: values.template
    });
    contractTemplate.create((err, template) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Successfully Saved');
        dispatch({
          type: SET_CONTRACT_TEMPLATE,
          template: template
        });
      }
    });
  }
}

export default CreateContractTemplate;