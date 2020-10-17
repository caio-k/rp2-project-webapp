import React, {Component} from "react";
import ExitService from "../../services/exit.service"
import SchoolService from "../../services/school.service"
import Spinner from "../utils/spinner.component";

import "./css/board-exit.css"

export default class BoardExit extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);

    this.state = {
      exits: [],
      exitLogs: [],
      school: {},
      exitNameForExitLog: "",
      loading: true
    };
  }

  componentDidMount() {
    const currentSchool = SchoolService.getCurrentSchool();

    ExitService.listAllExitsBySchoolId(currentSchool.id).then(
      response => {
        this.setState({
          exits: response.data,
          school: currentSchool,
          loading: false
        });
      },
      error => {
        //  handle error
      }
    );
  }

  openExitLogs(exit) {
    ExitService.allValidTimestampsByExitId(exit.exitId).then(
      response => {
        this.setState({
          exitLogs: response.data,
          exitNameForExitLog: exit.exitName
        });
      },
      error => {
        //  handle error
      }
    )
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

  render() {
    return (
      <div className="container">
        {this.state.loading && (
          <Spinner/>
        )}

        {!this.state.loading && (
          <>
            <div className="exit-board">
              <p>{this.state.school.name}</p>
              <div className="table-overflow">
                <table className="table table-sm table-hover">
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

            {this.state.exitNameForExitLog !== "" && (
              // TO DO
              <span>exit logs...</span>
            )}
          </>
        )}
      </div>
    );
  }
}
