import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { userRoles, statuses, accountStatuses } from 'meteor/populous:constants';

import Loading from '../../../components/Loading';
import { H1 } from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import UsersTable from './UsersTable';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.resetFilters();
  }
  render() {
    const {users, loading, onStatusChange, onRoleChange, onKeywordChange, filters, history, sendEmail, onSicChange } = this.props;
    if (loading) {
      return <Loading />;
    }

    let _users = [];
    for (let user of users) {
      let party, kycStatus, accountStatus;
      if (user.isAdmin()) {
        party = 'Admin';
      } else if (user.isInvestor() && !user.isProvider()) {
        party = 'Buyer';
      } else if(user.isProvider()){
        party = 'Provider';
      }else if (user.isBorrower()) {
        party = 'Seller';
      }

      _users.push({
        ...user,
        email: user.emails[0].address,
        party,
        kycStatus: statuses[user.KYCStatus]
      });
    }

    return (
      <Container>
        <Row className="m-b-30 m-t-30">
          <Col>
            <H1>
              Users
            </H1>
          </Col>
          <Col className="text-right">
            <PrimaryButton onClick={ () => { history.push('/email-templates') } }>Email Templates</PrimaryButton>
          </Col>
        </Row>

        <Row>
          <Col xs={'12'}>
            <UsersTable users={_users} sendEmail={sendEmail}
                        onRoleChange={onRoleChange}
                        onSicChange={onSicChange}
                        onStatusChange={onStatusChange} filters={filters}
                        onKeywordChange={onKeywordChange} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UsersList;
