import React, {Component} from "react";
import Modal from "../utils/modal.component";
import MessageAlert from "./message-alert.component";
import PlaceService from "../../services/place.service";
import Info from "../../assets/info.svg"
import Pencil from "../../assets/pencil.svg"
import Trash from "../../assets/trash.svg";
import RemovalConfirmation from "./removal-confirmation.component";
import PlaceForm from "./place-form.component";

export default class BoardAdminPlaces extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.addPlaceToState = this.addPlaceToState.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.setInfoModalVisualization = this.setInfoModalVisualization.bind(this);
    this.setDeleteModalVisualization = this.setDeleteModalVisualization.bind(this);

    this.state = {
      places: [],
      message: "",
      success: false,
      isInfoModalVisible: false,
      isDeleteModalVisible: false,
      placeInEvidence: {
        placeId: -1,
        name: "",
        type: "",
        maxPeople: 0,
        limitTimeSeconds: 0
      },
      placeInEvidenceReadOnly: false
    };
  }

  componentDidMount() {
    PlaceService.listAllPlacesBySchoolId(this.props.school.id).then(
      response => {
        this.setState({
          places: response.data
        });
      },
      error => {
        this.handleError(error);
      }
    )
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
            isInfoModalVisible: false,
            isDeleteModalVisible: false
          });
        }
      },
      error => {
        this.handleError(error);
      }
    )
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
      isInfoModalVisible: false,
      isDeleteModalVisible: false
    });
  }

  setInfoModalVisualization(visible, placeInEvidence, placeInEvidenceReadOnly) {
    this.setState({
      isInfoModalVisible: visible,
      placeInEvidence: placeInEvidence,
      placeInEvidenceReadOnly: placeInEvidenceReadOnly
    });
  }

  setDeleteModalVisualization(visible, placeInEvidence) {
    this.setState({
      isDeleteModalVisible: visible,
      placeInEvidence: placeInEvidence
    });
  }

  addPlaceToState(place) {
    this.setState({
      places: [...this.state.places, place]
    });
  }

  updatePlaceOfState(place) {
    const placeIndex = this.findPlaceIndexByExitId(place.placeId);
    const places = [...this.state.places];
    places[placeIndex] = place
    this.setState({places});
  }

  findPlaceIndexByExitId(placeId) {
    return this.state.places.findIndex(place => {
      return place.placeId === placeId
    });
  }

  renderRow(row) {

    return (
      <tr key={row.placeId}>
        <td>{row.name}</td>
        <td className="td-icon"
            onClick={() => this.setInfoModalVisualization(true, row, true)}>
          <img
            src={Info}
            alt="Info"
            className="boards-admin-icon margin-left-16"
          />
        </td>
        <td className="td-icon"
            onClick={() => this.setInfoModalVisualization(true, row, false)}>
          <img
            src={Pencil}
            alt="Update"
            className="boards-admin-icon margin-left-16"
          />
        </td>
        <td className="td-icon"
            onClick={() => this.setDeleteModalVisualization(true, row)}>
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
          <span>Places</span>

          <button
            className="btn btn-primary btn-sm fontsize-13"
            onClick={() => this.setInfoModalVisualization(true, {}, false)}>
            add
          </button>
        </div>

        {this.state.message && (
          <MessageAlert success={this.state.success} message={this.state.message}/>
        )}

        {this.state.isInfoModalVisible && (
          <Modal onClose={() => this.setInfoModalVisualization(false)}>
            <PlaceForm schoolId={this.props.school.id}
                       placeId={this.state.placeInEvidence.placeId}
                       placeName={this.state.placeInEvidence.name}
                       placeType={this.state.placeInEvidence.type}
                       maxPeople={this.state.placeInEvidence.maxPeople}
                       timeLimit={this.state.placeInEvidence.limitTimeSeconds}
                       readOnly={this.state.placeInEvidenceReadOnly}
                       onAdd={place => this.addPlaceToState(place)}
                       onUpdate={place => this.updatePlaceOfState(place)}
            />
          </Modal>
        )}

        {this.state.isDeleteModalVisible && (
          <Modal onClose={() => this.setDeleteModalVisualization(false)}>
            <RemovalConfirmation name={this.state.placeInEvidence.name}
                                 handleDelete={() => this.handleDelete(this.state.placeInEvidence.placeId)}
                                 handleClose={() => this.setDeleteModalVisualization(false)}/>
          </Modal>
        )}

        <div className="table-overflow">
          <table className="table table-sm table-hover fontsize-13">
            <thead>
            <tr>
              <th scope="col">Place</th>
              <th scope="col" className="th-icon">Info</th>
              <th scope="col" className="th-icon">Update</th>
              <th scope="col" className="th-icon">Remove</th>
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
