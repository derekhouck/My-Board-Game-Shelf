import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';
import { action as toggleMenu } from 'redux-burger-menu';

import Menu from './Menu';
import MenuButton from './menu-button';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(toggleMenu(false));
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let appTitle, headerNav;
    if (this.props.loggedIn) {
      appTitle = (
        <Link to="/dashboard" className="App-title">
          My Board Game Shelf
          </Link>
      );
      headerNav = (
        <Menu
          right
          pageWrapId={"AppMain"}
          outerContainerId={"App"}
          customBurgerIcon={<MenuButton />}
        >
          <Link 
            to="/games/add"
            onClick={() => this.props.dispatch(toggleMenu(false))}
          >
            Add a game
          </Link>
          <Link to="/account" onClick={() => this.props.dispatch(toggleMenu(false))}>Your account</Link>
          <button className="App-header__logout" onClick={() => this.logOut()}>Log out</button>
        </Menu>
      );
    } else {
      appTitle = (
        <Link to="/" className="App-title">My Board Game Shelf</Link>
      );
      headerNav = (<Link to="/sign-in">Sign in</Link>);
    }

    return (
      <header className="App-header">
        {appTitle}
        {headerNav}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);