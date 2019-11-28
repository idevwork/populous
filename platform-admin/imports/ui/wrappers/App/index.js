import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { ThemeProvider } from 'styled-components';

import '../../libs/redux-toastr/index.css';
import 'react-select/dist/react-select.css';
import '../../libs/react-datetime/index.css';
import '../../libs/styles/index.css';

import theme from './theme';
import GuestRoute from '../../route-helpers/GuestRoute';
import PrivateRoute from '../../route-helpers/PrivateRoute';
import Check2FA from '../../components/Requires2FA';
import PrivateApp from '../PrivateApp';
import Login from '../../routes/Login';
import ResetPasswordConfirm from '../../routes/ResetPasswordConfirm';
import ResetTwoFAKey from '../../routes/ResetTwoFAKey';

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Switch>
        {/* These are public routes */}
        <GuestRoute path='/login' component={Login} />
        <GuestRoute exact path="/reset-password/:token" component={ResetPasswordConfirm} />
        <GuestRoute exact path="/reset-2-fa" component={ResetTwoFAKey}/>

        <PrivateRoute path="/" component={PrivateApp} />
      </Switch>
      <ReduxToastr position={'bottom-right'} className={'custom-notification'}  preventDuplicates />
      <Check2FA/>
    </Fragment>
  </ThemeProvider>
);

export default App;
