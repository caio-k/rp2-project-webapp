import React, {Component} from "react";
import ExitService from "../../services/exit.service"
import AuthService from "../../services/auth.service"
import Spinner from "../utils/spinner.component";
import PopupMessage from "../utils/popup-message.component";

import "./css/board-exit.css"

export default class Exits extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderExitLog = this.renderExitLog.bind(this);
    this.releaseStudents = this.releaseStudents.bind(this);

    this.state = {
      exits: [],
      exitLogs: [],
      school: this.props.school,
      exitForExitLog: {},
      loading: true,
      loadingLogs: false,
      alertStatus: false,
      message: "",
      popupSuccess: false
    };
  }

  componentDidMount() {
    ExitService.listAllExitsBySchoolId(this.state.school.id).then(
      response => {
        this.setState({
          exits: response.data,
          school: this.state.school,
          loading: false
        });
      },
      error => {
        this.handleError(error);

        this.setState({
          loading: false
        });
      }
    );
  }

  openExitLogs(exit) {
    this.setState({
      loadingLogs: true
    });

    ExitService.allValidTimestampsByExitId(exit.exitId).then(
      response => {
        this.setState({
          exitLogs: response.data,
          exitForExitLog: exit,
          loadingLogs: false
        });
      },
      error => {
        this.handleError(error);

        this.setState({
          loadingLogs: false
        });
      }
    )
  }

  releaseStudents() {
    const currentUser = AuthService.getCurrentUser();

    ExitService.addExitLog(currentUser.username, this.state.exitForExitLog.exitId).then(
      response => {
        let filtered = this.state.exitLogs.filter(element => {
          return element.message.split(' ')[2] !== currentUser.username
        });

        filtered.push(response.data);

        this.setState({
          exitLogs: filtered
        });
      },
      error => {
        this.handleError(error);
      }
    )
  }

  handleError(error) {
    const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    this.popup(resMessage, false);
  }

  popup(message, popupSuccess) {
    this.setState({
      message: message,
      alertStatus: true,
      popupSuccess: popupSuccess
    });

    setTimeout(() => this.setState({
      alertStatus: false
    }), 3000);
  }

  renderRow(row) {
    return (
      <tr key={row.exitId} onClick={() => this.openExitLogs(row)}>
        <td>
          <div><span>{row.exitName}</span></div>
        </td>
      </tr>
    );
  }

  renderExitLog(row) {
    return (
      <tr key={row.message}>
        <td>
          <div><span>{row.message}</span></div>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div className="container">
        {this.state.loading && (
          <Spinner/>
        )}

        {this.state.alertStatus && (
          <PopupMessage message={this.state.message} success={this.state.popupSuccess}/>
        )}

        <div className="exit__container">
          {!this.state.loading && (
            <>
              <div className="exit-board">
                <p>{this.state.school.name}</p>
                <div className="table-overflow tb__content">
                  <table className="table table-sm table-hover tb__exits">
                    <thead>
                    <tr>
                      <th scope="col">Choose an exit</th>
                    </tr>
                    </thead>
                    <tbody>
                      {this.state.exits.map(this.renderRow)}
                    </tbody>
                  </table>
                </div>
              </div>

              {this.state.loadingLogs && (
                <div style={{marginTop: "20px"}}>
                  <Spinner/>
                </div>
              )}

              {!this.state.loadingLogs && this.state.exitForExitLog.exitName !== undefined && (
                <div className="exit-log-board">
                  <p>{this.state.exitForExitLog.exitName}</p>
                  <div className="table-overflow logs tb__log">
                    <table className="table table-sm table-hover">
                      <tbody>
                      {this.state.exitLogs.map(this.renderExitLog)}
                      </tbody>
                    </table>
                  </div>
                  <div className="release-btn">
                    <button onClick={() => this.releaseStudents()}>Release Students</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
