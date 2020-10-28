import React, {Component} from "react";

import AuthService from "../services/auth.service";
import "../styles/public_form.css"
import PopupMessage from "./utils/popup-message.component";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.goToRegister = this.goToRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      alertStatus: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  goToRegister(e) {
    e.preventDefault();
    this.props.history.push("/register");
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    if (this.state.username && this.state.password) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          const user = AuthService.getCurrentUser();
          if (user.roles.includes("ROLE_ADMIN")) {
            this.props.history.push("/admin");
          } else {
            this.props.history.push("/school");
          }
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.popup(resMessage);
        }
      );
    } else {
      this.popup("All fields are required!");
    }
  }

  popup(message) {
    this.setState({
      message: message,
      alertStatus: true,
      loading: false
    });

    setTimeout(() => this.setState({
      alertStatus: false
    }), 6000);
  }

  render() {
    return (
      <div className="container-form">

        {this.state.alertStatus && (
          <PopupMessage message={this.state.message} success={false}/>
        )}

        <div className="content-form">
          <div className="attraction-column">
            <h2 className="title-form title-form-primary">hello!</h2>
            <p className="description-form">Enter your personal details</p>
            <p className="description-form">and start journey with us</p>
            <button
              type="button"
              className="pf-button pf-button-primary"
              onClick={this.goToRegister}
              disabled={this.state.loading}>
              sign up
            </button>
          </div>

          <div className="info-column">
            <h2 className="title-form title-form-secondary">sign in to SafeSchool</h2>
            <form className="pf-form">
              <input
                type="text"
                placeholder="Username"
                value={this.state.username}
                autoComplete="off"
                onChange={this.onChangeUsername}
                required/>
              <input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChangePassword}
                required/>
              <button
                type="submit"
                className="pf-button pf-button-secondary"
                onClick={this.handleLogin}
                disabled={this.state.loading}>

                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"/>
                )}

                {!this.state.loading && (
                  <span>sign in</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
