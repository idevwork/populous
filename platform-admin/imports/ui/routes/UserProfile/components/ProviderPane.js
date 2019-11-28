import React, {Fragment} from "react";
import {Switch} from 'meteor/populous:ui';
import {userProviderPermissions} from 'meteor/populous:constants';
import {toastr} from 'react-redux-toastr';

import {H3, Mute, Small} from "../../../components/styled-components/Typography";


const ProviderPane = ({user}) => {

  const isProvider = user.isProvider();
  const isProviderPending = user.isProviderPending();
  const handler = (error) => {
    if(error){
      toastr.error('', error.reason);
    }
  };

  return (
    <Fragment>
      <div className={'d-flex justify-content-between'}>
        <H3>
          provider
        </H3>
        <div>
          <Small className="m-b-5">Account status:</Small>
          <div className="d-inline-flex align-items-center">
            <img src={user.isActive() ? '/images/icons/ico-check.svg' : '/images/icons/ico-in-progress.svg'}
                 className="m-r-10"/>
            {`${user.isActive() ? 'Active' : 'Suspended'}`}
          </div>
        </div>
      </div>

      <div className={'m-b-30'}>
        <div className={'d-flex align-items-center m-b-10'}>
          <Switch
            className={'m-r-10'}
            onChange={() => {
              user.callMethod('toggleProviderLogic', handler)
            }}
            checked={isProvider}
            disabled={isProviderPending}
          />
          Provider interface
        </div>
        { isProviderPending && <Mute className={'d-flex align-items-center m-b-'}>
          <img src={'/images/icons/ico-in-progress.png'} className={'m-r-10'} /> Activation request is in progress
        </Mute> }
        <Mute>
          Ability to buy and sell invoices on behalf of user clients.
        </Mute>
      </div>
      <div>
        <div className={'d-flex align-items-center  m-b-10'}>
          <Switch
            className={'m-r-10'}
            onChange={() => {
              user.callMethod('toggleProviderPermissions', userProviderPermissions.canRecord, handler)
            }}
            checked={isProvider && user.hasProviderPermissions(userProviderPermissions.canRecord)}
            disabled={!isProvider}
          /> External to blockchain
        </div>
        <Mute>
          Ability to record invoices which were sold outside of the platform on the blockchain.
        </Mute>
      </div>


    </Fragment>
  );
}


export default ProviderPane;
