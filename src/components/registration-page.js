import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/users" />;
  }
  return (
    <section>
      <h2>Create an Account</h2>
      <RegistrationForm />
      <Link to="/">Login</Link>
    </section>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);