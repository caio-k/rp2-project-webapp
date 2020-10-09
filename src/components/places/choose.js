import React, { Component } from "react";

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
        <button onClick={()=>{this.props.type('WOMEN_BATHROOM')}}>WOMEN_BATHROOM</button>
      </div>
    );
  }
}
