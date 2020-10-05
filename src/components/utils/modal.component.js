import React, {Component} from "react";

export default class Modal extends Component {

  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleOutsideClick(e) {
    if (e.target.id === "custom-modal") {
      this.props.onClose();
    }
  }

  render() {
    return <div id="custom-modal" className="custom-modal" onClick={this.handleOutsideClick}>
      <div className="custom-modal-container">
        <button className="custom-modal-close-button" onClick={this.props.onClose}/>
        <div className="custom-modal-content">{this.props.children}</div>
      </div>
    </div>
  }
}

