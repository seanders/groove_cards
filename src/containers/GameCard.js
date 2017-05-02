import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './../components/Card';
import { getTurnById, getCardById, getAllUserIds } from './../selectors';
import { actionCreators as turnActions } from './../reducers/turns';

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

  const cardIsFaceUp = cardOneId === card.id || cardTwoId === card.id;
  const matchExists = !!cardOne && !!cardTwo && cardOne.value === cardTwo.value;

  return {
    faceUp: cardIsFaceUp,
    matched: isTurnFinished(turn) ? matchExists : null,
  }
}

const mapDispatchToProps = (dispatch, { turn }) => {
  return {
    onClick: (cardId) => {
      if(isTurnFinished(turn)) {
        dispatch(turnActions.startNextTurn(turn))
      } else {
        dispatch(turnActions.selectCard(cardId, turn.id));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
