import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import './Menu.css'


export class Menu extends Component {

  render() {

    let isAuthenticated = true

  let authenticatedMenuItems = [{ name: "Profile", url: "/profile"}, {name: "Bank Account", url: "/bank_acc"}, {name: "Logout", url: "/login"}]

    let nonAuthenticatedMenuItems = [{name: "Login", url: "/login"}, {name: "Register", url: "/register"}]

    let menuItems = []

    if(isAuthenticated) {
      menuItems =  authenticatedMenuItems.map((item, i) => {
        return <div key ={i}>

              <li>
              <Link to={item.url}>{item.name}</Link>
            </li>

        </div>
      })
    } else {
      menuItems =  nonAuthenticatedMenuItems.map((item) => {
        return <div>
            <li><Link to={item.url}>{item.name}</Link></li>
        </div>
      })
    }

    return (
      <ul className="menuBar">
        {menuItems}
      </ul>
    )
  }
}

export class Footer extends Component {
  render() {
    return (
      <div>
        <div className="signiture">
          <h5> &copy; Copyright 2019 "Don't Grow Up: Credit Builder" Arlisha Hayles </h5>
        </div>
      </div>
    )
  }
}
