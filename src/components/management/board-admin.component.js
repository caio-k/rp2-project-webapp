import React, {Component} from "react";
import AuthService from "../../services/auth.service";
import SchoolService from "../../services/school.service"
import NewSchool from "./new-school.component"
import BoardAdminUsers from "./board-admin-users.component";
import BoardAdminPlaces from "./board-admin-places.component";
import BoardAdminExits from "./board-admin-exits.component";
import BoardAdminSchool from "./board-admin-school.component";
import Spinner from "../utils/spinner.component";

import "../../styles/management/management.css";

export default class BoardAdmin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      school: {},
      loading: true
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    SchoolService.listAdminSchoolByUsername(currentUser.username).then(
      response => {
        if (response.data) {
          SchoolService.setCurrentSchool(response.data);

          this.setState({
            school: response.data,
            loading: false
          });
        }
      },
      () => {
        this.setState({
          loading: false
        });
      }
    );
  }

  render() {
    const {school, loading} = this.state;

    return (
      <div className="boards-admin">
        {loading && (
          <Spinner/>
        )}

        {(!loading && school.id === undefined) && (
          <NewSchool/>
        )}

        {(!loading && school.id !== undefined) && (
          <>
            <div className="row-board">
              <BoardAdminUsers school={school}/>
              <BoardAdminPlaces/>
            </div>
            <div className="row-board">
              <BoardAdminExits/>
              <BoardAdminSchool school={school}/>
            </div>
          </>
        )}
      </div>
    );
  }
}
