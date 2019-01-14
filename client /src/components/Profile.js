import React, { Component } from 'react';
import {Menu} from './Menu'
import Header from './Header'
import axios from "axios";
import './Profile.css'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isProfileCompleted: false,
      isFetching: false,
      firstName: '',
      major: '',
      city: ''
    }
      this.cityHandleChange = this.cityHandleChange.bind(this);
      this.majorHandleChange = this.majorHandleChange.bind(this);

    }


  componentDidMount() {

   let firstname = localStorage.getItem("data")

    this.setState({
      firstName: firstname.charAt(0).toUpperCase() + firstname.slice(1)
    })



  //   fetch('http://localhost:3000/profile')
  //   .then(res => res.json())
  //   .then
  //     ((result) => {
  //       this.setState({
  //         isFetching:true,
  //         firstName: result.firstName
  //       })
  //     },
  //   (error => console.log("This is not working " + error)
  //   )
  // )
}
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

    e.preventDefault();

    axios.post('/new_profile', {
      major: this.state.major,
      city: this.state.city,
      isProfileCompleted: true
    })
    .then(data => {
      this.props.history.push('/profile');
      console.log(data);
    })
    console.log('submitProfile');
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
    return (


      <div>
        <Menu/>
         <h2> Welcome {this.state.firstName} to your profile page </h2>
        <div className="container">
        <form>
         <div className="form_container_1">
          <label>
            Choose your desired occupation
         <select value={this.state.major} onChange={this.majorHandleChange}>
            <option value="business">Business</option>
            <option value="science">Science</option>
            <option value="education">Education</option>
            <option value="engineering">Engineering</option>
            <option value="nursing">Nursing</option>
            <option value="arts">Art</option>
        </select>
         </label>
          </div>
        <div className="form_container_2">
         <label>
          Choose your desired living location
         <select value={this.state.city} onChange={this.cityHandleChange}>
            <option value="sanfrancisco">San Francisco, CA</option>
            <option value="atlanta">Atlanta, GA</option>
            <option value="newYork">New York, NY</option>
            <option value="chicago">Chicago, IL</option>
            <option value="houston">Houston, TX</option>
            <option value="denver">Denver, CO</option>
            <option value="dc">Washington, DC</option>
            <option value="seattle">Seattle, WA</option>
            <option value="dallas">Dallas, TX</option>
         </select>
        </label>
         </div>
            <button onClick={this.submitProfile}>Submit </button>
        </form>
      </div>
    </div>


    )
  }

}
 export default Profile;
