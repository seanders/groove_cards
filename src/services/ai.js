import { actionCreators as turnActions } from './../reducers/turns';

const delayedAction = 1000;

export const findFirstPair = (cards) => {
  var firstPair = [];

  for (var i = 0; i < cards.length; i++) {
    let firstCard = cards[i];

    for (var j = 0; j < cards.length; j++) {
      let secondCard = cards[j];

      if (firstCard.value === secondCard.value && firstCard.id !== secondCard.id) {
        firstPair.push(firstCard);
        firstPair.push(secondCard);
        break;
      }
    }

    if (firstPair.length) {
      break;
    }
  }

  return firstPair;
}

const findKnownCardIds = (turns) => {
  return turns.reduce((result, turn) => {
    result.push(turn.cardOneId);
    result.push(turn.cardTwoId);
    return result;
  }, []);
}

export const findKnownPairs = (turns, cards) => {
  var knownCardIds = findKnownCardIds(turns);

  const knownCards = cards.filter(card => {
    return knownCardIds.indexOf(card.id) > -1 && card.userId === null;
  });

  return findFirstPair(knownCards);
}

export default {
  chooseCard: (turns, currentTurn, cards, cardPositions, dispatch) => {
    // Check if there are any known pairs that haven't been selected
    const knownPairs = findKnownPairs(turns, cards);

    if (knownPairs.length === 0) {
      // click on cards that haven't been displayed in previous turns
      let knownCardIds = findKnownCardIds(turns);

      let card = cards.find(card => knownCardIds.indexOf(card.id) === -1);

      setTimeout(() => { dispatch(turnActions.selectCard(card.id, currentTurn.id));}, delayedAction)

    } else {
      // Handle case where one card has already been flipped and we can now realize a pair.
      if (currentTurn.cardOneId !== null) {
        const firstCard = cards.find(card => currentTurn.cardOneId === card.id);
        const secondCard = knownPairs.find(card => card.value === firstCard.value && currentTurn.cardOneId !== card.id);
        setTimeout(() => { dispatch(turnActions.selectCard(secondCard.id, currentTurn.id));}, delayedAction);
      } else {
        let card = knownPairs[0]
        setTimeout(() => { dispatch(turnActions.selectCard(card.id, currentTurn.id)); }, delayedAction);
      }
    }
  }
}
