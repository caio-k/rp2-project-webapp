import React, {Component} from "react";
import ExitService from "../../services/exit.service"
import AuthService from "../../services/auth.service"
import Spinner from "../utils/spinner.component";
import PopupMessage from "../utils/popup-message.component";
import Modal from "../utils/modal.component"

import "./css/board-exit.css"
import ReleaseConfirmation from "./release-confirmation.component";

export default class Exits extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderExitLog = this.renderExitLog.bind(this);
    this.releaseStudents = this.releaseStudents.bind(this);
    this.setModalVisualization = this.setModalVisualization.bind(this);

    this.state = {
      exits: [],
      exitLogs: [],
      school: this.props.school,
      exitForExitLog: {},
      loading: true,
      loadingLogs: false,
      alertStatus: false,
      message: "",
      popupSuccess: false,
      isModalVisible: false
    };
  }

  componentDidMount() {
    ExitService.listAllExitsBySchoolId(this.state.school.id).then(
      response => {
        this.setState({
          exits: response.data,
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
          exitLogs: filtered,
          isModalVisible: false
        });
      },
      error => {
        this.handleError(error);

        this.setState({
          isModalVisible: false
        });
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

  setModalVisualization(visible) {
    this.setState({
      isModalVisible: visible
    });
  }

  render() {
    return (
      <div>
        {this.state.loading && (
          <Spinner/>
        )}

        {this.state.alertStatus && (
          <PopupMessage message={this.state.message} success={this.state.popupSuccess}/>
        )}

        {!this.state.loading && (
          <div className="exit__container">
            {this.state.isModalVisible && (
              <Modal onClose={() => this.setModalVisualization(false)}>
                <ReleaseConfirmation name={this.state.exitForExitLog.exitName}
                                     handleRelease={() => this.releaseStudents()}
                                     handleClose={() => this.setModalVisualization(false)}/>
              </Modal>
            )}

            <div className="exit__container__header">
              <p>{this.state.school.name}</p>
              <p>Exits</p>
            </div>

            <div style={{height: "1px", width: "100%", backgroundColor: "#d1d1d1"}}/>

            <div className="exit__container__content">
              <div className="left-side table-overflow">
                <div>
                  <table className="table table-sm table-hover">
                    <thead>
                    <tr>
                      <td style={{fontWeight: "500", border: "none"}}>Select an exit</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.exits.map(this.renderRow)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="right-side">
                {this.state.loadingLogs && (
                  <div style={{marginTop: "20px"}}>
                    <Spinner/>
                  </div>
                )}

                {!this.state.loadingLogs && this.state.exitForExitLog.exitName !== undefined && (
                  <div className="logs__box">
                    <p>{this.state.exitForExitLog.exitName}</p>
                    <div className="table-overflow tb__log">
                      <table className="table table-sm table-hover">
                        <tbody>
                        {this.state.exitLogs.map(this.renderExitLog)}
                        </tbody>
                      </table>
                    </div>
                    <div className="release-btn">
                      <button onClick={() => this.setModalVisualization(true)}>Release Students</button>
                    </div>
                  </div>
                )}

                {!this.state.loadingLogs && this.state.exitForExitLog.exitName === undefined && (
                  <div className="not-selected">
                    <p>No exit selected!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
