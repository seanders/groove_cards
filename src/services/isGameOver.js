import every from 'lodash/every';

export default (cards) => every(cards, card => card.userId !== null);
