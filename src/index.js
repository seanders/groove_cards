import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Setup redux
import { Provider } from 'react-redux';
import createStore from './store/createStore'
import createInitialState from './store/createInitialState'

ReactDOM.render(
  <Provider store={createStore(createInitialState())}>
    <App />
  </Provider>,
  document.getElementById('root')
);
