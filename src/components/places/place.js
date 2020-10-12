import React, { Component } from "react";
import './css/place.css'
import '../../styles/default.css'

export default class PlaceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  componentDidMount() {
    this.setState({
    });
  }

  increment(e){
    e.preventDefault();
    (this.state.counter >= 0 && this.state.counter < this.props.max) ?

    this.setState((state) =>{
      return {counter: this.state.counter + 1}
    })
    :
    alert("valor não permitido")

    this.placeStatus(this.state.counter + 1)
  }

  decrement(e){
    e.preventDefault();
    (this.state.counter > 0 && this.state.counter <= this.props.max) ?

    this.setState((state) =>{
      return {counter: this.state.counter - 1}
    })
    :
    alert("valor não permitido")
    
    this.placeStatus(this.state.counter - 1)
  }

  placeStatus(valor){
    let elemento = document.getElementById(this.props.id);
    if( valor >= this.props.max){
      elemento.classList.add("status--crowded")
      elemento.classList.remove("status--almost-full")
      elemento.classList.remove("status--safe")
      return;
    }else if( valor >= this.props.max - 2){
      elemento.classList.add("status--almost-full")
      elemento.classList.remove("status--crowded")
      elemento.classList.remove("status--safe")
    }else{
      elemento.classList.add("status--safe")
      elemento.classList.remove("status--crowded")
      elemento.classList.remove("status--almost-full")
    }
  }

  render() {
    return (
      <div className="place__container">
        <header className="place__header">
          <h3>{this.props.name} - {this.props.id}</h3>
        </header>
        {/* <img src={this.props.img} className="place__img" alt={this.props.type} /> */}
        <div className="place__counter">
          <p>Actual <span>{this.state.counter}</span></p>
          <p>Max <span>{this.props.max}</span></p>
        </div>
        <p className="place__status status--safe" id={this.props.id}> </p>
        <div className="place__manager">
          <button onClick={(e) => this.decrement(e)}>-</button>
          <p>{this.state.counter}</p>
          <button onClick={(e) => this.increment(e)}>+</button>
        </div>
      </div>
    );
  }
}
