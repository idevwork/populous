import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { User, File } from 'meteor/populous:api';

import CustomerProfile from '../components/CustomerProfile';
import { closePdfPreview, openPdfPreview} from '../modules/actions';

const reduxData = connect(
  state => ({ ...state.userProfile }),
  dispatch => ({
    closePdfPreview: () => dispatch(closePdfPreview()),
    openPdfPreview: (fileId, fileType, ownerId) => dispatch(openPdfPreview(fileId, fileType, ownerId)),
  })
);

const meteorData = withTracker((state) => {
  const { userId } = state;
  if(!userId) {
    return {
      loading: true
    };
  }
  const handler = Meteor.subscribe('accounts.user-kyc', userId);
  const user = User.findOne({ _id: userId });
  let bankStatementDocuments = (user.bankStatementDocumentIds || []).map((id) => {
    return File.findOne({_id: id})
  });
  bankStatementDocuments = bankStatementDocuments.filter(file => !!file);
  let idDocuments = (user.idDocumentIds || []).map((id) => {
    return File.findOne({_id: id})
  });
  idDocuments = idDocuments.filter(file => !!file);
  let addressDocuments = (user.addressDocumentIds || []).map((id) => {
    return File.findOne({_id: id})
  });
  addressDocuments = addressDocuments.filter(file => !!file);
  let livePhotoDocument = (user.livePhotoIds || []).map((id) => {
    return File.findOne({_id: id})
  });
  livePhotoDocument = livePhotoDocument.filter(file => !!file);

  return {
    loading: !handler.ready(),
    user,
    bankStatementDocuments,
    idDocuments,
    addressDocuments,
    livePhotoDocument
  };
});

export default compose(reduxData, meteorData)(CustomerProfile);
