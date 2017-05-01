import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    var { cards } = this.props
    return (
      <div className="App">
        {/* TODO: Flesh out rendering */}
        {
          cards.map(card => (<p key={card.id}>{card.id}</p>))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: Object.values(state.cards.byId)
  }
}

export default connect(mapStateToProps)(App);
