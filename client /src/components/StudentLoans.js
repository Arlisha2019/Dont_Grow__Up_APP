import React, { Component } from 'react';
import Header from './Header'
import './Profile.css'
import axios from 'axios';
import { connect } from 'react-redux'

class StudentLoans extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCurrent: false,
      paymentAmount: 0,
      dueDate: '',
      balance: 0
    }
  }

  componentDidMount() {
    this.populateStudentLoan();
  }

  populateStudentLoan = () => {
    let firstname = localStorage.getItem("data")
    let userId = localStorage.getItem("userId")
     this.setState({
       userId : userId
    })

    axios.get(`http://localhost:3000/studentLoan/info/${localStorage.getItem('userId')}`, {

    })
    .then(response => {
      console.log(response.data);
      if(response.data !== null) {
        this.setState({
          isCurrent: true,
          paymentAmount: response.data.paymentAmount,
          dueDate: response.data.dueDate,
          balance: response.data.balance
        })
      }
    })
    console.log('Student Loan Mounted');
  }

  activateStudentLoan = () => {

    console.log('The Student Loan');

    this.setState({
      ...this.state,
      isCurrent: !this.state.isCurrent,
      paymentAmount: this.state.paymentAmount + 600,
      dueDate: this.state.dueDate + 1252019,
      balance: this.state.balance + 50000
    }, () => this.postStudentLoanInfoToDatabase())
  }

  payStudentLoan = () => {
    console.log('Payment Student Loans');
  }

  postStudentLoanInfoToDatabase = () => {

    axios.post('/student_loan', {
      isCurrent: this.state.isCurrent,
      paymentAmount: this.state.paymentAmount,
      dueDate: this.state.dueDate,
      balance: this.state.balance,
      userId: this.state.userId
    })
    .then(data => {

      this.setState({
        isCurrent: data.isCurrent,
        paymentAmount: data.paymentAmount,
        dueDate: data.dueDate,
        balance: data.balance
      }, ()=> {console.log(data + "return data");

      })
    })
    console.log('Student Loan Info Submitted');
  }

  render() {
    return (
    <div>
      <div className="row">
        <div className="col s50 m7">
          <div className="card medium grey darken-3">
      <form>
        <button onClick={() =>this.activateStudentLoan()}><a className="waves-effect deep-purple lighten-1 btn-large">Activate</a></button>
        <h3> Student Loans  </h3>
        <h5> Loan Balance $ {this.props.balance}</h5>
        <h5> Payment Amount $ {this.state.paymentAmount}.00</h5>
      </form>
        <button onClick={this.props.payStudentLoan}id="studentloan_button"><a className="waves-effect deep-purple lighten-1 btn-large">Pay Student Loan</a></button>
       </div>
      </div>
     </div>
    </div>
    )
  }

}
const mapStateToProps = state => {
  return {
    paymentAmount: state.paymentAmount,
    balance: state.balance
  }
}

const mapDispatchToProps = dispatch => {
  return {
  payStudentLoan: () => dispatch({type: 'PAY_STUDENT_LOAN'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (StudentLoans);
