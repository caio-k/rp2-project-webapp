import React, { Component } from "react";
import {Link} from "react-router-dom";
import schoolImg from'../../assets/school.png'

import './css/homepage.component.css'

export default class ManagementHome extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          content: ""
        };
      }
    
      componentDidMount() {
        this.setState({
          content: "Home Management"
        });
      }
    
      render() {
        return (
          <div className="container">

          <Link to={"/admin-new-school"} >
            <div className="card-option">
              <h1>Cadastrar Escola</h1>
              <img src={schoolImg} alt="" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum.</p>
            </div>
          </Link>

          </div>
        );
      }
}