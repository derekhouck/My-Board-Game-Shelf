import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render () {
    // Only render the log out button if we are logged in
    let logOutButton, appTitle;
    if (this.props.loggedIn) {
        appTitle = (
          <Link to="/dashboard" className="App-title">
            My Board Game Shelf
          </Link>
        );
        logOutButton = (
            <button onClick={() => this.logOut()}>Log out</button>
        );
    } else {
      appTitle = (
        <div className="App-title">My Board Game Shelf</div>
      );
    }

    return (
      <header className="App-header">
        { appTitle }
        { logOutButton }
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);