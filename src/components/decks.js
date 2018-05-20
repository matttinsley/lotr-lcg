import React from 'react';
import { Card } from './card';

class Deck extends React.Component {

  handleClick(value) {
    this.props.onClick(value);
  }

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
        <Card key={i} card={this.props.deck.cards[i]} style={style} canHover={canHover}
        faceup={faceup} onClick={() => this.handleClick(i)}/>
      );
    }

    return (
      <div className="deck" style={this.props.style} >
        {deck}
      </div>
    );
  }
}

export class Hand extends React.Component {
  constructor(props) {
    super(props);

    let handStyle = {
      display: 'flex',
      maxWidth: '800px',
    }
    this.state = {style: handStyle};
  }

  onClick = (id) => {
    this.props.moves.playCard(id)
  }

  render() {
    return (
      <Deck deck={this.props.deck} style={this.state.style} onClick={this.onClick}/>
    );
  }
}

export class PlayerDeck extends React.Component {
  constructor(props) {
    super(props);

    let playerDeckStyle = {
      display: 'flex',
      maxWidth: '300px',
    }
    this.state = {style: playerDeckStyle};
  }

  onClick = (id) => {
    this.props.moves.drawCard()
  }

  render() {
    return (
      <div>
        <Deck deck={this.props.deck} style={this.state.style} stacked="true" onClick={this.onClick} />
      </div>
    );
  }
}

export class ControlArea extends React.Component {
  constructor(props) {
    super(props);

    let playerDeckStyle = {
      display: 'flex',
    }
    this.state = {style: playerDeckStyle};
  }

  // No click action for ControlArea yet.
  onClick = (id) => {}

  render() {
    return (
      <Deck deck={this.props.deck} style={this.state.style} onClick={this.onClick} />
    );
  }
}

export class EncounterDeck extends React.Component {
  onClick = (id) => {
    this.props.moves.drawEncounterCard();
  }

  render() {
    let encounterDeckStyle = {
      display: 'flex',
      maxWidth: '300px',
    }
    return (
      <Deck deck={this.props.deck} style={encounterDeckStyle} stacked="true" onClick={this.onClick} />
    );
  }
}

export class StagingArea extends React.Component {
  onClick = (id) => {}

  render() {
    let stagingAreaStyle = {
      display: 'flex',
      maxWidth: '800px',
    }

    return (
      <Deck deck={this.props.deck} style={stagingAreaStyle} onClick={this.onClick}/>
    );
  }
}
