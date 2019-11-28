import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from '/imports/ui/wrappers/App';
import store, { history } from '/imports/store';

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
});
