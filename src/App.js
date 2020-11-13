import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import logo from "./logo-oficial.png"

import AuthService from "./services/auth.service";

import Login from "./components/public/login.component";
import Register from "./components/public/register.component";
import Home from "./components/homepage/home.component";
import BoardAdmin from "./components/management/board-admin.component";
import BoardExit from "./components/exits/board-exit.component";
import BoardPlace from "./components/places/board-place.component";
import BoardSchool from "./components/board-school.component";
import UsePlace from "./components/places/places";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const {currentUser, showAdminBoard} = this.state;

    return (
      <Router>
        <div>
          <div className="site-header">
            <img
              src={logo}
              alt="SafeSchool"
              width="143"
              height="60"
              className="logo"
            />
            <input type="checkbox" id="chk"/>
            <label htmlFor="chk" className="show-menu-btn">
              ...
            </label>

            <ul className="menu">
              {!currentUser && (
                <a href="/home">Home</a>
              )}

              {showAdminBoard && (
                <a href="/admin">Management</a>
              )}

              {currentUser && !showAdminBoard && (
                <a href="/school">Schools</a>
              )}

              {currentUser ? (
                <>
                  <a href="/place">Places</a>
                  <a href="/exit">Exits</a>
                  <a href="/login" onClick={this.logOut}>LogOut</a>
                  <a href="/" className="current-user-link">
                    <button>{currentUser.username}</button>
                  </a>
                </>
              ) : (
                <>
                  <a href="/login">Sign In</a>
                  <a href="/register">Sign Up</a>
                </>
              )}

              <label htmlFor="chk" className="hide-menu-btn">
                X
              </label>
            </ul>
          </div>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route path="/school" component={BoardSchool}/>
              <Route path="/place" component={BoardPlace}/>
              <Route path="/use-place" component={UsePlace}/>
              <Route path="/exit" component={BoardExit}/>
              <Route path="/admin" component={BoardAdmin}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
