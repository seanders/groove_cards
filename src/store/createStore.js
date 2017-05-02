import { createStore, compose, applyMiddleware } from 'redux';
import createRootReducer from './createRootReducer';
import thunk from 'redux-thunk';

const enhancers = [];

if(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

export default (initialState = {}) => {
  return createStore(
    createRootReducer(),
    initialState,
    compose(
      applyMiddleware(thunk),
      ...enhancers,
    )
  )
}
