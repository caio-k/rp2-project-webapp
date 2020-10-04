import React, {Component} from "react";
import MessageAlert from "./message-alert.component";
import ExitService from "../../services/exit.service"
import Trash from "../../assets/trash.svg";
import Pencil from "../../assets/pencil.svg"
import Check from "../../assets/check.svg"

export default class BoardAdminExits extends Component {

  constructor(props) {
    super(props);
    this.onChangeNewExitName = this.onChangeNewExitName.bind(this);
    this.handleInsertExit = this.handleInsertExit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setExitInformation = this.setExitInformation.bind(this);
    this.renderRow = this.renderRow.bind(this);

    this.state = {
      exits: [],
      newExitName: "",
      message: "",
      success: false,
    };
  }

  componentDidMount() {
    ExitService.listAllExitsBySchoolId(this.props.school.id).then(
      response => {
        this.setState({
          exits: response.data
        });

        this.state.exits.forEach(exit => {
          const exitIndex = this.findExitIndexByExitId(exit.exitId);
          this.setExitInformation(exitIndex, "backupName", exit.exitName);
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage,
          success: false
        });
      }
    )
  }

  onChangeNewExitName(e) {
    this.setState({
      newExitName: e.target.value
    });
  }

  handleInsertExit(e) {
    e.preventDefault();

    if (this.isValidExitName(this.state.newExitName)) {
      ExitService.createExit(this.state.newExitName, this.props.school.id).then(
        response => {
          if (response.data) {
            this.setState({
              exits: [...this.state.exits, response.data],
              newExitName: "",
              message: "Exit " + response.data.exitName + " added successfully!",
              success: true
            });

            const exitIndex = this.findExitIndexByExitId(response.data.exitId);
            this.setExitInformation(exitIndex, "backupName", response.data.exitName);
          }
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            message: resMessage,
            success: false
          });
        }
      )
    }
  }

  handleUpdate(exitId) {
    const exitIndex = this.findExitIndexByExitId(exitId);

    if (this.state.exits[exitIndex].updating) {
      ExitService.updateExit(exitId, this.state.exits[exitIndex].exitName).then(
        response => {
          this.setState({
            message: response.data.message,
            success: true,
          });
          this.setExitInformation(exitIndex, "backupName", this.state.exits[exitIndex].exitName);
          this.setExitInformation(exitIndex, "updating", false);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            message: resMessage,
            success: false
          });
          this.setExitInformation(exitIndex, "exitName", this.state.exits[exitIndex].backupName);
          this.setExitInformation(exitIndex, "updating", false);
        }
      );
    } else {
      this.setExitInformation(exitIndex, "updating", true);
    }
  }

  handleDelete(exitId) {
    ExitService.deleteExit(exitId).then(
      response => {
        if (response.data) {
          this.setState({
            exits: this.state.exits.filter(function (obj) {
              return obj.exitId !== exitId;
            }),
            message: response.data.message,
            success: true
          });
        }
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage,
          success: false
        });
      }
    )
  }

  isValidExitName(newExitName) {
    if (newExitName === "") {
      this.setState({
        message: "Oops, exit name can't be empty.",
        success: false
      });
      return false;
    } else if (this.state.exits.filter(function (exit) {
      return exit.exitName === newExitName
    }).length > 0) {
      this.setState({
        message: "Oops, exit name already exists at the school.",
        success: false
      });
      return false;
    }
    return true;
  }

  setExitInformation(exitIndex, field, value) {
    const exits = [...this.state.exits];
    const exit = {...exits[exitIndex]};
    exit[field] = value;
    exits[exitIndex] = exit;
    this.setState({exits});
  }

  findExitIndexByExitId(exitId) {
    return this.state.exits.findIndex(exit => {
      return exit.exitId === exitId
    });
  }

  renderRow(row) {
    const exitIndex = this.findExitIndexByExitId(row.exitId);

    return (
      <tr key={row.exitId}>
        <td>
          <input
            style={{maxHeight: "25px"}}
            type="text"
            className="form-control w-100 fontsize-13"
            disabled={this.state.exits[exitIndex].updating ? "" : "disabled"}
            value={this.state.exits[exitIndex].exitName}
            autoComplete="off"
            onChange={(e) => this.setExitInformation(exitIndex, "exitName", e.target.value)}/>
        </td>
        <td style={{cursor: "pointer"}} onClick={() => this.handleUpdate(row.exitId)}>
          <img
            src={row.updating ? Check : Pencil}
            alt="Update"
            className="boards-admin-icon margin-left-16"
          />
        </td>
        <td style={{cursor: "pointer"}} onClick={() => this.handleDelete(row.exitId)}>
          <img
            src={Trash}
            alt="Remove"
            className="boards-admin-icon margin-left-16"
          />
        </td>
      </tr>
    )
  }

  render() {

    return (
      <div className="cards-admin">
        <div className="boards-admin-header">
          <span>Exits</span>

          <form className="form-header-board form-inline">
            <div className="form-group">
              <input
                type="text"
                className="input-username form-control fontsize-13"
                autoComplete="off"
                value={this.state.newExitName}
                placeholder="Exit name"
                onChange={this.onChangeNewExitName}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-sm fontsize-13"
                onClick={this.handleInsertExit}
              >
                add
              </button>
            </div>
          </form>
        </div>

        {this.state.message && (
          <MessageAlert success={this.state.success} message={this.state.message}/>
        )}

        <div className="table-overflow">
          <table className="table table-sm table-hover fontsize-13">
            <thead>
            <tr>
              <th scope="col">Exit</th>
              <th scope="col" style={{width: "60px"}}>Update</th>
              <th scope="col" style={{width: "60px"}}>Remove</th>
            </tr>
            </thead>
            <tbody>
            {this.state.exits.map(this.renderRow)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
