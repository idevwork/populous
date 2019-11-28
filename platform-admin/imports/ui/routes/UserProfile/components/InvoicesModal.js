import React from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';

import Invoice from "./Invoice";
import {InvoiceTable} from "../../../components/styled-components/Transactions/Table";

const InvoicesModal = ({
  showInvoicesModal,
  toggleInvoicesModal,
  invoices,
  auction,
}) => {
  return (
    <Modal isOpen={showInvoicesModal} toggle={toggleInvoicesModal} className="custom modal-lg">
      <ModalHeader toggle={() => toggleInvoicesModal(false)}>Invoices: {auction}</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs={'12'} className="table-responsive">
            <InvoiceTable>
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Invoice No</th>
                  <th>Crowdsale ID</th>
                  <th>Eth. Address</th>
                  <th>Invoice amount</th>
                  <th>Reapid</th>
                  <th>Penalties</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => {
                  return (
                    <Invoice key={index} invoice={invoice} />
                  );
                })}
              </tbody>
            </InvoiceTable>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default InvoicesModal;