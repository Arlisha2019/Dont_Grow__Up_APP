import React, { Component } from 'react';
import {Menu} from './Menu'
import Header from './Header'
import './Profile.css'
import axios from 'axios';
import { connect } from 'react-redux'


class Housing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isCurrent: false,
      rentAmount: 0,
      dueDate: ''
    }
  }

  componentDidMount() {
    this.populateHousing();
  }

  populateHousing = () => {

    let firstname = localStorage.getItem("data")
    let userId = localStorage.getItem("userId")
     this.setState({
       userId : userId
    })
    axios.get(`http://localhost:3000/housing/info/${localStorage.getItem('userId')}`, {

    })
    .then(response => {
      console.log(response.data);
      if(response.data !== null) {
        this.setState({
          isCurrent: true,
          rentAmount: response.data.rentAmount,
          dueDate: response.data.dueDate
        })
      }
    })
    console.log('Housing Mounted');
  }


  activateHousing = () => {
    console.log('Housing Button Working');

    this.setState({
      ...this.state,
      isCurrent: !this.state.isCurrent,
      rentAmount: 1600,
      dueDate: 1252019
    }, () => this.postHousingInfoToDatabase())
  }

  payRent = () => {
    console.log('Payment Apartment Rent');
  }

  postHousingInfoToDatabase = () => {

    axios.post('/housing', {
      isCurrent: this.state.isCurrent,
      rentAmount: this.state.rentAmount,
      dueDate: this.state.dueDate,
      userId: this.state.userId
    })
    .then(data => {
      this.setState({
        isCurrent: data.isCurrent,
        rentAmount: data.rentAmount,
        dueDate: data.dueDate
        }, () => {console.log(data + 'return Housing');
      })
    })
    console.log('Housing Info Submitted');
  }

  render() {
    return (
       <div>
        <div className="row">
         <div className="col s50 m7">
          <div className="card medium red darken-3">
        <form>
        <button onClick={() => this.activateHousing()}><a className="waves-effect deep-purple lighten-1 btn-large">Activate </a></button>
          <h3> Housing </h3>
          <h5> Rent Amount $ {this.state.rentAmount} </h5>

        </form>
        <button onClick={this.props.payRent}id="housing_button" ><a className="waves-effect deep-purple lighten-1 btn-large">Pay Rent Now</a></button>
       </div>
      </div>
     </div>
    </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    rentAmount: state.rentAmount
  }
}

const mapDispatchToProps = dispatch => {
  return {
  payRent: () => dispatch({type: 'PAY_RENT'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Housing);
