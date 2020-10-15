import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import logo from "./logo-safeschool-lateral-tst1.svg"

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import BoardAdmin from "./components/management/board-admin.component";
import BoardExit from "./components/board-exit.component";
import BoardPlace from "./components/places/board-place.component";
import BoardSchool from "./components/board-school.component";
import UsePlace from "./components/places/places";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
      menu: false
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

  toggleMenu() {
    this.setState({menu: !this.state.menu})
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const {currentUser, showAdminBoard} = this.state;
    const show = (this.state.menu) ? "show" : "";

    return (
      <Router>
        <div>
          <nav className="header navbar navbar-expand-lg navbar-light">
            <Link to={"/"} className="navbar-brand">
              <img
                src={logo}
                alt="SafeSchool"
                width="190"
                height="60"
              />
            </Link>
            <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
              <span className="navbar-toggler-icon"/>
            </button>

            <div className={"collapse navbar-collapse " + show}>
              <div className="navbar-nav mr-auto">

                {!currentUser && (
                  <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                      Home
                    </Link>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Management
                    </Link>
                  </li>
                )}

                {currentUser && !showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/school"} className="nav-link">
                      Schools
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link to={"/place"} className="nav-link">
                      Places
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link to={"/exit"} className="nav-link">
                      Exits
                    </Link>
                  </li>
                )}
              </div>

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </nav>

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
