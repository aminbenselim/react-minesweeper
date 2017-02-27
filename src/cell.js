import React, { Component } from "react";

class Cell extends Component {
  render() {
    return (
      <div
        className="cell"
        onContextMenu={this.props.right}
        onClick={this.props.left}
      >
      {this.props.children}
      </div>
    );
  }
}
export default Cell;
