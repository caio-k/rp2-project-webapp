import React, {Component} from "react";
import {isEmail} from "validator";

import AuthService from "../../services/auth.service";
import PopupMessage from "../utils/popup-message.component";
import "./css/public_form.css"

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.state = {
      username: "",
      email: "",
      role: "user",
      password: "",
      loading: false,
      message: "",
      alertStatus: false,
      successful: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    })
  }

  goToLogin(e) {
    e.preventDefault();
    this.props.history.push("/login");
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    if (this.allInputsCorrect()) {
      const role = ["user"];
      if (this.state.role === "admin") role.push("admin");

      AuthService.register(
        this.state.username,
        this.state.email,
        role,
        this.state.password
      ).then(
        response => {
          this.popup(response.data.message, true);
          this.setState({
            username: "",
            email: "",
            role: "user",
            password: ""
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.popup(resMessage, false);
        }
      );
    }
  }

  allInputsCorrect() {
    if (!(this.state.username && this.state.password && this.state.email && this.state.role)) {
      this.popup("All fields are required!", false);
      return false;
    } else if (this.state.username.length < 3 || this.state.username.length > 20) {
      this.popup("The username must be between 3 and 20 characters.", false);
      return false;
    } else if (this.state.password.length < 6 || this.state.password.length > 40) {
      this.popup("The password must be between 6 and 40 characters.", false);
      return false;
    } else if (!isEmail(this.state.email)) {
      this.popup("This is not a valid email.", false);
      return false;
    } else {
      return true;
    }
  }

  popup(message, successful) {
    this.setState({
      message: message,
      alertStatus: true,
      loading: false,
      successful: successful
    });

    setTimeout(() => this.setState({
      alertStatus: false
    }), 6000);
  }

  render() {
    return (
      <div className="container-form">

        {this.state.alertStatus && (
          <PopupMessage message={this.state.message} success={this.state.successful}/>
        )}

        <div className="content-form">
          <div className="info-column">
            <h2 className="title-form title-form-secondary">create account</h2>
            <form className="pf-form">
              <input
                type="text"
                placeholder="Username"
                value={this.state.username}
                autoComplete="off"
                onChange={this.onChangeUsername}/>
              <input
                type="text"
                placeholder="Email"
                value={this.state.email}
                autoComplete="off"
                onChange={this.onChangeEmail}/>
              <input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChangePassword}/>
              <div className="input-roles form-check-inline">
                <input type="radio" value="user" id="user-role" checked={this.state.role === "user"}
                       onChange={this.onChangeRole} className="form-check-input"/>
                <label htmlFor="user-role">Teacher</label>
                <input type="radio" value="admin" id="admin-role" checked={this.state.role === "admin"}
                       onChange={this.onChangeRole} className="form-check-input"/>
                <label htmlFor="admin-role">School Principal</label>
              </div>
              <button
                type="submit"
                className="pf-button pf-button-secondary"
                onClick={this.handleRegister}
                disabled={this.state.loading}>

                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"/>
                )}

                {!this.state.loading && (
                  <span>sign up</span>
                )}
              </button>
            </form>
          </div>
          <div className="attraction-column">
            <h2 className="title-form title-form-primary">welcome back!</h2>
            <p className="description-form">To keep connected with us</p>
            <p className="description-form">please login with your personal info</p>
            <button
              type="button"
              className="pf-button pf-button-primary"
              onClick={this.goToLogin}
              disabled={this.state.loading}>
              sign in
            </button>
          </div>
        </div>
      </div>
    );
  }
}
