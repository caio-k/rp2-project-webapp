import React, { Component } from "react";
import "./css/home.css"
import Img1 from "../../assets/create.jpg";
import Img2 from "../../assets/favorites.jpg";
import Img3 from "../../assets/exits.jpg";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    this.setState({
      content: "Public conHome."
    });
  }

  render() {
    const {history} = this.props;
    return (
      <div className="home__container">
        <div className=" home__board home__board-1">
          <h1> Welcome to SafeSchool</h1>
          <p>SafeSchool is a tool to help schools in Covid-19's epoch. It aims to control the flow of students within a school to avoid crowds.</p>
        </div>
      
        <div className=" home__board home__board-2">
            <img src={Img1} alt=""/>
            <p>Register your own school</p>
        </div>

        <div className=" home__board home__board-3 home__two">
            <img src={Img2} alt=""/>
            <p>Save your favorite places</p>
        </div>

        <div className=" home__board home__board-4">
            <img src={Img3} alt=""/>
            <p>Monitor exits and more</p>
        </div>

        <div className="home__cadastrar">
          <button onClick={()=>{history.push("/register")}}>Create your account!</button>
        </div>
      </div>
    );
  }
}
