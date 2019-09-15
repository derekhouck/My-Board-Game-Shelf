import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { toggleDeleting } from '../../actions/users';

import Button from '../button';
import EditAccount from './edit-account';
import DeleteAccount from './delete-account';
import ChangePassword from './change-password';

export class Account extends React.Component {
  state = {
    editing: false,
    passwordChange: false
  }

  setEditing(editing) {
    this.setState({ editing });
  }

  setPasswordChange(passwordChange) {
    this.setState({ passwordChange });
  }

  render() {
    const { currentUser, deleting, dispatch } = this.props;
    if (this.state.editing) {
      return <EditAccount
        resetEditing={() => this.setEditing(false)}
      />;
    } else if (this.state.passwordChange) {
      return <ChangePassword
        resetPasswordChange={() => this.setPasswordChange(false)}
      />;
    } else if (deleting) {
      return <DeleteAccount />;
    } else {
      return (
        <section>
          <h1>Your Account</h1>
          <ul>
            <li>
              Name: {currentUser.name}
            </li>
            <li>
              Email: {currentUser.email}
            </li>
            <li>
              Username: {currentUser.username}
            </li>
          </ul>
          <Button
            label="Edit Account"
            onClick={() => this.setEditing(true)}
          />
          <div>
            <h2>Change Your Password</h2>
            <Button
              label="Change Password"
              onClick={() => this.setPasswordChange(true)}
              secondary
            />
          </div>
          <div>
            <h2>Delete Your Account</h2>
            <p>
              <strong>Warning: This action cannot be undone!</strong>
            </p>
            <Button
              primary
              className="delete-account-button"
              onClick={() => dispatch(toggleDeleting())}
              label="Delete Account"
            />
          </div>
        </section>
      );
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  deleting: state.users.deleting
});

export default requiresLogin()(connect(mapStateToProps)(Account));