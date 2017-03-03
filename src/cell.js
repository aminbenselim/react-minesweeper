import React, { Component } from "react";

class Cell extends Component {
  render() {
    let styles = {
      width: "40px",
      height: "40px",
      background: "darkorchid",
      border: "1px solid",
      float: "left"

    };

    return (
      <div
        className="cell"
        style={styles}
        onContextMenu={this.props.right}
        onClick={this.props.left}
      >
        {this.props.isClicked ? this.props.value : this.props.children}
      </div>
    );
  }
}
export default Cell;
