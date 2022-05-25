import React, {Component} from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    }

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
      name,
      email,
      password,
      password_confirmation
    } = this.state;

    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === 'created') {
          this.props.handleSuccessfulAuth(response);
        }
      })
      .catch(error => {
        console.log("registration error", error);
      })

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Your Name</label>
          <input
            type='text' 
            name="name"
            id='name'
            placeholder="Enter Name"
            onChange={this.handleChange}
            value={this.state.name}
            required
          />
        </div>

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
          <label htmlFor='name'>Password</label>
          <input 
            type='password' 
            name='password'
            id='password'
            placeholder="Enter Password"
            onChange={this.handleChange}
            value={this.state.password}
            required
          />
        </div>

        <div className='form-control'>
          <label htmlFor='name'>Password-Confirmation</label>
          <input 
            type='password' 
            name='password_confirmation'
            id='password-confirmation'
            placeholder="Enter Password-Confirmation"
            onChange={this.handleChange}
            value={this.state.password_confirmation}
            required
          />
        </div>

        <div className="left-form-actions">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    );
  }
}