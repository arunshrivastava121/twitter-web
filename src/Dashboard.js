import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import './Dashboard.css';

export default class Dashboard extends Component {
  constructor(props){
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin  = this.handleLogin.bind(this);
  }

  handleLogout() {
    this.props.handleLogoutBtn();
  }

  handleLogin() {
    this.props.handleLoginClick();
  }

  render() {
    return (
      <div className="app">
        <Sidebar handleLogout={this.handleLogout} handleLogin={this.handleLogin} status={this.props.loggedInStatus} />
        <Feed currentUserId={this.props.user.id} currentUsername={this.props.user.name} status={this.props.loggedInStatus} />
        {/* <h2>Status: {this.props.loggedInStatus} </h2> */}
      </div>  
    )
  }
}
