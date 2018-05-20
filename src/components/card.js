import React from 'react';
import './card.css';

export class Card extends React.Component {
  onClick() {
    if (this.props.onClick !== undefined) {
      this.props.onClick();
    }
  }

  render() {
    const classNames = ['card'];
    if (!this.props.canHover) classNames.push('no-hover');
    if (this.props.className) classNames.push(this.props.className);

    const front = <img src={ 'img/' + this.props.card.title + '.jpg'} className="card__front" alt={this.props.card.title} />

    let back_img = 'player_card_back.jpg';
    if (this.props.card.cardType === 'encounter') {
      back_img = 'encounter_card_back.jpg';
    }
    const back = <img src={ 'img/' + back_img } className="card__back" alt={this.props.card.title} />

    return (
      <div className={classNames.join(' ')} style={this.props.style} onClick={this.onClick.bind(this)}>
        {this.props.faceup ? front : back}
      </div>
    );
  }
}
