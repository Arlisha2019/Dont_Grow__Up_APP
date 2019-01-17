import React, {Component} from 'react';
import {Menu} from './Menu'
import Header from './Header'
import BankAccount from './BankAccount'
import CreditCard from './CreditCard'
import Housing from './Housing'
import StudentLoans from './StudentLoans'
import Vehicle from './Vehicle'
import axios from "axios";
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css'
import { connect } from 'react-redux'




class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isProfileCompleted: false,
      isFetching: false,
      firstName: '',
      major: '',
      city: '',
      salary: 0
    }
    this.cityHandleChange = this.cityHandleChange.bind(this);
    this.majorHandleChange = this.majorHandleChange.bind(this);

  }



  componentDidMount() {

    let firstname = localStorage.getItem("data")
    let userId = localStorage.getItem("userId")
    this.setState({
      firstName: firstname.charAt(0).toUpperCase() + firstname.slice(1),
      userId: userId
    })

    axios.post(`http://localhost:3000/profile/getinfo/${localStorage.getItem('userId')}`, {
        // userId: this.state.userId
      })
      .then(response => {
        console.log(response.data);
        if (response.data !== null) {
          this.setState({
            isFetching: true,
            major: response.data.major,
            city: response.data.city,
            salary: 65000,
            isProfileCompleted: true
          })
        } else {
          this.setState({
            major: "Please choose major",
            city: "Please choose city"
          })
        }
      })
  }




  //   getProfile = (e) =>
  //
  //       {
  //     e.preventDefault();
  //     axios.post(`http:localhost:3000/profile/getinfo/${localStorage.getItem('userId')}`, {
  //     // userId: this.state.userId
  //
  //   })
  //   .then(response => {
  //     console.log(response.data);
  //     this.setState({
  //       isFetching: true,
  //       major: response.data.major,
  //       city: response.data.city,
  //       salary: response.data.salary,
  //       isProfileCompleted: true
  //     })
  //   }
  //   )
  // }


  cityHandleChange(event) {
    this.setState({
      city: event.target.value
    })
  }

  majorHandleChange(event) {
    this.setState({
      major: event.target.value

    })
  }

  submitProfile = (e) => {
    console.log('I clicked the button');

    e.preventDefault();

    this.setState({
      salary: 65000
    })

    axios.post('/new_profile', {
        major: this.state.major,
        city: this.state.city,
        isProfileCompleted: true,
        salary: this.state.salary,
        userId: this.state.userId
      })
      .then(data => {

        console.log(data);
      })
    console.log('Profile Submitted');
    this.props.history.push('/profile')
  }



  // fetchQuotes = () => {
  //    this.setState({...this.state, isFetching: true})
  //    fetch(QUOTE_SERVICE_URL)
  //      .then(response => response.json())
  //      .then(result => this.setState({quotes: result,
  //                                     isFetching: false}))
  //      .catch(e => console.log(e));
  //  }
  // }


  render() {
    const isProfileCompleted = this.state.isProfileCompleted;
    return (
      <div >
        <h2 > Welcome {this.state.firstName} to your profile page < /h2>
        {isProfileCompleted ? (
          < div id = "profile_info" >
            < h4 > My Current Occupation: { this.state.major } < /h4>
            < h4 > My Current City: { this.state.city } < /h4>
            < h4 > My Current Salary: $ { this.state.salary } < /h4>
            <h4>Pay Check Amount $1,906 </h4>

          < /div >
      ) : (
        <div className = "container" >
          <form >
            <div className = "form_container_1" >
              <label>Choose your desired occupation</label>
                <select style={{display: 'inline-block'}} value = {this.state.major} onChange = {this.majorHandleChange}>
                  <option value = "Business" > Business < /option>
                  <option value = "Science" > Science < /option>
                  <option value = "Education" > Education < /option>
                  <option value = "Engineering" > Engineering < /option>
                  <option value = "Nursing" > Nursing < /option>
                  <option value = "Arts" > Art < /option>
                </select >

              </div>

              <div className = "form_container_2" >
              <label >Choose your desired living location< /label>
                <select  style={{display: 'inline-block'}} value = {this.state.city} onChange = {this.cityHandleChange} >
                  < option value = "San Francisco" > San Francisco, CA < /option>
                  < option value = "Atlanta" > Atlanta, GA < /option>
                  < option value = "New York" > New York, NY < /option>
                  < option value = "Chicago" > Chicago, IL < /option>
                  < option value = "Houston" > Houston, TX < /option>
                  < option value = "Denver" > Denver, CO < /option>
                  < option value = "DC" > Washington, DC < /option>
                  < option value = "Seattle" > Seattle, WA < /option>
                  < option value = "Dallas" > Dallas, TX < /option>
                < /select>
              < /div>

              < button onClick = { this.submitProfile}> Submit </button>
            < /form >
          </div>


      ) }

      <div className = "container_3" >
        <div id = "bank_acc_container" >
          <BankAccount / >
        </div>
        <div id = "credit_card_container" >
          <CreditCard / >
        </div>
        <div id = "housing_continer" >
          <Housing / >
        </div>
        <div id = "student_loans_container" >
          <StudentLoans / >
        </div>
        <div id = "vehicle_container" >
          <Vehicle/ >
        </div>
      </div>

    </div>
    )
  }
}



export default Profile;
