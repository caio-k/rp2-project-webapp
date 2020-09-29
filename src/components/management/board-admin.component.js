import React, {Component} from "react";
import AuthService from "../../services/auth.service";
import SchoolService from "../../services/school.service"
import NewSchool from "./new-school.component"

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
      <div>
        {!school.id && (
          <NewSchool/>
        )}

        {school.id && (
          <span> board admin </span>
        )}
      </div>
    );
  }
}
