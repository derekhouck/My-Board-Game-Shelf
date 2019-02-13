import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import './App.css';

import HeaderBar from './components/header-bar/header-bar';
import LandingPage from './components/landing-page';
import SignInPage from './components/sign-in-page/sign-in-page';
import RegistrationPage from './components/registration-page/registration-page';
import Dashboard from './components/dashboard';
import GameForm from './components/game-form';
import Users from './components/users';
import Account from './components/account/account';
import { refreshAuthToken } from './actions/auth';

class App extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="App" id="App">
        <HeaderBar />
        <main className="App-main" id="AppMain">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/sign-in" component={SignInPage} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/games/add" component={GameForm} />
          <Route exact path="/games/:id/edit" component={GameForm} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/users" component={Users} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
