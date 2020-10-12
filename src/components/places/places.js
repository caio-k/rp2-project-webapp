import React, { Component } from "react";
import PlaceComponent from './place';
import PlaceService from '../../services/place.service';
import Spinner from "../utils/spinner.component";
import './css/places.css'

export default class Places extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderPlaces: [],
      loading: true
    };
  }

  componentDidMount() {
    this.setState({
      content: "Place Board."
    });

    let school = localStorage.getItem('school')
    school = JSON.parse(school)

    PlaceService.listAllPlacesBySchoolId(school.id).then(res =>{

      const placesToRender = res.data.filter((item)=>{
        console.log(item.type)
        return item.type === this.props.type
      })

      this.setState({
        renderPlaces: placesToRender,
        loading: false
      });
    })
  }

  render() {
    return (
      <div className="container">

        {this.state.loading && (
          <Spinner/>
        )}

        {!this.state.loading && (

          <div className="places_cards"> 
            {this.state.renderPlaces.map((item)=>(
              <PlaceComponent
                name={item.name}
                id= {item.placeId}
                max={item.maxPeople}
                limit_time={item.maxPeople}
                type={item.limitTimeSeconds}
              />
            ))}
            <PlaceComponent
              name="W. Toilet"
              id="1"
              img="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              max="5"
              limit_time="5"
              type="bathroom"
            />
            <PlaceComponent
              name="W. Toilet"
              id="2"
              img="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              max="5"
              limit_time="5"
              type="bathroom"
            />
            <PlaceComponent
              name="W. Toilet"
              id="3"
              img="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              max="5"
              limit_time="5"
              type="bathroom"
            />
          </div>     
        )}
      </div>
    );
  }
}
