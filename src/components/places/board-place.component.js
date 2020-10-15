import React, {Component} from "react";
import SchoolService from '../../services/school.service'
import ChoosePlace from './choose';
import './css/board-place.css'

export default class BoardPlace extends Component {
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
          <div className="board">
            <div className="board-header">
              <span>Places</span>
            </div>
            <span
              className="message">You have not yet selected a school. Go to the "Schools" menu and select a school.</span>
          </div>
          :
          <div className="board__place__container">
            <ChoosePlace school={this.state.school} history={this.props.history}/>
          </div>
        }
      </>
    );
  }
}
