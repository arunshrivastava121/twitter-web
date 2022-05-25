import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './Home';
import './App.css';
import Dashboard from './Dashboard';
import history from './history';
import axios from 'axios';
import Login from './auth/login';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogoutBtn = this.handleLogoutBtn.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", {withCredentials: true})
      .then(response => {
        if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          })
        } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          })
        }
      }).catch(error => {
        console.log("login error", error);
      })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    history.push('/');
    window.location.reload();

    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleLogoutBtn() {
    history.push('/home');
    window.location.reload();

    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  handleLoginClick() {
    history.push('/login');
    window.location.reload();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              history={history}
              exact
              path={"/home"}
              element={<Home user={this.state.user} handleLoginClick={this.handleLoginClick} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />}
            />
            <Route
              history={history}
              exact
              path={"/login"}
              element={<Login handleLogin={this.handleLogin} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />}
            />            
            <Route
              exact 
              path={"/"} 
              element={<Dashboard user={this.state.user} handleLogoutBtn={this.handleLogoutBtn} handleLoginClick={this.handleLoginClick} loggedInStatus={this.state.loggedInStatus}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
