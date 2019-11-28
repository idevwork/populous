import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { ExternalAddress, User } from 'meteor/populous:api';

import ExternalWallet from '../components/ExternalWallets';
import {toggleWalletAddressEdit, selectExternalAddress,
  toggleAddWalletAddress, initWalletAddresses
} from '../modules/actions';
import { addWalletAddress, editWalletAddress, removeWalletAddress } from '../modules/wallet-external-address';

import requireConfirmation from '../../../components/ConfirmModal/modules/actions';

const mapStateToProps = ({ app, userProfile }) => ({
  currentUser: app.currentUser,
  showWalletAddressEdit: userProfile.showWalletAddressEdit,
  showAddWalletAddress: userProfile.showAddWalletAddress,
  selectedExternalAddressId: userProfile.selectedExternalAddressId,
  profileId: userProfile.userId,
});

const mapDispatchToProps = dispatch => ({
  toggleAddWalletAddress: (open) => dispatch(toggleAddWalletAddress(open)),
  toggleWalletAddressEdit: (open) => dispatch(toggleWalletAddressEdit(open)),
  removeWalletAddress: (address) => dispatch(
    requireConfirmation(removeWalletAddress, {
      text: `Are you sure you want to delete the address ${address.address || address.newAddress} ?`
    })(address)),
  editWalletAddress: (address, newAddress) => dispatch(editWalletAddress(address, newAddress)),
  addWalletAddress: (address, name) => dispatch(addWalletAddress(address, name)),
  selectExternalAddress: id => dispatch(selectExternalAddress(id)),
  initWalletAddresses: () => dispatch(initWalletAddresses())
});

const reduxData = connect(
  mapStateToProps,
  mapDispatchToProps
);

// Subscribe to the meteor db and init the store
const meteorData = withTracker(({currentUser, selectedExternalAddressId, ...state}) => {
  const userId = state.profileId || currentUser._id;
  const user = User.findOne(userId);
  const externalAddressUserId = state.isAdmin ? 'Populous' : userId;
  const handler = Meteor.subscribe('externalAddress.user', externalAddressUserId);
  let externalsAddresses = [];
  let selectedAddresses = null;
  const handlerReady = handler.ready();

  if(handlerReady){
    externalsAddresses = ExternalAddress.find({userId: externalAddressUserId}).fetch()
  }

  if (externalsAddresses.length) {
    externalsAddresses.forEach((address) => {
      if (address.newAddress && address.isActive()) {
        address.callMethod('confirmationAddress');
      }
      if (selectedExternalAddressId && selectedExternalAddressId === address._id) {
        selectedAddresses = address;
      }
    });

  }

  // We have to return an object for withTracker to work
  return {
    loading: !handlerReady,
    externalsAddresses: externalsAddresses,
    selectedAddresses: selectedAddresses
  };
});


// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(ExternalWallet);
