import React, {Component} from "react";
import SchoolService from "../../services/school.service"
import UserService from "../../services/user.service"
import Trash from "../../assets/trash.svg"
import MessageAlert from "./message-alert.component";

import "../../styles/management/board-admin-users.css"

export default class BoardAdminUsers extends Component {

  constructor(props) {
    super(props);
    this.onChangeNewTeacherUsername = this.onChangeNewTeacherUsername.bind(this);
    this.handleInsertTeacher = this.handleInsertTeacher.bind(this);
    this.handleDeleteTeacher = this.handleDeleteTeacher.bind(this);
    this.renderRow = this.renderRow.bind(this);

    this.state = {
      teachers: [],
      newTeacherUsername: "",
      message: "",
      success: false
    };
  }

  componentDidMount() {
    SchoolService.listAllTeachersBySchoolId(this.props.school.id).then(
      response => {
        this.setState({
          teachers: response.data
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
    );
  }

  onChangeNewTeacherUsername(e) {
    this.setState({
      newTeacherUsername: e.target.value
    });
  }

  handleInsertTeacher(e) {
    e.preventDefault();

    UserService.addSchool(this.props.school.id, this.state.newTeacherUsername).then(
      response => {
        if (response.data) {
          this.setState({
            teachers: [...this.state.teachers, response.data],
            newTeacherUsername: "",
            message: "User " + response.data.username + " added successfully!",
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
    );
  }

  handleDeleteTeacher(username) {
    UserService.removeSchool(this.props.school.id, username).then(
      response => {
        if (response.data) {
          this.setState({
            teachers: this.state.teachers.filter(function (obj) {
              return obj.username !== username;
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
    );
  }

  renderRow(row) {
    return (
      <tr key={row.userId} style={{lineHeight: "25px"}}>
        <td>{row.username}</td>
        <td style={{cursor: "pointer"}} onClick={() => this.handleDeleteTeacher(row.username)}>
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
          <span>Teachers</span>

          <form className="form-header-board form-inline">
            <div className="form-group">
              <input
                type="text"
                className="input-username form-control fontsize-13"
                autoComplete="off"
                value={this.state.newTeacherUsername}
                placeholder="Username"
                required={true}
                onChange={this.onChangeNewTeacherUsername}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-sm fontsize-13"
                onClick={this.handleInsertTeacher}
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
              <th scope="col">Teacher</th>
              <th scope="col" style={{width: "60px"}}>Remove</th>
            </tr>
            </thead>
            <tbody>
            {this.state.teachers.map(this.renderRow)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
