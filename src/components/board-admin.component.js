import React, { Component } from "react";
import {Link} from "react-router-dom";
import NewSchool from "../pages/management/new-school.component";

const schools = [
  {
    id: 1,
    name: "Nome da Escola",
    schoolPrincipalUsername: "Diretor"
  }
]

export default class BoardAdmin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: "",
      newSchool: false
    };
  }

  componentDidMount() {
    this.setState({
      content: "Board Admin."
    });
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>

        <button onClick={()=>{
          this.setState({
            newSchool: !this.state.newSchool
          });
        }}>New School</button>

        <Link to="/admin-new-school">
          New School
        </Link>


        {this.state.newSchool && (
            <NewSchool />
        )}
        

        <div className="board">
        <div className="board-header">
          <span>Choose a school</span>
          
        </div>

        {schools.length > 0 && (
          <>
            {schools.map(school =>
              <div className="card-school" key={school.id} onClick={() => this.onSelectSchool(school)}>
                <div className="header">
                  {school.name}
                </div>
                <div className="content">
                  School Principal: {school.schoolPrincipalUsername}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      </div>
    );
  }
}
