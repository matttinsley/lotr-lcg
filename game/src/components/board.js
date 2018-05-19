import React from 'react';
import './card.css';

class Card extends React.Component {
  render() {
    const classNames = ['card'];
    if (!this.props.canHover) classNames.push('no-hover');
    if (this.props.className) classNames.push(this.props.className);

    const front = <img src={ 'img/' + this.props.card.title + '.jpg'} className="card__front" alt={this.props.card.title} />
    const back = <img src={ 'img/player_card_back.jpg'} className="card__back" alt={this.props.card.title} />

    return (
      <div className={classNames.join(' ')} style={this.props.style}>
        {this.props.faceup ? front : back}
      </div>
    );
  }
}

class Deck extends React.Component {
  render() {
    let deck = [];
    for (let i = 0; i < this.props.deck.cards.length; i++) {
      let splayWidth = 100
      let canHover = true
      let faceup = true
      let style
      if (this.props.stacked) {
        splayWidth = 2
        canHover = i === 0
        faceup = false
        style = {
          position: i ? 'absolute' : 'inherit',
          left: i * splayWidth,
          zIndex: -i,
        };
      }


      deck.push(
        <Card key={i} card={this.props.deck.cards[i]} style={style} canHover={canHover} faceup={faceup}/>
      );
    }

    return (
      <div className="deck" style={this.props.style} >
        {deck}
      </div>
    );
  }
}

class Hand extends React.Component {
  constructor(props) {
    super(props);

    let handStyle = {
      display: 'flex',
      maxWidth: '800px',
    }
    this.state = {style: handStyle};
  }

  render() {
    return (
      <Deck deck={this.props.deck} style={this.state.style} />
    );
  }
}

class PlayerDeck extends React.Component {
  constructor(props) {
    super(props);

    let playerDeckStyle = {
      display: 'flex',
      maxWidth: '300px',
    }
    this.state = {style: playerDeckStyle};
  }

  render() {
    return (
      <Deck deck={this.props.deck} style={this.state.style} stacked="true" />
    );
  }
}

class ControlArea extends React.Component {
  constructor(props) {
    super(props);

    let playerDeckStyle = {
      display: 'flex',
      maxWidth: '300px',
    }
    this.state = {style: playerDeckStyle};
  }

  render() {
    return (
      <Deck deck={this.props.deck} style={this.state.style} />
    );
  }
}


class PlayerArea extends React.Component {
  constructor(props) {
    super(props);

    let playerAreaStyle = {
      position: "absolute",
      bottom: 20,
      left: 20,
      width: "100%",
    }

    this.state = {style: playerAreaStyle};
  }

  render () {
    return (
      <div id="player-area" style={this.state.style} >
        Control Area:
        <ControlArea deck={this.props.controlArea} />
        Player Deck:
        <PlayerDeck deck={this.props.deck}  />
        Hand:
        <Hand deck={this.props.hand} />
      </div>
    )
  }
}

export class LordOfTheRingsBoard extends React.Component {
  render() {
    return (
      <div>
        <PlayerArea deck={this.props.G.deck} hand={this.props.G.hand} controlArea={this.props.G.controlArea} />
      </div>
    );
  }
}
