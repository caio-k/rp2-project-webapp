import React, { Component } from "react";
import "./css/footer.css"

export default class Footer extends Component {

  getActualYear() {
    return new Date().getFullYear();
  }

  render() {
    return (
      <footer className="footer-site">
        <p>Copyright &copy; {this.getActualYear()}, SafeSchool</p>
      </footer>
    );
  }
}
