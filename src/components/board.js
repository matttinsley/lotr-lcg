import React from 'react';
import { EncounterDeck, StagingArea, PlayerDeck, Hand, ControlArea } from './decks';

class EncounterArea extends React.Component {
  constructor(props) {
    super(props);

    let encounterAreaStyle = {
      position: "absolute",
      top: 20,
      left: 20,
      width: "100%",
    }

    this.state = {style: encounterAreaStyle};
  }

  render() {
    return (
      <div id="encounter-area" style={this.state.style} >
        <EncounterDeck deck={this.props.encounterDeck} moves={this.props.moves} />
        <StagingArea deck={this.props.stagingArea} />
      </div>
    );
  }
}

class PlayerArea extends React.Component {
  render () {
    let playerAreaStyle = {
      position: "absolute",
      bottom: 20,
      left: 20,
      width: "100%",
    }

    let bottomRowStyle = {
      display: 'flex',
      flexDirection: 'row',
    }

    return (
      <div id="player-area" style={playerAreaStyle} >
        <ControlArea deck={this.props.controlArea} />
        <div id="bottom-row" style={bottomRowStyle} >
          <PlayerDeck deck={this.props.deck} moves={this.props.moves} />
          <Hand deck={this.props.hand} moves={this.props.moves} />
        </div>
      </div>
    )
  }
}

export class LordOfTheRingsBoard extends React.Component {
  render() {
    return (
      <div>
        <EncounterArea encounterDeck={this.props.G.encounterDeck} stagingArea={this.props.G.stagingArea}  moves={this.props.moves}/>
        <PlayerArea deck={this.props.G.deck} hand={this.props.G.hand} controlArea={this.props.G.controlArea} moves={this.props.moves} />
      </div>
    );
  }
}
