import React, { Component } from 'react';
import Header from './Header'
import {Menu} from './Menu'
import './Profile.css'


class StudentLoans extends Component {

  render() {
    return (
      <div>
      <Menu/>
        <h1> This is my Student Loans page </h1>
        <h2> Loan Balance $ 50,000</h2>
        <h2> Payment Amount $600 </h2>
        <h2> Interest Rate 12% </h2>
        <h2> Due Date 01/18/2019 </h2>
        <img id="student_loans_img" src="http://headlines.elgacu.com/wp-content/uploads/2017/07/dreamstime_l_67507885.jpg" />
      </div>
    )
  }

}
 export default StudentLoans;
