import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";

import HeaderBar from "./components/header-bar/header-bar";
import LandingPage from "./components/landing-page";
import SignInPage from "./components/sign-in-page/sign-in-page";
import RegistrationPage from "./components/registration-page/registration-page";
import Dashboard from "./components/dashboard";
import GameForm from "./components/game-form";
import Users from "./components/users";
import Account from "./components/account/account";
import NotFound from "./components/404";
import { refreshAuthToken } from "./actions/auth";
import GamesPage from "./components/games/games-page";
import AdminGames from "./components/admin/admin-games";

export class App extends Component {
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
    const { loggedIn } = this.props;
    return (
      <div className="App" id="App" loggedin={loggedIn ? loggedIn.toString() : 'false'}>
        <HeaderBar />
        <main className="App-main" id="AppMain">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/sign-in" component={SignInPage} />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/games" component={GamesPage} />
            <Route exact path="/games/add" component={withRouter(GameForm)} />
            <Route
              exact
              path="/games/:id/edit"
              component={withRouter(GameForm)}
            />
            <Route exact path="/account" component={Account} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/admin/games" component={AdminGames} />
            <Route component={NotFound} />
          </Switch>
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
