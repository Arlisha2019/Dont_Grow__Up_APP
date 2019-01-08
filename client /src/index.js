import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BankAccount from './components/BankAccount'
import CreditCard from './components/CreditCard'
import Housing from './components/Housing'
import Profile from './components/Profile'
import StudentLoans from './components/StudentLoans'
import Vehicle from './components/Vehicle'
import { Register } from './components/Register'
import Login from './components/Login'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App>
    <Switch>
      <Route exact path="/profile" component={Profile}/>
      <Route path="/bank_acc" component={BankAccount} />
      <Route path="/credit_cards" component={CreditCard} />
      <Route path="/student_loans" component={StudentLoans} />
      <Route path="/vehicle" component={Vehicle} />
      <Route path="/housing" component={Housing} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
    </App>
  </BrowserRouter>



  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
