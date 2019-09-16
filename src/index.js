import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { loadPage } from '../src/actions/';
import { stocksReducer as reducer } from '../src/reducers';
import { rootSaga } from '../src/sagas';

const wsMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(wsMiddleware));
wsMiddleware.run(rootSaga);

store.dispatch(loadPage());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
