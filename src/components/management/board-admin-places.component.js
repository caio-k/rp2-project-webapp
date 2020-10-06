import React, {Component} from "react";
import Modal from "../utils/modal.component";
import MessageAlert from "./message-alert.component";
import PlaceService from "../../services/place.service";
import Trash from "../../assets/trash.svg";
import Pencil from "../../assets/pencil.svg"
import Check from "../../assets/check.svg"

export default class BoardAdminPlaces extends Component {

  constructor(props) {
    super(props);
    this.onChangeNewPlaceName = this.onChangeNewPlaceName.bind(this);
    this.setModalVisualization = this.setModalVisualization.bind(this);
    this.handleInsertPlace = this.handleInsertPlace.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setPlaceInformation = this.setPlaceInformation.bind(this);
    this.renderRow = this.renderRow.bind(this);

    this.state = {
      places: [],
      newPlaceName: "",
      message: "",
      success: false,
      isModalVisible: false,
      placeIdToBeDeleted: -1,
      placeNameToBeDeleted: ""
    };
  }

  componentDidMount() {

  }

  onChangeNewPlaceName(e) {
    this.setState({
      newPlaceName: e.target.value
    });
  }

  handleInsertPlace(e) {
    e.preventDefault();

    /*if (this.isValidPlaceName(this.state.newPlaceName)) {
      PlaceService.createPlace(this.state.newPlaceName, this.props.school.id).then(
          response => {
            if (response.data) {
              this.setState({
                places: [...this.state.places, response.data],
                newPlaceName: "",
                message: "Place " + response.data.placeName + " added successfully!",
                success: true
              });

              const placeIndex = this.findPlaceIndexByPlaceId(response.data.placeId);
              this.setPlaceInformation(placeIndex, "backupName", response.data.placeName);
            }
          },
          error => {
            this.handleError(error);
          }
      )
    }*/
  }

  findPlaceIndexByPlaceId(placeId) {
    return this.state.exits.findIndex(place => {
      return place.placeId === placeId
    });
  }

  isValidPlaceName(newPlaceName) {
    if (newPlaceName === "") {
      this.setState({
        message: "Oops, Place name can't be empty.",
        success: false
      });
      return false;
    } else if (this.state.places.filter(function (place) {
      return place.placeName === newPlaceName
    }).length > 0) {
      this.setState({
        message: "Oops, Place name already exists at the school.",
        success: false
      });
      return false;
    }
    return true;
  }

  handleError(error) {
    const resMessage =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();

    this.setState({
      message: resMessage,
      success: false,
      isModalVisible: false
    });
  }

  handleDelete(placeId) {
    PlaceService.deletePlace(placeId).then(
        response => {
          if (response.data) {
            this.setState({
              places: this.state.places.filter(function (obj) {
                return obj.placeId !== placeId;
              }),
              message: response.data.message,
              success: true,
              isModalVisible: false
            });
          }
        },
        error => {
          this.handleError(error);
        }
    )
  }

  handleUpdate(placeId) {
    const placeIndex = this.findPlaceIndexByPlaceId(placeId);

    if (this.state.places[placeIndex].updating) {
      PlaceService.updatePlace(placeId, this.state.exits[placeIndex].exitName).then(
          response => {
            this.setState({
              message: response.data.message,
              success: true,
            });
            this.setPlaceInformation(placeIndex, "backupName", this.state.places[placeIndex].placeName);
            this.setPlaceInformation(placeIndex, "updating", false);
          },
          error => {
            this.handleError(error);
            this.setPlaceInformation(placeIndex, "exitName", this.state.places[placeIndex].backupName);
            this.setPlaceInformation(placeIndex, "updating", false);
          }
      );
    } else {
      this.setPlaceInformation(placeIndex, "updating", true);
    }
  }

  setPlaceInformation(placeIndex, field, value) {
    const places = [...this.state.places];
    const place = {...places[placeIndex]};
    place[field] = value;
    places[placeIndex] = place;
    this.setState({places});
  }

  setModalVisualization(visible,placeIdToBeDeleted, placeNameToBeDeleted) {
    this.setState({
      isModalVisible: visible,
      placeIdToBeDeleted: placeIdToBeDeleted,
      placeNameToBeDeleted: placeNameToBeDeleted
    });
  }

  renderRow(row) {
    const placeIndex = this.findPlaceIndexByPlaceId(row.placeId);

    return (
        <tr key={row.placeId}>
          <td>
            <input
                style={{maxHeight: "25px"}}
                type="text"
                className="form-control w-100 fontsize-13"
                disabled={this.state.places[placeIndex].updating ? "" : "disabled"}
                value={this.state.places[placeIndex].placeName}
                autoComplete="off"
                onChange={(e) => this.setPlaceInformation(placeIndex, "placeName", e.target.value)}/>
          </td>
          <td style={{cursor: "pointer"}} onClick={() => this.handleUpdate(row.placeId)}>
            <img
                src={row.updating ? Check : Pencil}
                alt="Update"
                className="boards-admin-icon margin-left-16"
            />
          </td>
          <td style={{cursor: "pointer"}}
              onClick={() => this.setModalVisualization(true, row.placeId, this.state.places[placeIndex].backupName)}>
            <img
                src={Trash}
                alt="Remove"
                className="boards-admin-icon margin-left-16"
            />
          </td>
          <td style={{cursor: "pointer"}} onClick={() => this.handleUpdate(row.placeId)}>
            <img
                src={row.updating ? Check : Pencil}
                alt="View"
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
            <span>Places</span>

            <form className="form-header-board form-inline">
              <div className="form-group">
                <button style={{marginLeft: "150px"}}
                    className="btn btn-primary btn-sm fontsize-13"
                    onClick={this.handleInsertPlace}
                >
                  add
                </button>
              </div>
            </form>
          </div>

          {this.state.isModalVisible && (
              <Modal onClose={() => this.setModalVisualization(false)}>
                <h6 style={{paddingTop: "10px"}}>Do you really want to delete the Place "{this.state.placeNameToBeDeleted}"
                  ?</h6>
                <div className="modal-buttons">
                  <button className="btn btn-primary" onClick={() => this.handleDelete(this.state.placeIdToBeDeleted)}>Yes
                  </button>
                  <button className="btn btn-danger" onClick={() => this.setModalVisualization(false)}>No</button>
                </div>
              </Modal>
          )}

          {this.state.message && (
              <MessageAlert success={this.state.success} message={this.state.message}/>
          )}

          <div className="table-overflow">
            <table className="table table-sm table-hover fontsize-13">
              <thead>
              <tr>
                <th scope="col">Place</th>
                <th scope="col" style={{width: "48px"}}>View</th>
                <th scope="col" style={{width: "60px"}}>Update</th>
                <th scope="col" style={{width: "60px"}}>Remove</th>
              </tr>
              </thead>
              <tbody>
              {this.state.places.map(this.renderRow)}
              </tbody>
            </table>
          </div>


        </div>
    );
  }
}
