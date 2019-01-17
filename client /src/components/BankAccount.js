import React, { Component } from 'react';
import Header from './Header'
import {Menu} from './Menu'
import axios from 'axios';
import CreditCard from "./CreditCard"
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux'


class BankAccount extends Component {
constructor(props){
  super(props)
  this.state = {
    checkingBalance: 0,
    savingsBalance: 0,
    isCurrent: false,
    paycheck: 0
  }
}

componentWillReceiveProps(){
  this.populateAccounts();
}

populateAccounts = () => {

  let firstname = localStorage.getItem("data")
  let userId = localStorage.getItem("userId")
   this.setState({
     firstName: firstname.charAt(0).toUpperCase() + firstname.slice(1),
     userId : userId
   })

   axios.get(`http://localhost:3000/bank_acc/info/${localStorage.getItem('userId')}`, {

   })
   .then(response => {
     console.log(response.data);
     if(response.data !== null) {
       this.setState({
         isCurrent: true,
         checkingBalance: response.data.checkingBalance,
         savingsBalance: response.data.savingsBalance,
         paycheck: response.data.paycheck
       })
     }
   })

  console.log("component mounted")

}



  activeBankAccounts = () => {
    console.log('Active Button');

    //e.preventDefault();

    this.setState({
      ...this.state,
      checkingBalance: this.state.checkingBalance + 1500,
      savingsBalance: this.state.savingsBalance + 500,
      isCurrent: !this.state.isCurrent,
      paycheck: this.state.paycheck + 1609
      }, () => this.postBankInfoToDatabase())
  }

  postBankInfoToDatabase = () => {
    console.log(this.state.checkingBalance + " inside the post to database function")
    axios.post('/bank_acc', {
      checkingBalance: this.state.checkingBalance,
      savingsBalance: this.state.savingsBalance,
      isCurrent: this.state.isCurrent,
      paycheck: this.state.paycheck,
      userId: this.state.userId
    })
    .then(data => {
      // this.props.history.push('/profile');
      this.setState({
        checkingBalance: data.checkingBalance,
        savingsBalance: data.savingsBalance,
        isCurrent: data.isCurrent,
        paycheck: data.paycheck
      }, ()=> {console.log(data + "returned data");
    })
  })
    console.log('Bank Account Info Submitted');
  }

  depositPayCheck = () => {
    console.log('Deposit button working');
    this.setState({
      ...this.state,
      checkingBalance: this.state.checkingBalance + this.state.paycheck
    })
  }
  render() {
    return (
      <div className="row">
        <div className="col s50 m7">
          <div className="card medium green accent-3">
      
      <button onClick={() => this.activeBankAccounts()}><a className="waves-effect deep-purple lighten-1 btn-large">Activate</a></button>
        <h3> Bank Account Balances</h3>
          <h5> Checking Balance ${this.props.checkingBalance}.00 </h5>
          <h5> Savings Balance $ {this.savingsBalance}.00 </h5>
          <button onClick={this.props.depositPayCheck}><a className="waves-effect deep-purple lighten-1 btn-large">Deposit Pay Check</a></button>

     </div>
    </div>
   </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    checkingBalance: state.checkingBalance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    depositPayCheck: () => dispatch({type: 'DEPOSIT_PAYCHECK'})
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (BankAccount)
