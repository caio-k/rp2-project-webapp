import React, {Component} from "react";

import "../../styles/management/management.css";

export default class RemovalConfirmation extends Component {

  render() {

    return (
      <>
        <h6 style={{paddingTop: "10px"}}>Do you really want to remove "{this.props.name}" ?</h6>
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={this.props.handleDelete}>Yes</button>
          <button className="btn btn-danger" onClick={this.props.handleClose}>No</button>
        </div>
      </>
    );
  }
}
