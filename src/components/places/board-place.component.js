import React, { Component } from "react";
import ChoosePlace from './choose';
import Places from './places';
import './css/board-place.css'

export default class BoardPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: ''      
    };
  }

  componentDidMount() {
    this.setState({
      content: "Place Board."
    });
  }

  render() {
    return (
      <div className="board__place__container">   

        {this.state.type === ''?
          <ChoosePlace type={(type)=>{
            this.setState({
              type: type
            })
          }}/>
          :
          <Places type={this.state.type}/>  
        }
          
      </div>
    );
  }
}
