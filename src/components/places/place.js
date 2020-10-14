import React, {Component} from "react";
import './css/place.css'
import '../../styles/default.css'
import AuthService from "../../services/auth.service";

export default class PlaceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownCounter: 0,
      actualCounter: 0
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    const ownUse = this.props.uses.find(item => {
      return item.userId === user.id
    });

    const ownCounter = ownUse === undefined ? 0 : ownUse.counter;

    const actualCounter = this.props.uses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.counter
    }, 0);

    this.setState({
      ownCounter: ownCounter,
      actualCounter: actualCounter
    });
  }

  increment(e) {
    e.preventDefault();
    (this.state.actualCounter >= 0 && this.state.actualCounter < this.props.max) ?

      this.setState(() => {
        return {actualCounter: this.state.actualCounter + 1}
      })
      :
      alert("Valor não permitido")

    this.placeStatus(this.state.actualCounter + 1)
  }

  decrement(e) {
    e.preventDefault();
    (this.state.actualCounter > 0 && this.state.actualCounter <= this.props.max) ?

      this.setState(() => {
        return {actualCounter: this.state.actualCounter - 1}
      })
      :
      alert("Valor não permitido")

    this.placeStatus(this.state.actualCounter - 1)
  }

  placeStatus(counter) {
    let element = document.getElementById(this.props.id);
    element.classList.remove("status--crowded")
    element.classList.remove("status--almost-full")
    element.classList.remove("status--safe")

    if (counter >= this.props.max) {
      element.classList.add("status--crowded")
    } else if (counter >= this.props.max / 2) {
      element.classList.add("status--almost-full")
    } else {
      element.classList.add("status--safe")
    }
  }

  render() {
    return (
      <div className="place__container">
        <header className="place__header">
          <h3>{this.props.name}</h3>
        </header>
        <div className="place__counter">
          <p>Own <span>{this.state.ownCounter}</span></p>
          <p>Actual <span>{this.state.actualCounter}</span></p>
          <p>Max <span>{this.props.max}</span></p>
        </div>
        <p id={this.props.id}
           className={
             this.state.actualCounter >= this.props.max ?
               "place__status status--crowded" :
               this.state.actualCounter >= this.props.max / 2 ?
                 "place__status status--almost-full" :
                 "place__status status--safe"
           }/>
        <div className="place__manager">
          <button onClick={(e) => this.decrement(e)}>-</button>
          <p>{this.state.actualCounter}</p>
          <button onClick={(e) => this.increment(e)}>+</button>
        </div>
      </div>
    );
  }
}
