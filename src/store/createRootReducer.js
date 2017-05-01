import { combineReducers } from 'redux'

export default () => {
  return combineReducers({
    cards: (state = {}, action) => {
      return state;
    }
  });
}
