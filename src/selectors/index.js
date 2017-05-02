export const getCardById = (state, id) => state.cards.byId[id];
export const getTurnById = (state, id) => state.turns.byId[id];
export const getCurrentTurnId = (state) => {
  const allIds = state.turns.allIds;
  return allIds[allIds.length - 1];
}

export const getCurrentTurn = (state, id) => {
  const turnId = getCurrentTurnId(state);
  return getTurnById(state, turnId);
}
