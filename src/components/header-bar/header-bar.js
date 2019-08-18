import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';
import { action as toggleMenu } from 'redux-burger-menu';
import logo from './logo.svg';
import './header-bar.css';

import Menu from './Menu';
import MenuButton from './menu-button';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(toggleMenu(false));
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    const { currentUser, dispatch, loggedIn } = this.props;
    let headerNav;
    const adminMenu = (
      <div className="admin-menu">
        <Link to="/users" onClick={() => dispatch(toggleMenu(false))}>Users</Link>
        <Link to="/admin/games" onClick={() => dispatch(toggleMenu(false))}>Games</Link>
      </div>
    );
    const appTitle = (
      <Link to={loggedIn ? '/dashboard' : '/'} className="App-title">
        <img src={logo} alt="My Board Game Shelf" />
      </Link>
    );

    // Only render the log out button if we are logged in
    if (loggedIn) {
      headerNav = (
        <Menu
          right
          pageWrapId={"AppMain"}
          outerContainerId={"App"}
          customBurgerIcon={<MenuButton />}
        >
          <Link
            to="/games/add"
            onClick={() => dispatch(toggleMenu(false))}
          >
            Add a game
          </Link>
          <Link to="/account" onClick={() => dispatch(toggleMenu(false))}>Your account</Link>
          <button className="App-header__logout" onClick={() => this.logOut()}>Log out</button>
          {currentUser && currentUser.admin ? adminMenu : null}
        </Menu>
      );
    } else {
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
  currentUser: state.auth.currentUser,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);