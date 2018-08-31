import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    projects: [],
    actions: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/projects")
      .then(res => {
        this.setState({ projects: res.data });
      })
      .catch(err => {
        console.log("Error getting projects data", err);
      });

    axios
      .get("http://localhost:8000/actions")
      .then(res => {
        this.setState({ actions: res.data });
      })
      .catch(err => {
        console.log("Error getting actions data", err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.projects.map(project => {
          return (
            <div>
              <h1>Project: {project.name}</h1>
              <h2>Project Description: {project.description}</h2>
              {this.state.actions
                .filter(action => action.project_id === project.id)
                .map(action => {
                  return (
                    <div>
                      <p>{action.description}</p>
                      <p>{action.notes}</p>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
