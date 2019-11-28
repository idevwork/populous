import { createStore, applyMiddleware, compose } from 'redux';
import {sessionService} from 'redux-react-session';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers';

const history = createHistory();

const router = routerMiddleware(history);

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,

    // logger must be last
    compose(applyMiddleware(thunk, router, logger))
  );
  sessionService.initSessionService(store);
  sessionService.saveSession({pageNumber: 1}).then(() => {
  });
  //
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store;
};

const store = configureStore();

export default store;
export { history };
