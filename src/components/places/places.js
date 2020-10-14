import React, {Component} from "react";
import PlaceComponent from './place';
import PlaceService from '../../services/place.service';
import AuthService from "../../services/auth.service";
import UsePlaceService from "../../services/use-place.service";
import Spinner from "../utils/spinner.component";
import './css/places.css'

export default class Places extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderPlaces: [],
      allUses: [],
      loading1: true,
      loading2: true,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    PlaceService.listAllPlacesWithFavoriteBySchool(this.props.school.id, user.username).then(
      res => {
        const placesToRender = res.data.filter((item) => {
          return item.type === this.props.type
        });

        this.setState({
          renderPlaces: placesToRender,
          loading1: false
        });
      }
    );

    UsePlaceService.listAllUses(this.props.type, this.props.school.id).then(
      response => {
        this.setState({
          allUses: response.data,
          loading2: false
        });
      }
    );
  }

  getAllUsesByPlaceId(id) {
    return this.state.allUses.filter(item => {
      return item.placeId === id
    });
  }

  render() {
    return (
      <div className="container">

        {(this.state.loading1 || this.state.loading2) && (
          <Spinner/>
        )}

        {!(this.state.loading1 || this.state.loading2) && (
          <div className="places_cards">
            {this.state.renderPlaces.map((item) => (
              <PlaceComponent
                key={item.placeId}
                id={item.placeId}
                name={item.name}
                type={item.type}
                max={item.maxPeople}
                limit_time={item.limitTimeSeconds}
                school={this.props.school}
                uses={this.getAllUsesByPlaceId(item.placeId)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
