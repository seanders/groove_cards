import { combineReducers } from 'redux';
import { getTurnById } from './../selectors';

// Actions
const SELECT_CARD = 'groove_cards/turns/SELECT_CARD';

const START_NEW_TURN = 'groove_cards/turns/START_NEW_TURN';

// Action Creators
const selectCard = (cardId, turnId) => {
  return {
    type: SELECT_CARD,
    cardId,
    turnId
  }
}

export const actions = {
  selectCard
}

const TURNS_BY_ID_ACTION_HANDLERS = {
  [SELECT_CARD]: (state, { cardId, turnId }) => {
    const currentTurn = state[turnId];

    var updatedTurn = {
      ...currentTurn
    }

    if(!updatedTurn.cardOneId) {
      updatedTurn.cardOneId = cardId;
    } else if (updatedTurn.cardOneId) {
      updatedTurn.cardTwoId = cardId;
    }

    return {
      ...state,
      [turnId]: updatedTurn
    }
  }
}

const TURNS_ALL_IDS_ACTION_HANDLERS = {

}

const byId = (state = {}, action) => {
  const handler = TURNS_BY_ID_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

const allIds = (state = [], action) => {
  const handler = TURNS_ALL_IDS_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export default combineReducers({
  byId,
  allIds
})
