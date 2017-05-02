import cards from 'cards';
import uuid from 'uuid/v4';

const deck = new cards.PokerDeck();
const byId = {};
const allIds = [];

deck.shuffleAll();

while (deck.deck.length > 0) {
  let card = deck.draw();

  let cardId = card.unicodeString();

  byId[cardId] = {
    value: card.value,
    suit:  card.suit,
    userId: null,
    id:    cardId
  }

  allIds.push(cardId);
};

const firstUserId = uuid();
const firstTurnId = uuid();

export default () => {
  // TODO: Initialize the deck of cards here
  return {
    cards: {
      byId,
      allIds
    },
    users: {
      byId: {
        [firstUserId]: {
          name: 'Player 1',
          type: 'human',
          id: firstUserId,
        }
      },
      allIds: [firstUserId]
    },
    turns: {
      byId: {
        [firstTurnId]: {
          cardOneId: null,
          cardTwoId: null,
          userId: firstUserId,
          id: firstTurnId
        }
      },
      allIds: [firstTurnId]
    }
  };
}
