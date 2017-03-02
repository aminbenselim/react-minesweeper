import React, { Component } from "react";
import "./App.css";
import Cell from "./Cell";
//import game logic
import {
  getRandomBombCells,
  getNumOfNeighbouringBombs,
  getNeighbouringCells,
  revealNeighbours
} from "./gameLogic";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      flags: 20,
      Rclicked: [],
      Lclicked: [],
      endGame: false
    };
    this.neighbours = [];
    this.values = [];
    this.bombCells = getRandomBombCells();
    for (let i = 0; i < 100; i++) {
      this.neighbours.push(getNeighbouringCells(i));
      this.values.push(
        getNumOfNeighbouringBombs(this.bombCells, this.neighbours[i], i)
      );
    }
    console.log(this.values);
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

  onLeftClick(data, e) {
    e.preventDefault();
    if (this.state.Rclicked.indexOf(data.index) === -1) {
      let revealed = revealNeighbours(data.index, data.neighbours, this.values);
      console.log("rev: "+revealed);
      let Lclicked = this.state.Lclicked;
      if (Array.isArray(revealed) && revealed.length > 0)
      // eslint-disable-next-line
        revealed.map(val => {
          if (Lclicked.indexOf(val) === -1) {
            Lclicked = Lclicked.concat(val);
          }
        });

      this.setState({
        Lclicked
      });
    }
  }

  render() {
    let cells = [];
          let neighbours = this.neighbours;

for(let i =0;i<100;i++)  {

   cells.push(
        <Cell
          key={i}
          value={this.values[i]}
          right={this.onRightClick.bind(this, i)}
          left={this.onLeftClick.bind(this, {
            index: i,
            neighbours
          })}
          flag={this.state.Rclicked.indexOf(i) !== -1}
          isClicked={this.state.Lclicked.indexOf(i) !== -1}
        >
          {this.state.Rclicked.indexOf(i) !== -1 && "F"}
        </Cell>
      );
    }
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

export default Game;