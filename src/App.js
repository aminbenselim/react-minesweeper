import React, { Component } from "react";
import "./App.css";
import Cell from "./Cell";
//import game logic
import { getRandomBombCells, getNumOfNeighbouringBombs } from "./game";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flags: 20,
      clicked: []
    };
    this.bombCells = getRandomBombCells();
    this.nbs = getNumOfNeighbouringBombs(this.bombCells);
    //this.onLeftClick = this.onLeftClick().bind(this);
  }
  onRightClick(i, e) {
    e.preventDefault();
    let clicked = this.state.clicked;
    if (clicked.indexOf(i) === -1) {
      if (this.state.flags > 0) {
        clicked = clicked.concat(i);
        let newFlags = this.state.flags - 1;
        this.setState({
          flags: newFlags,
          clicked
        });
      }
    } else {
      clicked.splice(clicked.indexOf(i), 1);
      let newFlags = this.state.flags + 1;
      this.setState({
        flags: newFlags,
        clicked
      });
    }
  }
  render() {
    let cells = [];
    for (let i = 0; i < 100; i++)
      cells.push(
        <Cell
          key={i}
          right={this.onRightClick.bind(this, i)}
        >
        {(this.state.clicked.indexOf(i) !== -1 ) ? 'F' : this.nbs[i]}
        </Cell>
  
      );
    return (
      <div className="container">
        <span> {this.state.flags} </span>
        <div className="App">
          {cells}
        </div>
      </div>
    );
  }
}

export default App;
