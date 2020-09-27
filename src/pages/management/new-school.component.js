import React, { Component } from "react";

export default class ManagementNewSchool extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          schoolName: "",
          principalName: ""
        };
      }

      handleSubmit(e){
        e.preventDefault();

        const data = {
          schoolName: this.state.schoolName,
          principalName: this.state.principalName
        }

        console.log(data)

      }
    
      render() {
        return (
          <div className="container">
            <header className="jumbotron">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Name School</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={this.state.schoolName}
                  onChange={(e)=>{
                    this.setState({
                      schoolName: e.target.value
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label>Name Principal</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={this.state.principalName}
                  onChange={(e)=>{
                    this.setState({
                      principalName: e.target.value
                    });
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </header>
          </div>
        );
      }
}