import React from 'react';
import moment from 'moment';
import { Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { DepositLog } from 'meteor/populous:api';

import floor from "../../../../../../helpers/formatters/floor";
import {WrapperTable} from './WrapperTable';


const CollateralModal = ({showCollateralModal, toggleModal, depositLedgerLogs = [], currencies = []}) => {
  const currencySymbolToTitle = {};

  currencies.forEach(currency => {
    currencySymbolToTitle[currency.symbol] = currency.title;
  });

  const renderRow = (depositLedgerLog) => {
    const { _id, fromValue, toCurrency, toValue, createdAt } = depositLedgerLog;
    return (
      <tr key={_id}>
        <td className="text-left">{floor(fromValue)}</td>
        <td className="text-left">{currencySymbolToTitle[toCurrency]} {floor(toValue)}</td>
        <td className="text-center">{moment(createdAt).format('DD-MM-YYYY')}</td>
      </tr>
    );
  };

  return (
    <Modal isOpen={showCollateralModal} toggle={()=>{toggleModal('showCollateralModal')}} className='custom modal-lg'>
      <ModalHeader toggle={() => toggleModal('showCollateralModal')}>PPT in collateral</ModalHeader>
      <ModalBody>
        {
          depositLedgerLogs.length
          ?
            <WrapperTable>
              <Table responsive className="custom border-table" style={{ overflow: 'hidden' }}>
                <thead>
                <tr>
                  <th className="text-left">PPT amount</th>
                  <th className="text-left">Amount of Pokens to be returned</th>
                  <th className="text-center">Exchange date</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {depositLedgerLogs.map(renderRow)}
                </tbody>
              </Table>
            </WrapperTable>
          :
          <div className="p-t-20 p-b-20 text-center">
            You do not have any PPT in escrow
          </div>
        }
      </ModalBody>
    </Modal>
  );
};

export default CollateralModal;
