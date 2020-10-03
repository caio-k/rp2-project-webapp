import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import SchoolService from "../../services/school.service"

import "../../styles/management/management.css"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class ManagementNewSchool extends Component {
  constructor(props) {
    super(props);
    this.onChangeSchoolName = this.onChangeSchoolName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      message: "",
      schoolName: "",
      schoolPrincipal: "",
      loading: false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    this.setState({
      schoolPrincipal: currentUser.username
    });
  }

  onChangeSchoolName(e) {
    this.setState({
      schoolName: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      SchoolService.createSchool(this.state.schoolName, this.state.schoolPrincipal).then(
        () => {
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      )
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {

    return (
      <div className="col-md-12">
        <div className="new-school-form new-school-container">
          <span className="new-school-title">Create New School</span>
          <Form
            onSubmit={this.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="schoolName" className="new-school-form-label">School name</label>
              <Input
                type="text"
                className="form-control"
                name="schoolName"
                value={this.state.schoolName}
                autoComplete="off"
                onChange={this.onChangeSchoolName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="new-school-submit-button btn btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"/>
                )}
                <span>Create School</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}

            <CheckButton
              style={{display: "none"}}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
