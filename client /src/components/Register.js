import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import AuthHelperMethods from './AuthHelperMethods';
import './Login.css'

export class Register extends Component {
    Auth = new AuthHelperMethods();

    state = {
      username: "",
      password: "",
      firstname: "",
      lastname: ""
    }

    _handleChange = (e) => {
      this.setState(
        {
          [e.target.name]: e.target.value
        }
      )

      // console.log(this.state);

    }

    handleFormSubmit = (e) => {
      e.preventDefault();

      axios.post('/register', {
        username: this.state.username,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this. state.lastname
    })

    .then(data => {
      console.log(data);
      this.props.history.replace('/login');
    });

    }

  render() {
    return (
                <div className="main-wrapper">
                    <div className="box">
                        <div className="box-header">
                            <h1>Register</h1>
                        </div>
                        <form className="box-form">
                            <input
                                className="form-item"
                                placeholder="First Name"
                                name="firstname"
                                type="text"
                                onChange={this._handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Last Name"
                                name="lastname"
                                type="text"
                                onChange={this._handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Username"
                                name="username"
                                type="text"
                                onChange={this._handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this._handleChange}
                            />
                            <button className="form-submit" onClick={this.handleFormSubmit}>Register</button>
                        </form>
                        <Link className="link" to="/login">Already have an account? <span className="link-signup">Login</span></Link>
                    </div>
                    <div className="signiture">
                    </div>
                </div>

    )
  }
}
