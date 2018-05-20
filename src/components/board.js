import React from 'react';
import { PlayerDeck, Hand, ControlArea } from './decks';


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
        <PlayerDeck deck={this.props.deck} moves={this.props.moves} />
        Hand:
        <Hand deck={this.props.hand} moves={this.props.moves} />
      </div>
    )
  }
}

export class LordOfTheRingsBoard extends React.Component {
  render() {
    return (
      <div>
        <PlayerArea deck={this.props.G.deck} hand={this.props.G.hand} controlArea={this.props.G.controlArea} moves={this.props.moves} />
      </div>
    );
  }
}
