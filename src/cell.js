import React, { Component } from "react";

class Cell extends Component {
  render() {
    let color = "";
    switch (this.props.value % 3) {
      case 1:
        color = "red";
        break;
      case 2:
        color = "blue";
        break;
      default:
        color = "green";
        break;
    }
    let styles = {
      width: "40px",
      height: "40px",
      background: "darkgrey",
      border: "1px solid black",
      float: "left",
      display: 'flex',
    justifyContent:'center',
    aligncontent:'center',
    flexDirection:'column',
      //lineHeight: "40px",
      color
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
