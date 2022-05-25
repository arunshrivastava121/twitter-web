import React, {Component} from "react";
import Registration from "./auth/Registration";
import './Home.css';
import history from './history'

export default class Home extends Component {
  constructor(props) {
    super(props);

    document.body.classList.add('back-color');
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLoginClickBtn = this.handleLoginClickBtn.bind(this);
  }
  
  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);

    history.push("/");
    window.location.reload();
  }

  handleLoginClickBtn() {
    this.props.handleLoginClick();
  }
  
  goBack() {
    history.push('/');
    window.location.reload()
  }
  
  render() {
    return (
      <div className="home">
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <div className="form-actions">
          <button onClick={this.handleLoginClickBtn}>Login</button><br></br>
          <button onClick={this.goBack}>Back</button>
        </div>
      </div>
    )
  }
}