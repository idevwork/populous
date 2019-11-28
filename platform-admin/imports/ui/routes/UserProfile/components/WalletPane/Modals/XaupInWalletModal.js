import React from 'react';
import moment from 'moment';
import {Table, Modal, ModalHeader, ModalBody } from 'reactstrap';

import floor from "../../../../../../helpers/formatters/floor";
import {WrapperTable} from './WrapperTable';


const XaupInWalletModal = ({ showXaupModal, toggleModal, xaupBlockchainActions = []}) => {
  const renderRow = (blockchainActions) => {
    const { _id, amount, createdAt } = blockchainActions;
    return (
      <tr key={_id}>
        <td className="text-left">{_id}</td>
        <td className="text-right">{floor(amount.xau)}</td>
        <td className="text-center">{moment(createdAt).format('DD-MM-YYYY')}</td>
        <td className="text-center">{moment(createdAt).format('DD-MM-YYYY')}</td>
      </tr>
    );
  };

  return (
    <Modal isOpen={showXaupModal} toggle={()=>{toggleModal('showXaupModal')}} className="custom modal-lg">
      <ModalHeader toggle={() => toggleModal('showXaupModal')}>XAUP IN THE WALLET</ModalHeader>
      <ModalBody>
        {
          xaupBlockchainActions.length
          ?
            <WrapperTable>
              <Table responsive className="custom border-table" style={{ overflow: 'hidden' }}>
                <thead>
                <tr>
                  <th className="text-left">ID</th>
                  <th className="text-right">Amount</th>
                  <th className="text-center">Date of deposit</th>
                  <th className="text-center">Date of availability for withdrawal</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {xaupBlockchainActions.map(renderRow)}
                </tbody>
              </Table>
            </WrapperTable>
          :
          <div className="p-t-20 p-b-20 text-center">
            You do not have any XAUp
          </div>
        }
      </ModalBody>
    </Modal>
  );
};

export default XaupInWalletModal;
