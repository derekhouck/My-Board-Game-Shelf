import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import './App.css';

import HeaderBar from './components/header-bar';
import LandingPage from './components/landing-page';
import RegistrationPage from './components/registration-page';
import Dashboard from './components/dashboard';
import Users from './components/users';
import GameForm from './components/game-form';
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
      <div className="App">
        <HeaderBar />
        <main className="App-main">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/games/add" component={GameForm} />
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
