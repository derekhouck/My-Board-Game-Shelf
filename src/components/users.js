import React from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions/users';

class Users extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  renderUsers() {
    let body;

    if (this.props.error) {
      body = (
        <div className="message message-error">{this.props.error}</div>
      );
    } else if (this.props.loading) {
      body = (
        <div className="message message-default">Loading board...</div>
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

export default connect(mapStateToProps)(Users);