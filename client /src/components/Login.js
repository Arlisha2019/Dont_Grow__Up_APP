import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import axios from "axios";
//import AuthHelperMethods from './AuthHelperMethods';

class Login extends Component {

  state = {
    username: "",
    password: ""

  }

  _handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleFormSubmit = (e) => {

    e.preventDefault();

    axios.post('/login', {
      username: this.state.username,
      password: this.state.password

  })

  .then(data => {
    console.log(data);
    this.props.history.push('/profile');
  });


  }

  componentWillMount() {
    //
    // if (this.Auth.loggedIn()){
    //
    // this.props.history.replace('/');
    }


  render() {
    return (

                  <div className="main-wrapper">
                      <div className="box">
                          <div className="box-header">
                              <h1>Login</h1>
                          </div>
                          <form className="box-form">
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
                              <button className="form-submit" onClick={this.handleFormSubmit}>Login</button>
                          </form>
                          <Link className="link" to="/register">Don't have an account? <span className="link-signup">Register</span></Link>
                      </div>
                      <div className="signiture">

                      </div>
                  </div>


    )
  }
}

export default Login;
