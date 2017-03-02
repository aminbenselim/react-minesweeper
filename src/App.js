import React, { Component } from "react";

import Game from './Game'

class App extends Component {
  constructor(props) {
    super(props);
    this.newGame = this.newGame.bind(this);
    this.state = {
      game: () => <Game />
    };
  }

  newGame() {
    this.setState({
      game: () => <Game />
    });
  }

  render() {
    const ActiveGame = this.state.game;
    return (
      <div>
        <ActiveGame />
        <button onClick={this.newGame}>RESET GAME</button>
      </div>
    );
  }
}
export default App;
