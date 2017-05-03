import { createSelector } from 'reselect';

export const getUserById = (state, id) => state.users.byId[id];
export const getAllUserIds = (state) => state.users.allIds;
export const getCardById = (state, id) => state.cards.byId[id];
export const getAllCards = (state) => Object.values(state.cards.byId);
export const getAllCardIds = (state) => state.cards.allIds;
export const getTurnById = (state, id) => state.turns.byId[id];
export const getCurrentTurnId = (state) => {
  const allIds = state.turns.allIds;
  return allIds[allIds.length - 1];
}

export const getAllTurnIds = state => state.turns.allIds

export const getAllTurns = state => Object.values(state.turns.byId);

export const getCurrentTurn = (state) => {
  const turnId = getCurrentTurnId(state);
  return getTurnById(state, turnId);
}

export const getCurrentUserId = createSelector(
  getCurrentTurn,
  turn => turn.userId
)

export const getPairedCardsForCurrentUser = createSelector(
  getCurrentUserId,
  getAllCards,
  (userId, cards) => cards.filter(card => card.userId === userId)
)
