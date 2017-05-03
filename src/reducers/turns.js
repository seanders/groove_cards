import { combineReducers } from 'redux';
import { getTurnById, getAllTurns, getCurrentTurn, getAllUserIds, getCardById, getAllCards, getAllCardIds, getUserById, getCurrentUserId } from './../selectors';
import uuid from 'uuid/v4';
import some from 'lodash/some';
import ai from '../services/ai';
import isGameOver from '../services/isGameOver';

// Actions
const SELECT_CARD = 'groove_cards/turns/SELECT_CARD';

const RESOLVE_CURRENT_TURN = 'groove_cards/turns/RESOLVE_CURRENT_TURN';
const START_NEXT_TURN = 'groove_cards/turns/START_NEXT_TURN';

export const actions = {
  RESOLVE_CURRENT_TURN
}

// Action Creators
const selectCard = (cardId, turnId) => {
  return (dispatch, getState) => {
    const state = getState();
    const userId = getCurrentUserId(state);

    dispatch({
      type: SELECT_CARD,
      cardId,
      turnId
    });

    if(getUserById(getState(), userId).type === 'AI') {
      const turn = getTurnById(getState(), turnId);
      if (turn.cardOneId !== null && turn.cardTwoId === null) {
        const freshState = getState();
        ai.chooseCard(
          getAllTurns(freshState),
          getCurrentTurn(freshState),
          getAllCards(freshState),
          getAllCardIds(freshState),
          dispatch,
        )
      } else {
        setTimeout(() => dispatch(startNextTurn(turn)), 500)
      }
    }
  }
}

const startNextTurn = (currentTurn) => {
  const currentUserId = currentTurn.userId;

  return (dispatch, getState) => {
    const state = getState();
    const userIds = getAllUserIds(state);
    const allCards = getAllCards(state);
    const cardOne = getCardById(state, currentTurn.cardOneId);
    const cardTwo = getCardById(state, currentTurn.cardTwoId);
    const curretUserIndex = userIds.indexOf(currentUserId);
    let nextUserId;

    if (cardOne.value === cardTwo.value) {
      nextUserId = currentUserId;
    } else {
      nextUserId = userIds[curretUserIndex + 1] || userIds[0];
    }

    dispatch({
      type: RESOLVE_CURRENT_TURN,
      turn: currentTurn,
      matched: cardOne.value === cardTwo.value,
    });

    // Handle end game scenario
    if (!isGameOver(getAllCards(getState()))) {
      dispatch({
        type: START_NEXT_TURN,
        turn: {
          cardOneId: null,
          cardTwoId: null,
          userId: nextUserId,
          id: uuid(),
        }
      });

      if(getUserById(state, nextUserId).type === 'AI') {
        const freshState = getState();
        ai.chooseCard(
          getAllTurns(freshState),
          getCurrentTurn(freshState),
          getAllCards(freshState),
          getAllCardIds(freshState),
          dispatch,
        );
      }
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
