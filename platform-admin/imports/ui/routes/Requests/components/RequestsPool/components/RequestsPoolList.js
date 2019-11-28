import React from 'react';
import { Col, Row } from 'reactstrap';

import RequestsPoolTable from './RequestsPoolTable';
import Reset2faDetailsModal from '../../modals/Reset2faDetailsModal';
import { requestTypes } from '../../tablesComponents/constants';
import RequestDetailsModal from '../../modals/RequestDetailsModal';
import WithdrawDetailsModal from '../../modals/WithdrawDetailsModal';
import DebtorDetailsModal from '../../modals/DebtorDetailsModal';
import ErrorRequestDetailsModal from '../../modals/ErrorRequestDetailsModal';
import Loading from '../../../../../components/Loading';


class RequestsPoolList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataModal: null,
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(data) {
    this.setState({
      dataModal: data && data._id ? data : null,
      showModal: !this.state.showModal,
    });
  }

  render() {
    const {updateFullTextSearch, onTypeChange, onPageChange, onLoadEntriesChange, requestList, filters, openPdfPreview,
      closePdfPreview, pdfPreview, pdfFile, onStatusChange, loading, currentPage, loadEntries, totalRequests,
    } = this.props;
    const {dataModal, showModal} = this.state;

    if (loading) {
      return <Loading />;
    }

      return (
      <Row className="m-b-30 m-t-30">
        <Col xs={'12'}>
          <RequestsPoolTable
            requests={requestList}
            onView={(requests) => this.toggleModal(requests)}
            onKeywordChange={updateFullTextSearch} keyword={filters.keyword}
            onTypeChange={onTypeChange} type={filters.type}
            onStatusChange={onStatusChange} status={filters.status}
            toggle={this.toggleModal}
            onPageChange={onPageChange}
            currentPage={currentPage}
            onLoadEntriesChange={onLoadEntriesChange}
            loadEntries={loadEntries}
            totalRequests={totalRequests}
          />

          { dataModal && dataModal.type === requestTypes.withdraw &&
          <WithdrawDetailsModal
            isOpen={showModal}
            toggle={this.toggleModal}
            dataModal={dataModal}
            isMyQueue={false}
          />
          }

          { dataModal && dataModal.type === requestTypes.debtorList &&
          <DebtorDetailsModal
            isOpen={showModal}
            toggle={this.toggleModal}
            dataModal={dataModal}
            initialValues={_.pick(dataModal, ['debtorName', 'country', 'companyNumber'])}
            isMyQueue={false}
          />
          }

          { dataModal && dataModal.type === requestTypes.reset2fa &&
          <Reset2faDetailsModal
            isOpen={showModal}
            toggle={this.toggleModal}
            dataModal={dataModal}
            pdfFile={pdfFile}
            pdfPreview={pdfPreview}
            openPdfPreview={openPdfPreview}
            closePdfPreview={closePdfPreview}
            isMyQueue={false}
          />
          }

          { dataModal && dataModal.type === requestTypes.blockchainError &&
          <ErrorRequestDetailsModal
            isOpen={showModal}
            toggle={this.toggleModal}
            dataModal={dataModal}
            isMyQueue={false}
          />
          }
        </Col>
      </Row>
    );
  }
}

export default RequestsPoolList;
