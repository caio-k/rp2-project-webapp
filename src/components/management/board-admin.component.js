import React, {Component} from "react";
import AuthService from "../../services/auth.service";
import SchoolService from "../../services/school.service"
import NewSchool from "./new-school.component"
import BoardAdminUsers from "./board-admin-users.component";
import BoardAdminPlaces from "./board-admin-places.component";
import BoardAdminExits from "./board-admin-exits.component";
import BoardAdminSchool from "./board-admin-school.component";

import "../../styles/management.css"

export default class BoardAdmin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      school: {}
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    SchoolService.listAdminSchoolByUsername(currentUser.username).then(
      response => {
        if (response.data) {
          SchoolService.setCurrentSchool(response.data);

          this.setState({
            school: response.data
          });
        }
      },
      () => {
        this.setState({
          school: {}
        });
      }
    );
  }

  render() {
    const {school} = this.state;

    return (
      <div className="boards-admin">
        {!school.id && (
          <NewSchool/>
        )}

        {school.id && (
          <>
            <div className="row-board">
              <BoardAdminUsers/>
              <BoardAdminPlaces/>
            </div>
            <div className="row-board">
              <BoardAdminExits/>
              <BoardAdminSchool/>
            </div>
          </>
        )}
      </div>
    );
  }
}
