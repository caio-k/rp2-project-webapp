import React, {Component} from "react";

import AuthService from "../services/auth.service";
import SchoolService from "../services/school.service"

import "../styles/school_selector.css"

export default class BoardSchool extends Component {
  constructor(props) {
    super(props);
    this.onSelectSchool = this.onSelectSchool.bind(this);

    this.state = {
      message: "",
      schools: []
    };
  }

  onSelectSchool(school) {
    SchoolService.setCurrentSchool(school);
    this.props.history.push("/place");
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    SchoolService.listAllSchoolsByUsername(currentUser.username).then(
      response => {
        if (response.data.length) {
          this.setState({
            schools: response.data
          });
        } else {
          this.setState({
            message: "Oops, you are not registered in any school. Please contact your school principal and ask to be added."
          });
        }
      },
      error => {
        this.setState({
          message:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    )
  }

  render() {
    const {message, schools} = this.state;

    return (
      <div className="board">
        <div className="board-header">
          <span>Choose a school</span>
        </div>

        {schools.length > 0 && (
          <>
            {schools.map(school =>
              <div className="card-school" key={school.id} onClick={() => this.onSelectSchool(school)}>
                <div className="header">
                  {school.name}
                </div>
                <div className="content">
                  School Principal: {school.schoolPrincipalUsername}
                </div>
              </div>
            )}
          </>
        )}

        {schools.length === 0 && (
          <span className="message">{message}</span>
        )}
      </div>
    );
  }
}
