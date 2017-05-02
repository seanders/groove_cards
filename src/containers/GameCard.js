import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './../components/Card';
import { getTurnById, getCardById } from './../selectors';
import { actions as cardActions } from './../reducers/turns';

export class GameCard extends Component {
  render() {
    const { card, faceUp, onClick, matched } = this.props;

    return (
      <Card
        faceUp={faceUp}
        matched={matched}
        onClick={onClick}
        { ...card }
      />
    );
  }
}

const isTurnFinished = (turn) => !!(turn.cardOneId && turn.cardTwoId);

const mapStateToProps = (state, { card, turn }) => {
  const { cardOneId, cardTwoId } = turn;
  const cardOne = getCardById(state, cardOneId);
  const cardTwo = getCardById(state, cardTwoId);
  var cardIsFaceUp = cardOneId === card.id || cardTwoId === card.id;

  return {
    faceUp: cardIsFaceUp,
    matched: (isTurnFinished(turn)) ? (cardOne.value === cardTwo.value) : null,
  }
}

const mapDispatchToProps = (dispatch, { turn }) => {
  return {
    onClick: (cardId) => {
      if(isTurnFinished(turn)) {
        // create new turn
        console.log('turn is finished foo');
      } else {
        dispatch(cardActions.selectCard(cardId, turn.id));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
