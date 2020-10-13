import React, {Component} from "react";

import "../../styles/management/management.css";

export default class LimitUser extends Component {

  render() {

    return (
      <>
        <h6 style={{paddingTop: "10px"}}>Number not permited in "{this.props.name}-{this.props.id}"</h6>
        <div className="modal-buttons">
          <button className="btn btn-danger" onClick={this.props.handleClose}>Ok</button>
        </div>
      </>
    );
  }
}