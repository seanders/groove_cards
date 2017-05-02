import { combineReducers } from 'redux';
import turnsReducer from './../reducers/turns';
import cardsReducer from './../reducers/cards';

export default () => {
  return combineReducers({
    cards: cardsReducer,
    users: (state = {}, action) => state,
    turns: turnsReducer,
  });
}
