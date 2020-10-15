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
    this.redirect = this.redirect.bind(this);
  }

  redirect(category) {
    this.props.history.push({
      pathname: "/use-place",
      state: {
        school: this.props.school,
        type: category
      }
    });
  }

  render() {
    return (
      <div className="choose__container">
        <div className="choose__group">
          <h1 className="choose__title">Men's Bathroom</h1>
          <button className="choose__btn" onClick={()=>{this.redirect('MEN_BATHROOM')}}>
            <img src={menImg} alt='Mens Bathroom' className="choose__img" style={{width: '70px'}} />
          </button>
        </div>
        <div className="choose__group">
          <h1 className="choose__title">Ladies Bathroom</h1>
          <button className="choose__btn" onClick={()=>{this.redirect('WOMEN_BATHROOM')}}>
            <img src={girlImg} alt='Ladies Room' className="choose__img" style={{width: '70px'}} />
          </button>
        </div>
        <div className="choose__group">
          <h1 className="choose__title">Courtyard</h1>
          <button className="choose__btn" onClick={()=>{this.redirect('YARD')}}>
            <img src={benchImg} alt='Courtyard' className="choose__img" />
          </button>
        </div>
        <div className="choose__group">
          <h1 className="choose__title">Drinking Fountain</h1>
          <button className="choose__btn" onClick={()=>{this.redirect('DRINKING_FOUNTAIN')}}>
            <img src={drinkingImg} alt='Drinking Fountain' className="choose__img" />
          </button>
        </div>
        <div className="choose__group">
          <h1 className="choose__title">Custom</h1>
          <button className="choose__btn" onClick={()=>{this.redirect('CUSTOM')}}>
            <img src={customImg} alt='Custom' className="choose__img" />
          </button>
        </div>
      </div>
    );
  }
}
