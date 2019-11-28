import { Meteor } from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';
import { File } from 'meteor/populous:api';
import {invoiceDocumentTypes} from 'meteor/populous:constants';

// This thunk is called when the user wants to download
// the contract PDF signature file.
const getSignedContract = (invoice) => {
  return (dispatch) => {
    if (!invoice) {
      toastr.error('Error', 'No invoice found. Please refresh the page');
      return;
    }
    const contract = File.findOne({_id: invoice.documents[invoiceDocumentTypes.offer]});
    if (!contract) {
      toastr.error('Error', 'Signed contract is not found');
      return;
    }
    // Create a fake element and start the download
    const element = document.createElement('a');
    document.body.appendChild(element);
    element.setAttribute('href', contract.link() + '?download=true');
    element.setAttribute('download', contract.name);
    element.setAttribute('target', '_parent');
    element.setAttribute('type', contract.type);
    element.style.display = '';
    element.click();
    document.body.removeChild(element);
  };
};

export default getSignedContract;
