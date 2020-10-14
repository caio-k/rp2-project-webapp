import React, {Component} from "react";

import "../../styles/management/management.css"

export default class MessageAlert extends Component {

  render() {
    return (
      <div className="form-group" style={{margin: "0", display:"flex"}}>
        <div className={
          this.props.success
            ? "message-alert alert alert-success"
            : "message-alert alert alert-danger"
        }>
          {this.props.message}
        </div>
        <div className={
          this.props.success
            ? "message-alert alert alert-success"
            : "message-alert alert alert-danger"
        } onClick={this.props.onClose}>
          x
        </div>
      </div>
    )
  }
}
