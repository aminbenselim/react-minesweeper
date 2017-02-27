import React, { Component } from "react";
import "./App.css";
import Cell from "./cell";
//import game logic
import { getRandomBombCells, getNumOfNeighbouringBombs } from "./game";

class App extends Component {
  render() {
    const bombCells = getRandomBombCells();
    const nbs = getNumOfNeighbouringBombs(bombCells);
    let cells = [];
    for (let i = 0; i < 100; i++)
      cells.push(<Cell key={i}>{nbs[i]}</Cell>);
    return (
      <div className="App">
        {cells}
      </div>
    );
  }
}

export default App;
