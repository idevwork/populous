import { Meteor } from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';
import { File } from 'meteor/populous:api';
import { invoiceDocumentTypes } from 'meteor/populous:constants';

const uploadContract = (acceptedFiles, fileType, currentInvoice) => {
  return (dispatch) => {
    if (acceptedFiles.length === 0) {
      return toastr.error('Error', 'Isn\'t the right format, please upload your invoice as PDF.');
    }

    const signedContract = acceptedFiles[0];
    const upload = File.insert(
      {
        file: signedContract,
        streams: 'dynamic',
        chunkSize: 'dynamic'
      },
      false
    );

    upload.on('end', function (error, fileObj) {
      if (error) {
        toastr.error('Error', error);
      } else {

        currentInvoice.callMethod('uploadContract', {
          [invoiceDocumentTypes[fileType]]: fileObj._id
        }, (error, response) => {
          if (error) {
            return toastr.error('Error', error.reason);
          }

          return toastr.success('Success', `Document (type ${invoiceDocumentTypes[fileType]}) have been updated`);
        });

      }
    });

    upload.start();
  };
};


export default uploadContract;
