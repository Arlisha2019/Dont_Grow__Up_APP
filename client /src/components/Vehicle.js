import React, { Component } from 'react';
import Header from './Header'
import {Menu} from './Menu'
import './Profile.css'


class Vehicle extends Component {

  render() {
    return (
      <div>
      <Menu/>
      
        <h1> This is my Vehicle page </h1>
        <h2> Loan Balance $ 45,000 </h2>
        <h2> Payment Amount $ 1,200 </h2>
        <h2> Interest Rate 9% </h2>
        <h2> Due Date 01/20/2019 </h2>
        <h2> Checking Account Balance $500 </h2>
        <img id="car__image" src="http://www.digitaltrends.com/wp-content/uploads/2013/05/Tesla-Model-S2.jpg" />

      </div>
    )
  }

}
 export default Vehicle;
