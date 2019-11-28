import { Meteor } from 'meteor/meteor';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Col, Row } from 'reactstrap';

import { H1 } from '../../../components/styled-components/Typography';
import { TransitionTable, Thead } from '../../../components/styled-components/Transactions/Table';
import TransactionsTable from './TransactionsTable';
import TransactionModal from './TransactionModal';

let isOpen = false;

class TransactionsList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      transaction: null,
      bidModal: false,
    };
  }

  toggleModal(transaction) {
    this.setState({
      transaction: transaction,
      bidModal: !this.state.bidModal,
    });
  }

  render(){
    const {
      filters,
      transactions,
      updateTypeFilter,
      updateStatusFilter,
      updateFullTextSearch,
    } = this.props;

    return (
      <Container>
        <Row className="m-b-30 m-t-30">
          <Col xs={'12'} md={'9'}>
            <H1 className="text-uppercase">
              Transactions
            </H1>
          </Col>
        </Row>

        <TransactionsTable transactions={transactions} onView={(transaction) => this.toggleModal(transaction)}
                      onTypeChange={updateTypeFilter} type={filters.type}
                      onStatusChange={updateStatusFilter} status={filters.status}
                      onKeywordChange={updateFullTextSearch} keyword={filters.keyword}
                      toggle={this.toggleModal}
        />
        <TransactionModal isOpen={this.state.bidModal} toggle={this.toggleModal} transaction={this.state.transaction} />
      </Container>
    );
  }
};

export default TransactionsList;
