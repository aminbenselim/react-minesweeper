import React, { Component } from 'react';
import './App.css';
import Cell from './cell'

class App extends Component {
  render() {
    let cells = [];
    for(let i = 0; i < 100;i++) cells.push(<Cell key={i} />);
    return (
      <div className="App">
        {cells}
      </div>
    );
  }
}

export default App;
