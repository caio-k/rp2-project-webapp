import React, {Component} from "react";

import "../../styles/management/management.css";
import Form from "react-validation/build/form";

import PlaceService from "../../services/place.service";

export default class PlaceForm extends Component {

  constructor(props) {
    super(props);
    this.onChangePlaceName = this.onChangePlaceName.bind(this);
    this.onChangePlaceType = this.onChangePlaceType.bind(this);
    this.onChangeMaxPeople = this.onChangeMaxPeople.bind(this);
    this.handleInsertPlace = this.handleInsertPlace.bind(this);
    this.handleUpdatePlace = this.handleUpdatePlace.bind(this);

    this.state = {
      placeId: this.props.placeInEvidence.placeId || -1,
      placeName: this.props.placeInEvidence.name || "",
      placeType: this.props.placeInEvidence.type || "WOMEN_BATHROOM",
      maxPeople: this.props.placeInEvidence.maxPeople || 0,
      timeLimit: 500, //default
      readOnly: this.props.readOnly || false,
      create: !this.props.placeInEvidence.name,
      message: "",
      successful: false,
      submitting: false
    }
  }

  onChangePlaceName(e) {
    this.setState({
      placeName: e.target.value
    });
  }

  onChangePlaceType(e) {
    this.setState({
      placeType: e.target.value
    });
  }

  onChangeMaxPeople(e) {
    this.setState({
      maxPeople: e.target.value
    });
  }

  handleInsertPlace(e) {
    e.preventDefault();

    this.setState({
      message: "",
      submitting: true
    });

    if (this.validateInformation()) {
      PlaceService.createPlace(
        this.state.placeName,
        this.state.timeLimit,
        this.state.maxPeople,
        this.state.placeType,
        this.props.schoolId
      ).then(
        response => {
          if (response.data) {
            this.setState({
              placeName: "",
              placeType: "WOMEN_BATHROOM",
              maxPeople: 0,
              message: "Place created successfully!",
              successful: true,
              submitting: false
            });
            this.props.onAdd(response.data);
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
            submitting: false,
            message: resMessage
          });
        }
      )
    } else {
      this.setState({
        submitting: false
      });
    }
  }

  handleUpdatePlace(e) {
    e.preventDefault();

    this.setState({
      message: "",
      submitting: true
    });

    if (this.validateInformation()) {
      PlaceService.updatePlace(
        this.state.placeId,
        this.state.placeName,
        this.state.timeLimit,
        this.state.maxPeople,
        this.state.placeType
      ).then(
        response => {
          if (response.data) {
            this.setState({
              message: "Place updated successfully!",
              successful: true,
              submitting: false
            });

            const placeId = this.state.placeId;
            const name = this.state.placeName;
            const type = this.state.placeType;
            const maxPeople = this.state.maxPeople;
            const limitTimeSeconds = this.state.timeLimit;

            this.props.onUpdate({
              placeId, name, type, maxPeople, limitTimeSeconds
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
            submitting: false,
            message: resMessage
          });
        }
      )
    } else {
      this.setState({
        submitting: false
      });
    }
  }

  validateInformation() {
    if (!this.state.placeName) {
      this.setMessage("Place name can't be empty.", false);
      return false;
    } else if (this.state.maxPeople < 1) {
      this.setMessage("The maximum number of people must be greater than 1.", false);
      return false;
    }
    return true;
  }

  setMessage(message, successful) {
    this.setState({
      message: message,
      successful: successful
    });
  }

  render() {
    return (
      <>
        <h6 style={{paddingTop: "10px", textAlign: "center"}}>
          {this.state.readOnly ? "Infos" : (this.state.create ? "Create new place" : "Update place")}
        </h6>
        <Form onSubmit={this.state.create ? this.handleInsertPlace : this.handleUpdatePlace}>
          <div>
            <div className="form-group">
              <label htmlFor="placeName">Name</label>
              <input
                type="text"
                disabled={this.state.readOnly}
                className="form-control form-control-sm"
                name="placeName"
                value={this.state.placeName}
                autoComplete="off"
                onChange={this.onChangePlaceName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="placeType">Type</label>
              <select className="form-control form-control-sm" onChange={this.onChangePlaceType}
                      value={this.state.placeType} disabled={this.state.readOnly}>
                <option value="WOMEN_BATHROOM">Ladies room</option>
                <option value="MEN_BATHROOM">Men's room</option>
                <option value="DRINKING_FOUNTAIN">Drinking fountain</option>
                <option value="YARD">Yard</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="maxPeople">Maximum people</label>
              <input
                type="number"
                disabled={this.state.readOnly}
                className="form-control form-control-sm"
                name="maxPeople"
                value={this.state.maxPeople}
                autoComplete="off"
                onChange={this.onChangeMaxPeople}
              />
            </div>

            {!this.state.readOnly && (
              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={this.state.submitting}>
                  {this.state.submitting && (
                    <span className="spinner-border spinner-border-sm"/>
                  )}
                  <span>{this.state.create ? "Create" : "Update"}</span>
                </button>
              </div>
            )}
          </div>

          {this.state.message && (
            <div className="form-group">
              <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"}
                   role="alert" style={{textAlign: "center"}}>
                {this.state.message}
              </div>
            </div>
          )}
        </Form>
      </>
    );
  }
}
