import React, { Component } from "react";
import Cell from "./Cell";
//import game logic
import {
  getRandomBombCells,
  getNumOfNeighbouringBombs,
  getNeighbouringCells,
  revealNeighbours
} from "./gameLogic";

class Game extends Component {
  constructor(props) {
    super(props);
    this.numberOfCells = (this.props.difficulty === 'normal') ? 81 : 256;
    const flags = (this.props.difficulty === 'normal') ? 10 : 50 ;
    this.state = {
      flags,
      flagged: [],
      clicked: [],
      endGame: false
    };
    this.neighbours = [];
    this.values = [];
    this.bombCells = getRandomBombCells(flags,this.numberOfCells);
    for (let i = 0; i < this.numberOfCells; i++) {
      this.neighbours.push(getNeighbouringCells(i, Math.sqrt(this.numberOfCells)));
      this.values.push(
        getNumOfNeighbouringBombs(this.bombCells, this.neighbours[i], i)
      );
    }
  }
  onRightClick(i, e) {
    e.preventDefault();
    if (this.state.clicked.indexOf(i) === -1) {
      let flagged = this.state.flagged;
      if (flagged.indexOf(i) === -1) {
        if (this.state.flags > 0) {
          flagged = flagged.concat(i);
          let newFlags = this.state.flags - 1;
          this.setState({
            flags: newFlags,
            flagged
          });
        }
      } else {
        flagged.splice(flagged.indexOf(i), 1);
        let newFlags = this.state.flags + 1;
        this.setState({
          flags: newFlags,
          flagged
        });
      }
    }
  }

  onLeftClick(data, e) {
    e.preventDefault();
    if (
      this.state.flagged.indexOf(data.index) === -1 ||
      this.state.clicked.indexOf(data.index) === -1
    ) {
      let revealed = revealNeighbours(data.index, data.neighbours, this.values);
      let clicked = this.state.clicked;
      if (Array.isArray(revealed) && revealed.length > 0) {
        let flgd = revealed.reduce(
          (flgd, val) => {
            if (clicked.indexOf(val) === -1) {
              clicked = clicked.concat(val);
              if (this.state.flagged.indexOf(val) !== -1) {
                flgd++;
              }
            }
            return flgd;
          },
          0
        );
        this.setState({
          flags: this.state.flags + flgd,
          clicked
        });
      }
    }
  }

  render() {
    let cells = [];
    let neighbours = this.neighbours;

    for (let i = 0; i < this.numberOfCells; i++) {
      cells.push(
        <Cell
          key={i}
          value={this.values[i]}
          right={this.onRightClick.bind(this, i)}
          left={this.onLeftClick.bind(this, {
            index: i,
            neighbours
          })}
          flag={this.state.flagged.indexOf(i) !== -1}
          isClicked={this.state.clicked.indexOf(i) !== -1}
        >
          {this.state.flagged.indexOf(i) !== -1 && "⚑"}
        </Cell>
      );
    }
    const size = Math.sqrt(this.numberOfCells)*32 +  'px';
    let styles = {
      textAlign: "center",
      width: size,
      background: "grey",
      height: size,
      margin: "0 auto",
      border: "2px solid black"
    };
    return (
      <div className="container">
        <span> {this.state.flags} </span>
        <div className="App" style={styles}>
          {cells}
        </div>
      </div>
    );
  }
}

export default Game;
