import React, {Fragment} from 'react';
import { connect } from "react-redux";
import { Col, Row } from 'reactstrap';
import _ from 'lodash';

import { requestTypes } from '../../tablesComponents/constants';
import { H2 } from '../../../../../components/styled-components/Typography';
import MyQueueTable from './MyQueueTable';
import RequestDetailsModal from '../../modals/RequestDetailsModal';
import WithdrawDetailsModal from '../../modals/WithdrawDetailsModal';
import DebtorDetailsModal from '../../modals/DebtorDetailsModal';
import Reset2faDetailsModal from '../../modals/Reset2faDetailsModal';
import ErrorRequestDetailsModal from '../../modals/ErrorRequestDetailsModal';


class MyQueue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataModal: null,
      myQueueModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(data) {

    this.setState({
      dataModal: data && data._id ? data : null,
      myQueueModal: !this.state.myQueueModal,
    });
  }

  render() {
    const {filters, requests, updateTypeFilter, updateFullTextSearch, pdfFile, pdfPreview, openPdfPreview,
      closePdfPreview, reset2FA} = this.props;
    const {dataModal} = this.state;

    return (
      <Row className="m-b-30 m-t-30">
        <Col>
          <H2>
            My queue
          </H2>

          <MyQueueTable
            requests={requests}
            onView={(requests) => this.toggleModal(requests)}
            onTypeChange={updateTypeFilter} type={filters.type}
            onKeywordChange={updateFullTextSearch} keyword={filters.keyword}
            toggle={this.toggleModal}
          />

          { dataModal && dataModal.type === requestTypes.withdraw &&
          <WithdrawDetailsModal
            isOpen={this.state.myQueueModal}
            toggle={this.toggleModal}
            dataModal={dataModal}
            isMyQueue={true}
          />
          }

          { dataModal && dataModal.type === requestTypes.debtorList &&
          <DebtorDetailsModal
            isOpen={this.state.myQueueModal}
            toggle={this.toggleModal}
            dataModal={dataModal}
            initialValues={_.pick(dataModal, ['debtorName', 'country', 'companyNumber'])}
            isMyQueue={true}
          />
          }

          { dataModal && dataModal.type === requestTypes.reset2fa &&
          <Reset2faDetailsModal
            isOpen={this.state.myQueueModal}
            toggle={this.toggleModal}
            dataModal={dataModal}
            isMyQueue={true}
            pdfFile={pdfFile}
            pdfPreview={pdfPreview}
            openPdfPreview={openPdfPreview}
            closePdfPreview={closePdfPreview}
          />
          }

          { dataModal && dataModal.type === requestTypes.blockchainError &&
          <ErrorRequestDetailsModal
            isOpen={this.state.myQueueModal}
            toggle={this.toggleModal}
            dataModal={dataModal}
            isMyQueue={true}
            />
          }
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(MyQueue)
