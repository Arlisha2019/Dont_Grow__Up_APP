import React, { Component } from 'react';
import Header from './Header'
import {Menu} from './Menu'



class CreditCard extends Component {

  render() {
    return (
      <div>
      <Menu/>
        <h1> This is my Credit Cards page </h1>
        <h2> Credit Limit $ 5,000 </h2>
        <h2> Available Balance $3,000 </h2>
        <h2> Payment Amount $125.00 </h2>
        <h2> Due Date 01/15/2019 </h2>
        <img id="creditCard_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxtxpjOh9ZbC4PUDNmVqnk3qVWuDLUTMs85yLxjVZ4mFlT_IF4"/>
      </div>
    )
  }

}
 export default CreditCard;
