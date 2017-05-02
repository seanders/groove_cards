import { combineReducers } from 'redux';
import { getTurnById, getAllUserIds, getCardById, getAllCards } from './../selectors';
import uuid from 'uuid/v4';
import some from 'lodash/some';

// Actions
const SELECT_CARD = 'groove_cards/turns/SELECT_CARD';

const RESOLVE_CURRENT_TURN = 'groove_cards/turns/RESOLVE_CURRENT_TURN';
const START_NEXT_TURN = 'groove_cards/turns/START_NEXT_TURN';

export const actions = {
  RESOLVE_CURRENT_TURN
}

// Action Creators
const selectCard = (cardId, turnId) => {
  return {
    type: SELECT_CARD,
    cardId,
    turnId
  }
}

const startNextTurn = (currentTurn, matched) => {
  const currentUserId = currentTurn.userId;

  return (dispatch, getState) => {
    const state = getState();
    const userIds = getAllUserIds(state);
    const allCards = getAllCards(state);
    const cardOne = getCardById(state, currentTurn.cardOneId);
    const cardTwo = getCardById(state, currentTurn.cardTwoId);
    const curretUserIndex = userIds.indexOf(currentUserId);
    let nextUserId;

    if (matched) {
      nextUserId = currentUserId;
    } else {
      nextUserId = userIds[curretUserIndex + 1] || userIds[0];
    }

    dispatch({
      type: RESOLVE_CURRENT_TURN,
      turn: currentTurn,
      matched: cardOne.value == cardTwo.value,
    });

    // Handle end game scenario
    if (some(allCards, card => card.userId == null)) {
      dispatch({
        type: START_NEXT_TURN,
        turn: {
          cardOneId: null,
          cardTwoId: null,
          userId: nextUserId,
          id: uuid(),
        }
      });
    }
  }
}

export const actionCreators = {
  selectCard,
  startNextTurn
}

const TURNS_BY_ID_ACTION_HANDLERS = {
  [SELECT_CARD]: (state, { cardId, turnId }) => {
    const currentTurn = state[turnId];

    var updatedTurn = {
      ...currentTurn
    }

    // Edge case - When you click on an already selected first card
    if (updatedTurn.cardOneId === cardId) { return state; }

    if(!updatedTurn.cardOneId) {
      updatedTurn.cardOneId = cardId;
    } else if (!updatedTurn.cardTwoId) {
      updatedTurn.cardTwoId = cardId;
    }

    return {
      ...state,
      [turnId]: updatedTurn
    }
  },

  [START_NEXT_TURN]: (state, { turn }) => {
    return {
      ...state,
      [turn.id]: turn
    }
  }
}

const TURNS_ALL_IDS_ACTION_HANDLERS = {
  [START_NEXT_TURN]: (state, { turn }) => {
    return [...state, turn.id]
  }
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
