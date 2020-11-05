import React, {Component} from "react";
import './css/place.css'
import '../../styles/default.css'
import '../../styles/tooltip.css'
import '../../styles/heart.css'
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
    this.props.onRef(this);
    this.loadData();
  }

  loadData() {
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

    this.blinkingBackground(ownCounter);
  }

  onChangeNumberOfPeople(e) {
    this.setState({
      numberOfPeople: e.target.value
    });
  }

  increment(e) {
    e.preventDefault();

    const people = this.state.numberOfPeople;

    if (people <= 0) {
      this.popup("Number of people less than or equal to zero is not allowed", false);
    } else if (people > this.props.max - this.state.actualCounter) {
      this.popup("The number of people to be sent is greater than the available limit", false);
    } else {
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
    }
  }

  decrement(e) {
    e.preventDefault();

    const people = this.state.numberOfPeople;

    if (people <= 0) {
      this.popup("Number of people less than or equal to zero is not allowed", false);
    } else if (people > this.state.ownCounter) {
      this.popup("Number of people to be received is greater than the number of people sent", false);
    } else {
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

    this.blinkingBackground(this.state.ownCounter);
  }

  blinkingBackground(ownCounter) {
    let ownCounterElement = document.getElementById(this.props.id + "-own-counter");

    if (ownCounter === 0) {
      ownCounterElement.classList.remove("blink-bg")
    } else {
      ownCounterElement.classList.add("blink-bg")
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
    }), 6000);
  }

  render() {
    return (
      <>
        {this.state.alertStatus && (
          <PopupMessage message={this.state.message} success={this.state.popupSuccess}/>
        )}

        <div className="place__container">
          <header className="place__header">
            <h3 style={{fontSize: "18px"}}>{this.props.name}</h3>
            <div className="heart"
                 style={{backgroundColor: this.props.favorite ? "#F44336" : "#989898"}}
                 onClick={this.props.onFavorite}
            />
          </header>
          <div className="place__counter">
            <p>Own<span id={this.props.id + "-own-counter"}>{this.state.ownCounter}</span></p>
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
                  className="form-control manager__input"
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
