import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'


class LandingMenu extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/login" component={Login}>Login</Link></li>
          <li><Link to="/register" component={Register}>Register</Link></li>
        </ul>
        <h1> Welcome to the "Don't Grow Up: Credit Builder" App </h1>
      </div>
    );
  }
}

export default LandingMenu;
