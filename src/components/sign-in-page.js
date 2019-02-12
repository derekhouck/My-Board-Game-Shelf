import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../styles/sign-in-page.css';

import LoginForm from './login-form';
import Button from './button';


export function SignInPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="sign-in-page">
      <h1>Sign into your account</h1>
      <LoginForm />
      <div>
        <h2>Don't have an account?</h2>
        <Link to="/register">
          <Button 
            label="Register"
          />
        </Link>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(SignInPage);