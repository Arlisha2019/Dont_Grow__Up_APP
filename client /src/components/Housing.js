import React, { Component } from 'react';
import {Menu} from './Menu'
import Header from './Header'
import './Profile.css'


class Housing extends Component {

  render() {
    return (
      <div>
      <Menu/>
        <h1> This is my Housing page </h1>
        <h2> Rent Amount $ 1,600 </h2>
        <h2> Due Date 01/01/2019 </h2>
        <img id="apartment_img" src="https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4206-28/the-kelvin-apartments-exterior.jpg" />
      </div>
    )
  }

}
 export default Housing;
