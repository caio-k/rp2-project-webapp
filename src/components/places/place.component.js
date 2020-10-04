import React, { Component } from "react";
import './css/place-component.css'

export default class PlaceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeStatus: "",
      counter: 0
    };
  }

  componentDidMount() {
    this.setState({
      placeStatus: "Crowded"
    });
  }

  increment(e){
    e.preventDefault();
    (this.state.counter >= 0 && this.state.counter < this.props.max) ?

    this.setState({
      counter: this.state.counter + 1
    })
    :
    alert("valor não permitido")
  }

  decrement(e){
    e.preventDefault();
    (this.state.counter > 0 && this.state.counter <= this.props.max) ?

    this.setState({
      counter: this.state.counter - 1
    })
    :
    alert("valor não permitido")
  }

  render() {
    return (
      <div className="place__container">
        <header className="place__header">
          <h3>{this.props.name} - {this.props.id}</h3>
        </header>
        <img src={this.props.img} className="place__img" alt={this.props.type} />
        <p className="place__status">{this.state.placeStatus} </p>
        <div className="place__manager">
          <button onClick={(e) => this.decrement(e)}>-</button>
          <p>{this.state.counter}</p>
          <button onClick={(e) => this.increment(e)}>+</button>
          <p>Max: {this.props.max}</p>
        </div>
      </div>
    );
  }
}
