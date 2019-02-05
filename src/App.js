import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';

import HeaderBar from './components/header-bar';
import LandingPage from './components/landing-page';
import RegistrationPage from './components/registration-page';
import Users from './components/users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
