import React from 'react';
import { fixtures } from 'meteor/populous:constants';

import Setup2FA from '../../../routes/Setup2FA';
import HeaderEmpty from '../../../components/Header/HeaderEmpty';
import { Page, Content } from '../../../components/styled-components/Divs';
import Footer from '../../../components/Footer/Footer';
import PrivateMainApp from './PrivateMainApp';
import Loading from '../../../components/Loading';

const PrivateApp = ({ loading, currentUser, logout }) => {
  if (loading || !currentUser) {
    return <Loading />;
  }

  // Make sure the user has 2 factor auth setup
  // Disable 2FA for users from fixtures
  const defaultUsersEmails = Object.values(fixtures.users).map(user => user.email);

  if (!currentUser.twoFAKey && !defaultUsersEmails.includes(currentUser.emailAddress())) {
    return (
      <Page>
        <HeaderEmpty user={currentUser} />
        <Content>
          <Setup2FA />
        </Content>
        <Footer />
      </Page>
    );
  }

  return (
    <PrivateMainApp currentUser={currentUser} logout={logout} />
  );
};

export default PrivateApp;
