import React, {Component} from "react";
import history from '../history';
import axios from "axios";
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    }

    document.body.classList.add('back-color');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const {
      email,
      password,
    } = this.state;

    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password,
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response);
        }
      })
      .catch(error => {
        console.log("login error", error);
      })

    event.preventDefault();
  }

  goBack() {
    history.push('/');
    window.location.reload()
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <div className='form-control'>
            <label htmlFor='name'>E-Mail</label>
            <input
              type='email' 
              name='email'
              id='email'
              placeholder="Enter E-Mail"
              onChange={this.handleChange}
              value={this.state.email}
              required
            />
          </div>

          <div className='form-control'>
            <label htmlFor='name'>E-Mail</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">Login</button><br></br>
          </div>
          <button onClick={this.goBack}>Back</button>
        </form>
      </div>
    );
  }
}