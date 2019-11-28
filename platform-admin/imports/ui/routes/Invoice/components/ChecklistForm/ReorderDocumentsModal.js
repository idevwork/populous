import React from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {invoiceDocumentTypes} from 'meteor/populous:constants';
import {Col, Row} from 'reactstrap';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import {Small} from '../../../../components/styled-components/Typography';
import {PrimaryButton} from '../../../../components/styled-components/Buttons';
import PdfPreview from './PdfPreview';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


class ReorderDocumentsModal extends React.Component {
  constructor(props) {
    super(props);

    const {documents, invoice} = props;
    const offerDocument = documents[invoiceDocumentTypes.offer];
    const buyerDocument = documents[invoiceDocumentTypes.buyer];
    const agreementDocument = documents[invoiceDocumentTypes.agreement];
    let items = [offerDocument, buyerDocument, agreementDocument];

    this.state = {
      isReorder: false,
      items: items.map((item, index) => ({
          id: item._id,
          content: <PdfPreview file={(item && item.link()) || '/empty-invoice.pdf'}
                               currentFile={item}
                               type={(item && item.extension) || null}
                               className="pdf-preview" invoice
                               currentInvoice={invoice}
                               height={230} width={160}/>

        }))
    }
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
      isReorder: true
    });
  };

  reorderDocuments = () => {
    const {invoice, toggle, reorderDocuments} = this.props;
    const {items} = this.state;
    const types = ['offer', 'buyer', 'agreement'];
    const documents = items.map(({id, type}, index) => (
      {
        id,
        type: types[index]
      }
      ));

    reorderDocuments(invoice, documents);
    toggle();
  };

  render() {
    const {isOpen, toggle, documents} = this.props;
    const {isReorder, items} = this.state;

    if (!documents) {
      return null;
    }

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="custom" style={{maxWidth: 990}}>
        <ModalHeader toggle={() => toggle(null)}>Reorder documents</ModalHeader>
        <ModalBody>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  className="row"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div className="col col-md-4 text-center"
                             ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Row>
            <Col md="4" className="text-center">
              <Small className="m-t-20">
                Invoice Finance Letter of Offer
              </Small>
            </Col>

            <Col md="4" className="text-center">
              <Small className="m-t-20">
                Ancillary Credit and Security Agreements
              </Small>
            </Col>

            <Col md="4" className="text-center">
              <Small className="m-t-20">
                Digital Asset Repayment Agreement
              </Small>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center m-t-30 p-r-40">
              <PrimaryButton onClick={this.reorderDocuments} disabled={!isReorder}>
                Apply changes
              </PrimaryButton>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  }
}

export default ReorderDocumentsModal;
