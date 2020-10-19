import React, {Component} from "react";
import './css/place.css'
import '../../styles/default.css'
import '../../styles/tooltip.css'
import AuthService from "../../services/auth.service";
import UsePlaceService from "../../services/use-place.service";
import PopupMessage from '../utils/popup-message.component'

export default class PlaceComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeNumberOfPeople = this.onChangeNumberOfPeople.bind(this);

    this.state = {
      numberOfPeople: 1,
      ownCounter: 0,
      actualCounter: 0,
      alertStatus: false,
      message: "",
      popupSuccess: false
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

  onChangeNumberOfPeople(e) {
    this.setState({
      numberOfPeople: e.target.value
    });
  }

  increment(e) {
    e.preventDefault();

    const people = this.state.numberOfPeople;

    if (people > 0 && people <= this.props.max - this.state.actualCounter) {
      const user = AuthService.getCurrentUser();

      UsePlaceService.increase(user.username, this.props.id, people).then(
        () => {
          this.setState({
            ownCounter: parseInt(this.state.ownCounter) + parseInt(people),
            actualCounter: parseInt(this.state.actualCounter) + parseInt(people)
          });

          this.placeStatus(this.state.actualCounter);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.popup(resMessage, false);
        }
      );
    } else {
      this.popup("Number not allowed in \"" + this.props.name + "\"", false);
    }
  }

  decrement(e) {
    e.preventDefault();

    const people = this.state.numberOfPeople;

    if (people > 0 && people <= this.state.ownCounter) {
      const user = AuthService.getCurrentUser();

      UsePlaceService.decrease(user.username, this.props.id, people).then(
        () => {
          this.setState({
            ownCounter: parseInt(this.state.ownCounter) - parseInt(people),
            actualCounter: parseInt(this.state.actualCounter) - parseInt(people)
          });

          this.placeStatus(this.state.actualCounter);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.popup(resMessage, false);
        }
      );
    } else {
      this.popup("Number not allowed in \"" + this.props.name + "\"", false);
    }
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

  popup(message, popupSuccess) {
    this.setState({
      message: message,
      alertStatus: true,
      popupSuccess: popupSuccess
    });

    setTimeout(() => this.setState({
      alertStatus: false
    }), 3000);
  }

  render() {
    return (
      <>
        {this.state.alertStatus && (
          <PopupMessage message={this.state.message} success={this.state.popupSuccess}/>
        )}

        <div className="place__container">
          <header className="place__header">
            <h3>{this.props.name}</h3>
          </header>
          <div className="place__counter">
            <p>Own<span>{this.state.ownCounter}</span></p>
            <p>Actual<span>{this.state.actualCounter}</span></p>
            <p>Max<span>{this.props.max}</span></p>
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
            <form className="form-inline" style={{maxHeight: "38px"}}>
              <div className="form-group">
                <button className="custom-tooltip" data-tooltip="Receive" onClick={(e) => this.decrement(e)}>-</button>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  min="1"
                  autoComplete="off"
                  className="form-control"
                  style={{width: "65px"}}
                  value={this.state.numberOfPeople}
                  onChange={this.onChangeNumberOfPeople}
                />
              </div>
              <div className="form-group">
                <button className="custom-tooltip" data-tooltip="Send" onClick={(e) => this.increment(e)}>+</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
