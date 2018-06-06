import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import rootReducer from '../Reducers/index';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';


export const history = createHistory();


export function configureStore(initialState) {

  const store = createStore(
    rootReducer,
    initialState,
    compose (
      applyMiddleware(ReduxPromise, thunk, routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../Reducers', () => {
      const nextRootReducer = require('../Reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}