import cards from 'cards';

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
    id:    cardId
  }

  allIds.push(cardId);
}

export default () => {
  // TODO: Initialize the deck of cards here
  return {
    cards: {
      byId,
      allIds
    }
  };
}
