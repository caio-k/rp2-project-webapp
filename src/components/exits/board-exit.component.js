import React, {Component} from "react";
import SchoolService from "../../services/school.service"
import MessageContainer from "../utils/message-container.component";
import Exits from "./exits.components";

export default class BoardExit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: null
    };
  }

  componentDidMount() {
    const currentSchool = SchoolService.getCurrentSchool();

    this.setState({
      school: currentSchool
    });
  }

  render() {
    return (
      <>
        {this.state.school === null ?
          <MessageContainer message="You have not yet selected a school. Go to the Schools menu and select a school."
                            header="Warning!"/>
          :
          <Exits school={this.state.school}/>
        }
      </>
    );
  }
}
