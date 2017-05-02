import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { getCurrentTurn } from './../selectors';

export class CardLayout extends Component {
  render() {
    const { cards, turn } = this.props;
    return (
      <div>
        {
          cards.map(card => <GameCard key={card.id} card={card} turn={turn} />)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: Object.values(state.cards.byId),
    turn: getCurrentTurn(state),
  };
}

export default connect(mapStateToProps)(CardLayout)
