import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';
import { Link } from 'react-router-dom';
import { toggleDeleting, deleteUser } from '../../actions/users';
import { required, nonEmpty, matches } from '../../validators';

import Button from '../atoms/button';
import Input from '../atoms/input';

const matchesUsername = matches('username');


export class DeleteAccount extends React.Component {
  componentDidMount() {
    const initData = {
      "username": this.props.currentUser.username
    }
    this.props.initialize(initData);
  }

  componentWillUnmount() {
    this.props.dispatch(toggleDeleting());
  }

  onSubmit(values) {
    this.props.dispatch(deleteUser(this.props.currentUser));
  }

  render() {
    const username = this.props.currentUser.username;

    return (
      <section>
        <h2>Are you sure you want to delete your account?</h2>
        <p>This will delete all the games in your collection. This action cannot be undone.</p>
        <p>If you still want to proceed, type your username, <strong>{username}</strong>, into the text box below.</p>
        <form
          className="delete-account-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <Field
            component="input"
            type="hidden"
            name="username"
          />
          <Field
            component={Input}
            type="text"
            name="confirmUsername"
            id="confirmUsername"
            validate={[required, nonEmpty, matchesUsername]}
          />
          <Button
            primary
            type="submit"
            label="Delete My Account"
          />
        </form>
        <Link to="/dashboard">
          <Button
            label="I've changed my mind"
          />
        </Link>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default reduxForm({
  form: 'delete-account',
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
})(connect(mapStateToProps)(DeleteAccount));