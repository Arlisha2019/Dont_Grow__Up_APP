import React, { Component } from 'react';
import { Menu, Footer } from './components/Menu'
import AuthHelperMethods from './components/AuthHelperMethods';
import withAuth from './components/withAuth';
import './App.css';



class App extends Component {

  Auth = new AuthHelperMethods();

  constructor(props) {
    super(props)

    this.state = {
    username: "",
    password: ""

    }
  }

  _handleLogout = () => {

    this.Auth.logout()

    this.props.history.replace('/login');
  }

  render () {

    let name = this.state.username;

  return (
    <div className="App">
      <div className="main-page">
        <div className="top-section">
        </div>
        <div>
          {this.props.children}
        </div>
        <div className="bottom-section">
        <Footer />
        </div>
      </div>
    </div>
      );
    }
  }

export default App;

// class App extends Component {
//
//
//   Auth = new AuthHelperMethods();
//
//   render() {
//     return (
//       <div>
//         <Menu />
//         <h1> Welcome to the "Don't Grow Up: Credit Builder" App </h1>
//         {this.props.children}
//         <Footer />
//       </div>
//     );
//   }
// }
//
// export default App;
