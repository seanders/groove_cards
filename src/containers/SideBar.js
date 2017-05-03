import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTurnIds, getPairedCardsForCurrentUser, getUserById, getAllCards, getCurrentUserId } from './../selectors';
import './SideBar.css';
import isGameOver from './../services/isGameOver';

export class SideBar extends Component {
  render() {
    const { turnCount, pairedCards, currentUser, winner } = this.props;
    return (
      <div className='sidebar'>
        <p>Turn: { turnCount}</p>
        <p>Current Player: {currentUser.name}</p>
        <p>Pairs:</p>
        <p className='sidebar--progress-section'>{ pairedCards.sort((card, nextCard) => card.value < nextCard.value).map(card => card.id) }</p>
        {
          winner ? <p>{winner.name} wins!</p> : null
        }
      </div>
    );
  }
}

const calculateWinnerId = (allCards) => {
  const userCounts = allCards.reduce((result, card) => {
    result[card.userId] = result[card.userId] ? result[card.userId]++ : 1;
    return result;
  }, {});

  let winner;
  var max = 0;

  for(var userId in userCounts) {
    if (userCounts[userId] > max) {
      max = userCounts[userId]
      winner = userId;
    }
  }

  return winner;
}

const mapStateToProps = (state) => {
  const turnIds = getAllTurnIds(state);
  const allCards = getAllCards(state);

  return {
    turnCount: turnIds.length,
    pairedCards: getPairedCardsForCurrentUser(state),
    winner: isGameOver(allCards) ? getUserById(state, calculateWinnerId(allCards)) : null,
    currentUser: getUserById(state, getCurrentUserId(state))
  }
}

export default connect(mapStateToProps)(SideBar);
