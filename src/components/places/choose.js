import React, { Component } from "react";
import './css/choose.css'
import girlImg from '../../assets/girl.svg'

export default class ChoosePlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    this.setState({
      content: "Choose Place Type."
    });
  }

  render() {
    return (
      <div className="container">
        <div className="choose__group">
          <h1 className="choose__title">Women Bathroom</h1>
          <button className="choose__btn" onClick={()=>{this.props.type('WOMEN_BATHROOM')}}>  
            <img src={girlImg} alt='Ladies Room' className="choose__img" /> 
          </button>
        </div>
      </div>
    );
  }
}
