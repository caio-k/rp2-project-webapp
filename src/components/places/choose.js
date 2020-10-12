import React, { Component } from "react";
import './css/choose.css'
import '../../styles/default.css'
import menImg from '../../assets/men.svg'
import girlImg from '../../assets/girl.svg'
import benchImg from '../../assets/bench.png'
import drinkingImg from '../../assets/drinking.png'
import customImg from '../../assets/custom.svg'

export default class ChoosePlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="choose__container">
        <div className="choose__group">
          <h1 className="choose__title">Men's Bathroom</h1>
          <button className="choose__btn" onClick={()=>{this.props.type('MEN_BATHROOM')}}>  
            <img src={menImg} alt='Ladies Room' className="choose__img" style={{width: '70px'}} /> 
          </button>
        </div>
        <div className="choose__group">
          <h1 className="choose__title">Ladies Bathroom</h1>
          <button className="choose__btn" onClick={()=>{this.props.type('WOMEN_BATHROOM')}}>  
            <img src={girlImg} alt='Ladies Room' className="choose__img" style={{width: '70px'}} /> 
          </button>
        </div>
        <div className="choose__group">
          <h1 className="choose__title">Courtyard</h1>
          <button className="choose__btn" onClick={()=>{this.props.type('YARD')}}>  
            <img src={benchImg} alt='Ladies Room' className="choose__img" /> 
          </button>
        </div>
        <div className="choose__group">
          <h1 className="choose__title">Dinking Fountain</h1>
          <button className="choose__btn" onClick={()=>{this.props.type('DRINKING_FOUNTAIN')}}>  
            <img src={drinkingImg} alt='Ladies Room' className="choose__img" /> 
          </button>
        </div>
        <div className="choose__group">
          <h1 className="choose__title">Custom</h1>
          <button className="choose__btn" onClick={()=>{this.props.type('CUSTOM')}}>  
            <img src={customImg} alt='Ladies Room' className="choose__img" /> 
          </button>
        </div>
      </div>
    );
  }
}
