import React, {Component} from "react";

export default class MessageContainer extends Component {

  render() {
    return (
      <div className="board">
        <div className="board-header">
          <span>{this.props.header}</span>
        </div>
        <span
          className="message">{this.props.message}</span>
      </div>
    );
  }
}
