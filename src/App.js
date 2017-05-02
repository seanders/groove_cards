import React, { Component } from 'react';
import './App.css';
import CardLayout from './containers/CardLayout';
import SideBar from './containers/SideBar';

export default class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="col-9">
          <CardLayout />
        </div>

        <div className="col-3">
          <SideBar />
        </div>
      </div>
    );
  }
}
