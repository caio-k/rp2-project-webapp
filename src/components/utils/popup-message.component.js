import React, {Component} from "react";
import {CSSTransition} from "react-transition-group";

export default class PopupMessage extends Component {

  render() {
    return <CSSTransition
      in={true}
      timeout={0}
      classNames="alert-position alert"
      appear={true}
    >
      <div className={
        this.props.success ?
          "alert alert-success place_alert" :
          "alert alert-danger place_alert"
      } role="alert">
        {this.props.message}
      </div>
    </CSSTransition>
  }
}

