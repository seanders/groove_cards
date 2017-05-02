import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export class Card extends Component {
  render() {
    const { id, faceUp, onClick, matched} = this.props;
    var classes = classnames({
      'card--container': true,
      'card--not-face-up': !faceUp,
      'card--matched': faceUp && matched,
      'card--mismatched': faceUp && matched === false,
    });

    return (
      <div className={classes} onClick={() => onClick(id)} >
        { faceUp ? id : null }
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
