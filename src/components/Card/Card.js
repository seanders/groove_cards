import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export class Card extends Component {
  render() {
    const { id, faceUp, userId, onClick, matched } = this.props;
    const classes = classnames({
      'card--container': true,
      'card--not-face-up': !faceUp,
      'card--matched': faceUp && matched === true,
      'card--mismatched': faceUp && matched === false,
    });
    let content;

    if (userId) {
      return (
        <div className='card--container'></div>
      )
    }

    if (faceUp) {
      content = (
        <div className='card--flex-col'>
          <div className='card--flex-row'>
            <div>{id}</div>
            <div>{id}</div>
          </div>
          <div>{id}</div>
          <div className='card--flex-row'>
            <div>{id}</div>
            <div>{id}</div>
          </div>
        </div>
      )
    }

    return (
      <div className={classes} onClick={() => onClick(id)} >
        { content }
      </div>
    );
  }
}

Card.propTypes = {
  suit: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  faceUp: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
