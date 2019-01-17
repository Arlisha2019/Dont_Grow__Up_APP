import React, { Component } from 'react';
import Header from './Header'
import {Menu} from './Menu'
import './Profile.css'
import axios from 'axios';
import { connect } from 'react-redux'


class Vehicle extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isCurrent: false,
      paymentAmount: 0,
      dueDate: '',
      vehBalance: 0,
      interestRate: 0
    }
  }

  componentDidMount() {
    this.populateVehicle();
  }

  populateVehicle = () => {
    let firstname = localStorage.getItem("data")
    let userId = localStorage.getItem("userId")
     this.setState({
       userId : userId
    })

    axios.get(`http://localhost:3000/vehicle/info/${localStorage.getItem('userId')}`, {

    })
    .then(response => {
      console.log(response.data);
      if(response.data !== null) {
        this.setState({
          isCurrent: true,
          paymentAmount: response.data.paymentAmount,
          dueDate: response.data.dueDate,
          balance: response.data.balance,
          interestRate: response.data.interestRate
        })
      }
    })
    console.log('Vehicle Mounted');
  }

  activateVehicle = () => {

    console.log('Vehicle Button is working');

    this.setState({
      ...this.setState,
      isCurrent: !this.state.isCurrent,
      paymentAmount: this.state.paymentAmount + 1200,
      dueDate: this.state.dueDate + 1252019,
      vehBalance: this.state.vehBalance + 35000,
      interestRate: this.state.interestRate + 12.67
    }, () => this.postVehicleInfoToDatabase())
  }
  payVehicleNote = () => {
    console.log('Vehicle Payment');
  }

  postVehicleInfoToDatabase = () => {

  axios.post('/vehicle', {
    isCurrent: this.state.isCurrent,
    paymentAmount: this.state.paymentAmount,
    dueDate: this.state.dueDate,
    vehBalance: this.state.vehBalance,
    interestRate: this.state.interestRate,
    userId: this.state.userId
  })
  .then(data => {
    this.setState({
      isCurrent: data.isCurrent,
      paymentAmount: data.paymentAmount,
      dueDate: data.dueDate,
      vehBalance: data.vehBalance,
      interestRate: data.interestRate
    }, ()=> {console.log(data + 'return Vehicle');
    })
  })
  console.log('Vehicle Info Submitted');
}

  render() {
    return (
    <div>
      <div className="row">
        <div className="col s50 m7">
          <div className="card medium orange">
      <form>
      <button onClick={() => this.activateVehicle()}><a className="waves-effect deep-purple lighten-1 btn-large">Activate Vehicle</a></button>
        <h3> Vehicle</h3>
        <h5> Loan Balance $ {this.props.vehBalance} </h5>
        <h5> Payment Amount $ {this.state.paymentAmount}.00 </h5>
        <h5> Interest Rate {this.state.interestRate} %</h5>
      </form>
        <button onClick={this.props.payVehicleNote}id="vehicle_button"><a className="waves-effect deep-purple lighten-1 btn-large">Vehicle Payment</a></button>
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
    vehBalance: state.vehBalance
  }
}

const mapDispatchToProps = dispatch => {
  return {
  payVehicleNote: () => dispatch({type: 'PAY_VEHICLE_NOTE'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
