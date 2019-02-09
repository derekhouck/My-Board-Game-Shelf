import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export function Account(props) {
  return (
    <section>
      <h2>Your Account</h2>
      <ul>
        <li>
          Name: {props.currentUser.name}
        </li>
        <li>
          Username: {props.currentUser.username}
        </li>
      </ul>
    </section>
  );
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(Account));