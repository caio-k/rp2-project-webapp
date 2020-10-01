import React, {Component} from "react";
import SchoolService from "../../services/school.service"

import Pencil from "../../assets/pencil.svg"
import Check from "../../assets/check.svg"

import "../../styles/management/board-admin-school.css"
import MessageAlert from "./message-alert.component";

export default class BoardAdminSchool extends Component {

  constructor(props) {
    super(props);
    this.onChangeSchoolName = this.onChangeSchoolName.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.state = {
      schoolName: this.props.school.name,
      school: this.props.school,
      disabledInput: true,
      message: "",
      updatedStatus: false
    };
  }

  onChangeSchoolName(e) {
    this.setState({
      schoolName: e.target.value
    });
  }

  handleUpdate(e) {
    e.preventDefault();

    if (this.state.disabledInput) {
      this.setState({
        disabledInput: false
      });
    } else {
      SchoolService.updateSchool(this.state.school.id, this.state.schoolName).then(
        response => {
          this.setState({
            disabledInput: true,
            message: response.data.message,
            updatedStatus: true,
          });

          this.setState(prevState => ({
            school: {
              ...prevState.school,
              name: this.state.schoolName
            }
          }));

          SchoolService.setCurrentSchool(this.state.school);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            disabledInput: true,
            message: resMessage,
            updatedStatus: false
          });
        }
      );
    }
  }

  render() {

    return (
      <div className="cards-admin">
        <div className="boards-admin-header">
          <span>School</span>
        </div>

        {this.state.message && (
          <MessageAlert success={this.state.updatedStatus} message={this.state.message}/>
        )}

        <form className="form-inline">
          <div className="boards-admin-school-input form-group m-2">
            <input
              type="text"
              className="form-control w-100 fontsize-13"
              disabled={this.state.disabledInput ? "disabled" : ""}
              value={this.state.schoolName}
              autoComplete="off"
              onChange={this.onChangeSchoolName}/>
          </div>
          <button className="btn m-2" onClick={this.handleUpdate}>
            <img
              src={this.state.disabledInput ? Pencil : Check}
              alt="update"
              className="boards-admin-icon"
            />
          </button>
        </form>
      </div>
    );
  }
}
