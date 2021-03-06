import React, {Component} from "react";

import AuthService from "../services/auth.service";
import SchoolService from "../services/school.service";
import Spinner from "../components/utils/spinner.component";

import "../styles/school_selector.css"

export default class BoardSchool extends Component {
  constructor(props) {
    super(props);
    this.onSelectSchool = this.onSelectSchool.bind(this);

    this.state = {
      message: "",
      schools: [],
      loading: true
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
            schools: response.data,
            loading: false
          });
        } else {
          this.setState({
            message: "Oops, you are not registered in any school. Please contact your school principal and ask to be added.",
            loading: false
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
            error.toString(),
          loading: false
        });
      }
    )
  }

  render() {
    const {message, schools} = this.state;

    return (
      <>
        {this.state.loading ?
          <Spinner/> :
          <div className="board">
            <div className="board-header">
              <span>Select a school</span>
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
        }
      </>
    );
  }
}
