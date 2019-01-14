import React, { Component } from 'react';
import Header from './Header'
import {Menu} from './Menu'



class BankAccount extends Component {
  render() {
    return (
      <div>
      <Menu/>
        <h1> This is my Bank Account Balances</h1>
          <h3> Checking Account Balance $ 0.00 </h3>
          <h3> Savings Account Balance $ 0.00 </h3>
          <img id="bank_img" src="http://www.fcpablog.com/storage/Screen%20Shot%202015-04-07%20at%207.36.32%20AM.png?__SQUARESPACE_CACHEVERSION=1428406628746" />
      </div>
    )
  }
}

export default BankAccount;
