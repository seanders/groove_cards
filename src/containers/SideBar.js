import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTurnIds, getCurrentTurn, getPairedCardsForCurrentUser, getUserById, getAllCards } from './../selectors';
import Card from './../components/Card';
import './SideBar.css';
import every from 'lodash/every';

export class SideBar extends Component {
  render() {
    const { turnCount, pairedCards, winner } = this.props;
    return (
      <div className='sidebar'>
        <p>Turn: { turnCount}</p>
        <p></p>
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
    winner: every(allCards, card => card.userId !== null) ? getUserById(state, calculateWinnerId(allCards)) : null,
  }
}

export default connect(mapStateToProps)(SideBar);
