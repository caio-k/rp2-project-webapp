import React, {Component} from "react";

import "../../styles/management/management.css";

export default class ReleaseConfirmation extends Component {

  render() {

    return (
      <>
        <h6 style={{paddingTop: "10px"}}>Do you want to release students at "{this.props.name}" ? Make sure there are no
          students in this exit.</h6>
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={this.props.handleRelease}>Yes</button>
          <button className="btn btn-danger" onClick={this.props.handleClose}>No</button>
        </div>
      </>
    );
  }
}
