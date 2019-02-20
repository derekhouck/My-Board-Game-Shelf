import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { toggleDeleting } from '../../actions/users';

import DeleteAccount from './delete-account';
import Button from '../button';

export function Account(props) {
  if (props.deleting) {
    return <DeleteAccount />;
  } else {
    return (
      <section>
        <h1>Your Account</h1>
        <ul>
          <li>
            Name: {props.currentUser.name}
          </li>
          <li>
            Username: {props.currentUser.username}
          </li>
        </ul>
        <div>
          <h2>Delete Your Account</h2>
          <p>
            <strong>Warning: This action cannot be undone!</strong>
          </p>
          <Button
            onClick={() => props.dispatch(toggleDeleting())}
            label="Delete Account"
          />
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