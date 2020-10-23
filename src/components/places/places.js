import React, {Component} from "react";
import PlaceComponent from './place';
import PlaceService from '../../services/place.service';
import AuthService from "../../services/auth.service";
import UsePlaceService from "../../services/use-place.service";
import UserService from "../../services/user.service";
import Spinner from "../utils/spinner.component";
import Refresh from "../../assets/refresh.svg";
import './css/places.css';
import '../../styles/tooltip.css'

export default class Places extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderPlaces: [],
      allUses: [],
      loading1: true,
      loading2: true,
      refreshing: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    PlaceService.listAllPlacesWithFavoriteBySchool(this.props.location.state.school.id, user.username).then(
      res => {
        const placesToRender = res.data.filter((item) => {
          return item.type === this.props.location.state.type
        });

        this.setState({
          renderPlaces: placesToRender,
          loading1: false
        });

        this.sortPlaces();
      }
    );

    UsePlaceService.listAllUses(this.props.location.state.type, this.props.location.state.school.id).then(
      response => {
        this.setState({
          allUses: response.data,
          loading2: false
        });
      }
    );
  }

  refreshAllUses() {
    this.setState({
      refreshing: true
    });

    UsePlaceService.listAllUses(this.props.location.state.type, this.props.location.state.school.id).then(
      response => {
        this.setState({
          allUses: response.data,
          refreshing: false
        });

        this.state.renderPlaces.forEach(element => {
          element.ref.loadData();
        });
      }
    );
  }

  getAllUsesByPlaceId(id) {
    return this.state.allUses.filter(item => {
      return item.placeId === id
    });
  }

  sortPlaces() {
    const renderPlaces = [...this.state.renderPlaces];

    renderPlaces.sort(function (a, b) {
      return a.favorite && !b.favorite ? -1 :
        !a.favorite && b.favorite ? 1 :
          a.name < b.name ? -1 :
            b.name < a.name ? 1 : 0
    });

    this.setState({renderPlaces});
  }

  favoritePlaces(itemId) {
    const currentUser = AuthService.getCurrentUser();

    const itemIndex = this.state.renderPlaces.findIndex(element => {
      return element.placeId === itemId;
    });

    if (this.state.renderPlaces[itemIndex].favorite) {
      UserService.removeFavoritePlace(currentUser.username, itemId).then(
        () => {
          this.inverseFavorite(itemIndex);
        }
      );
    } else {
      UserService.addFavoritePlace(currentUser.username, itemId).then(
        () => {
          this.inverseFavorite(itemIndex);
        }
      );
    }
  }

  inverseFavorite(itemIndex) {
    const renderPlaces = [...this.state.renderPlaces];
    const place = {...renderPlaces[itemIndex]};
    place["favorite"] = !place["favorite"];
    renderPlaces[itemIndex] = place;
    this.setState({renderPlaces});
  }

  render() {
    return (
      <div className="container">

        {(this.state.loading1 || this.state.loading2) && (
          <Spinner/>
        )}

        {!(this.state.loading1 || this.state.loading2) && (
          <>
            <div className="place_board_header">
              <p>{this.props.location.state.school.name}</p>
              <div className="custom-tooltip" data-tooltip="Refresh">
                <img
                  src={Refresh}
                  alt="Refresh"
                  className={this.state.refreshing ? "spin" : ""}
                  onClick={() => this.refreshAllUses()}
                />
              </div>
            </div>
            {this.state.renderPlaces.length > 0 && (
              <div className="places_cards">
                {this.state.renderPlaces.map((item) => (
                  <PlaceComponent
                    key={item.placeId}
                    id={item.placeId}
                    name={item.name}
                    type={item.type}
                    max={item.maxPeople}
                    limit_time={item.limitTimeSeconds}
                    favorite={item.favorite}
                    school={this.props.school}
                    uses={this.getAllUsesByPlaceId(item.placeId)}
                    onFavorite={() => this.favoritePlaces(item.placeId)}
                    onRef={ref => (item.ref = ref)}
                  />
                ))}
              </div>
            )}

            {this.state.renderPlaces.length === 0 && (
              <div className="board">
                <div className="board-header">
                  <span>Places</span>
                </div>
                <span className="message">There are no places registered for this category yet.</span>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
