import { createStore, compose } from 'redux'
import createRootReducer from './createRootReducer'

const enhancers = [];

if(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

export default (initialState = {}) => {
  return createStore(
    createRootReducer(),
    initialState,
    compose(
      ...enhancers
    )
  )
}
