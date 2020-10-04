import React, { Component } from "react";
import PlaceComponent from './place.component';

export default class BoardPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    this.setState({
      content: "Place Board."
    });
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <PlaceComponent
            name="W. Toilet"
            id="1"
            img="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            max="5"
            //5 minutos
            limit_time="5"
            type="bathroom"
          />
        </header>
      </div>
    );
  }
}
