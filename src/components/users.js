import React from 'react';
import requiresLogin from './requires-login';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions/users';

export class Users extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  renderUsers() {
    let body;

    if (this.props.error) {
      body = (
        <div className="message message-error">{this.props.error.message}</div>
      );
    } else if (this.props.loading) {
      body = (
        <div className="message message-default">Loading users...</div>
      );
    } else {
      const users = this.props.users.map(user => (
        <li className="user" key={user.id} id={user.id}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Name:</strong> {user.name}</p>
        </li>
      ));

      body = (
        <ul className="users">
          {users}
        </ul>
      );
    }

    return body;
  }

  render() {
    return (
      <section>
        <h2>Users</h2>
        {this.renderUsers()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  loading: state.users.loading,
  error: state.users.error
});

export default requiresLogin()(connect(mapStateToProps)(Users));