import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import '../styles/registration-page.css';

import RegistrationForm from './registration-form';
import Button from './button';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="registration-page">
      <h2>Create an Account</h2>
      <RegistrationForm />
      <div>
      <h3>Already have an account?</h3>
      <Link to="/">
        <Button 
          label="Log In"
        />
      </Link>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);