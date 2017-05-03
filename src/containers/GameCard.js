import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './../components/Card';
import { getCardById, getUserById } from './../selectors';
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
    currentUser: getUserById(state, turn.userId),
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

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onClick: (cardId) => {
      // Ignore clicks that occur while the AI is playing.
      if (stateProps.currentUser.type !== 'AI') {
        return dispatchProps.onClick(cardId);
      }
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GameCard);
