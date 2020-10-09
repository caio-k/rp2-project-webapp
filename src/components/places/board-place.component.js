import React, { Component } from "react";
import ChoosePlace from './choose';
import Places from './places';

export default class BoardPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //type: "WOMEN_BATHROOM"
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
      <div className="container">

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
