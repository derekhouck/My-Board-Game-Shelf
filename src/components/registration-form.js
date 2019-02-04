import React from 'react';

export default function RegistrationForm(props) {
  return (
    <form className="registration-form">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" />
      <label htmlFor="username">Username</label>
      <input type="text" name="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password"/>
      <label htmlFor="passwordConfirm">Confirm password</label>
      <input type="password" name="passwordConfirm" id="passwordConfirm"/>
      <button type="submit">Create Account</button>
    </form>
  );
}