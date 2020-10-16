import React, {Component} from "react";

import "./css/place.css";

export default class LimitUser extends Component {

  render() {

    return (
      <>
        <div className="alert alert-danger place_alert" role="alert">
          Number not permited in "{this.props.name}-{this.props.id}"
        </div>
      </>
    );
  }
}