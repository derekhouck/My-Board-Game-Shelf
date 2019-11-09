import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styles from './registration-page.module.css';

import RegistrationForm from './registration-form';
import Button from '../atoms/button';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className={styles.registrationPage}>
      <h1>Create an Account</h1>
      <RegistrationForm />
      <div>
        <h2>Already have an account?</h2>
        <Link to="/sign-in">
          <Button
            label="Sign in"
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