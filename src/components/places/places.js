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

    if (this.props.location.state.type === "FAVORITE") {
      PlaceService.listAllFavoritePlacesBySchool(this.props.location.state.school.id, user.username).then(
        response => {
          this.setState({
            renderPlaces: response.data,
            loading1: false
          });

          this.sortPlaces();
        }
      );

      UsePlaceService.listAllUsesOfFavoritePlacesBySchool(user.username, this.props.location.state.school.id).then(
        response => {
          this.setState({
            allUses: response.data,
            loading2: false
          });
        }
      );
    } else {
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
  }

  refreshAllUses() {
    const user = AuthService.getCurrentUser();

    this.setState({
      refreshing: true
    });

    if (this.props.location.state.type === "FAVORITE") {
      UsePlaceService.listAllUsesOfFavoritePlacesBySchool(user.username, this.props.location.state.school.id).then(
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
    } else {
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

  getCategoryByType(type) {
    switch (type) {
      case 'MEN_BATHROOM':
        return 'Men\'s Bathroom';
      case 'WOMEN_BATHROOM':
        return 'Ladies Bathroom';
      case 'YARD':
        return 'Courtyard';
      case 'DRINKING_FOUNTAIN':
        return 'Drinking Fountain';
      case 'CUSTOM':
        return 'Custom';
      default:
        return 'Favorites';
    }
  }

  render() {
    return (
      <>
        <div>
          {(this.state.loading1 || this.state.loading2) && (
            <Spinner/>
          )}
        </div>
        <div className="place__box">
          {!(this.state.loading1 || this.state.loading2) && (
            <div>
              <div className="place_board_header">
                <div>
                  <p>{this.props.location.state.school.name}</p>
                  <p>{this.getCategoryByType(this.props.location.state.type)}</p>
                </div>
                <div className="custom-tooltip" data-tooltip="Refresh">
                  <img
                    src={Refresh}
                    alt="Refresh"
                    className={this.state.refreshing ? "spin" : ""}
                    onClick={() => this.refreshAllUses()}
                  />
                </div>
              </div>
              <div style={{height: "1px", width: "100%", backgroundColor: "#d1d1d1"}}/>
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
                <div className="empty-category">
                  <span>There are no places registered for this category yet.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}
