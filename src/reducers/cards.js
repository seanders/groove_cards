import { combineReducers } from 'redux';
import { actions as TurnActions } from './turns';

// ACTIONS

// Action Creators


const byId = (state = {}, action) => {
  const handlers = {
    [TurnActions.RESOLVE_CURRENT_TURN]: (state={}, { turn, matched }) => {
      if (matched) {
        let cardOne = state[turn.cardOneId];
        let cardTwo = state[turn.cardTwoId];
        return {
          ...state,
          [turn.cardOneId]: {
            ...cardOne,
            userId: turn.userId
          },
          [turn.cardTwoId]: {
            ...cardTwo,
            userId: turn.userId
          }
        }
      } else {
        return state;
      }
    }
  }

  return handlers[action.type] ? handlers[action.type](state, action) : state;
}

const allIds = (state=[], action) => state;

export default combineReducers({
  byId,
  allIds
});
