import React from "react";
import requiresLogin from "./requires-login";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchUsers } from "../actions/users";
import './users.css';

export class Users extends React.Component {
  componentDidMount() {
    const { dispatch, isAdmin } = this.props;
    if (isAdmin) {
      dispatch(fetchUsers());
    }
  }

  renderUsers() {
    let body;

    if (this.props.error) {
      body = (
        <div className="message message-error">{this.props.error.message}</div>
      );
    } else if (this.props.loading) {
      body = <div className="message message-default">Loading users...</div>;
    } else {
      const users = this.props.users.map(user => (
        <tr className="user" key={user.id} id={user.id}>
          <td>
            {user.username}
          </td>
          <td>
            {user.name}
          </td>
          <td>
            {user.admin ? "Yes" : "No"}
          </td>
        </tr>
      ));

      body = (
        <table className="users">
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Admin</th>
          </tr>
          {users}
        </table>
      );
    }

    return body;
  }

  render() {
    const { isAdmin } = this.props;
    return isAdmin
      ? <section>
        <h2>Users</h2>
        {this.renderUsers()}
      </section>
      : <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  error: state.users.error,
  isAdmin: state.auth.currentUser.admin,
  users: state.users.users,
  loading: state.users.loading,
});

export default requiresLogin()(connect(mapStateToProps)(Users));
