import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toastr } from 'react-redux-toastr';

import { LinkButton } from '../../../components/styled-components/Buttons';

const TransitionCard = (props) => {
  const { user, toggle, bid } = props;

return  (<tr key={user.id}>
    <td scope="row">
      <div className="d-flex align-items-center p-r-10">
        <CopyToClipboard
          text={user.ethAddress}
          onCopy={()=>toastr.success('successfully copied to clipboard')}
        >
          <img src="/images/icons/clipboard.png" width="19" height="23" style={{cursor: 'pointer'}} />
        </CopyToClipboard>
      </div>
    </td>
    <td>{ user.id }</td>
    <td>{ user.type }</td>
    <td>{ user.description }</td>
    <td>{ user.created_at }</td>
    <td>{ user.status }</td>
    <td><LinkButton onClick={toggle}>View</LinkButton></td>
  </tr>)
};

export default TransitionCard;
