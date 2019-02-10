import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { toggleDeleting } from '../actions/users';

import DeleteAccount from './delete-account';

export function Account(props) {
  if (props.deleting) {
    return <DeleteAccount />;
  } else {
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
        <div>
          <h3>Delete Your Account</h3>
          <p><strong>Warning: This action cannot be undone!</strong></p>
          <button onClick={() => props.dispatch(toggleDeleting())}>Delete Account</button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  deleting: state.users.deleting
});

export default requiresLogin()(connect(mapStateToProps)(Account));