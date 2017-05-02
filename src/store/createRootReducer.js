import { combineReducers } from 'redux';
import turnsReducer from './../reducers/turns';

export default () => {
  return combineReducers({
    cards: (state = {}, action) => state,
    users: (state = {}, action) => state,
    turns: turnsReducer,
  });
}
