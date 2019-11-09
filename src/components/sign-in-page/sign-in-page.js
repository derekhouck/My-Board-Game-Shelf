import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styles from './sign-in-page.module.css';

import LoginForm from './login-form';
import Button from '../atoms/button';


export function SignInPage(props) {
  let body;

  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  if (props.loading) {
    body = (
      <div className="message message-default">
        Logging you in...
      </div>
    );
  } else {
    body = (
      <div className="sign-in-body">
        <LoginForm />
        <div>
          <h2>Don't have an account?</h2>
          <Link to="/register">
            <Button
              label="Register"
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.signInPage}>
      <h1>Sign into your account</h1>
      {body}
    </section>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(SignInPage);