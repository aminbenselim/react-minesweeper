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
      Rclicked: [],
      Lclicked: [],
      endGame: false
    };
    this.bombCells = getRandomBombCells();
    this.nbs = getNumOfNeighbouringBombs(this.bombCells);
  }
  onRightClick(i, e) {
    e.preventDefault();
    if (this.state.Lclicked.indexOf(i) === -1) {
      let Rclicked = this.state.Rclicked;
      if (Rclicked.indexOf(i) === -1) {
        if (this.state.flags > 0) {
          Rclicked = Rclicked.concat(i);
          let newFlags = this.state.flags - 1;
          this.setState({
            flags: newFlags,
            Rclicked
          });
        }
      } else {
        Rclicked.splice(Rclicked.indexOf(i), 1);
        let newFlags = this.state.flags + 1;
        this.setState({
          flags: newFlags,
          Rclicked
        });
      }
    }
  }

  onLeftClick(i, e) {
    e.preventDefault();
    if (this.state.Rclicked.indexOf(i) === -1) {
      let Lclicked = this.state.Lclicked;
      if (Lclicked.indexOf(i) === -1) {
        Lclicked = Lclicked.concat(i);
        this.setState({
          Lclicked
        });
      }
    }
  }

  render() {
    let cells = [];
    for (let i = 0; i < 100; i++)
      cells.push(
        <Cell
          key={i}
          value={this.nbs[i]}
          right={this.onRightClick.bind(this, i)}
          left={this.onLeftClick.bind(this, i)}
          flag={this.state.Rclicked.indexOf(i) !== -1}
          isClicked={this.state.Lclicked.indexOf(i) !== -1}
        >
          {this.state.Rclicked.indexOf(i) !== -1 && "F"}
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
