import React, { Component } from 'react';
import Header from './Header'
import {Menu} from './Menu'
import axios from 'axios';
import BankAccount from './BankAccount'
import { connect } from 'react-redux'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';


class CreditCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCurrent: false,
      paymentAmount: 0,
      dueDate: null,
      balance: 0,
      interestRate: 0,
      availableBalance: 0
    }
  }

  componentDidMount() {
    this.populateCreditCard();
  }

  populateCreditCard = () => {
    let firstname = localStorage.getItem("data")
    let userId = localStorage.getItem("userId")
     this.setState({
       userId : userId
    })

    axios.get(`http://localhost:3000/creditCard/info/${localStorage.getItem('userId')}`, {

    })
    .then(response => {
      console.log(response.data);
      if(response.data !== null) {
        this.setState({
          isCurrent: true,
          paymentAmount: response.data.paymentAmount,
          dueDate: response.data.dueDate,
          balance: response.data.balance,
          interestRate: response.data.interestRate,
          availableBalance: response.data.availableBalance
        })
      }
    })
    console.log('Credit Card Mounted');
  }


  activateCreditCard = () => {

    console.log('Credit Card Button is working');

    this.setState({
      ...this.state,
      isCurrent: !this.state.isCurrent,
      paymentAmount: 125.00,
      dueDate: 1252019,
      balance: 2000,
      interestRate: 15.78,
      availableBalance: 3000
      }, () => this.postCreditCardInfoToDatabase())
  }

  payCreditCard = () => {

    console.log('Credit Card Payment is Working')
    let userId = localStorage.getItem("userId")
     this.setState({
       userId : userId
     })

    axios.post(`http://localhost:3000/credit_card/update/${localStorage.getItem("userId")}`, {
      availableBalance: this.state.availableBalance + 125

    })
    .then(data => {
      this.setState({
        ...this.state,
        availableBalance: this.state.availableBalance + 125
      })
    })

    }




    postCreditCardInfoToDatabase = () => {

      axios.post('/credit_card', {
        isCurrent: this.state.isCurrent,
        paymentAmount: this.state.paymentAmount,
        dueDate: this.state.dueDate,
        balance: this.state.balance,
        interestRate: this.state.interestRate,
        availableBalance: this.state.availableBalance,
        userId: this.state.userId
      })

      .then(data => {
        this.setState({
          isCurrent: data.isCurrent,
          paymentAmount: data.paymentAmount,
          dueDate: data.dueDate,
          balance: data.balance,
          interestRate: data.interestRate,
          availableBalance: data.availableBalance
          }, ()=> {console.log(data + "returned data");
        })
      })
      console.log('Credit Card Info Submitted');
    }



  render() {
    return (
      <div>
      <div className="row">
        <div className="col s50 m7">
          <div className="card medium blue darken-4">
      <form>
        <button onClick={() => this.activateCreditCard()}><a className="waves-effect deep-purple lighten-1 btn-large">Activate</a></button>
        <h3> Credit Cards </h3>
        <h5> Credit Limit $ 5,000 </h5>
        <h5> Available Balance ${this.props.availableBalance}</h5>
        <h5> Interest Rate {this.state.interestRate} % </h5>
        <h5> Payment Amount ${this.state.paymentAmount}.00 </h5>
      </form>
      <button onClick={this.props.payCreditCard}><a className="waves-effect deep-purple lighten-1 btn-large">Pay Credit Card</a></button>
      </div>
     </div>
    </div>
   </div>

    )
  }

}
const mapStateToProps = state => {
  return {
    checkingBalance: state.checkingBalance,
    availableBalance: state.availableBalance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    payCreditCard: () => dispatch({type: 'PAY_CC'})
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (CreditCard)
