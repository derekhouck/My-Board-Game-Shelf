import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import { nonEmpty, matches, length, isTrimmed, required, validateEmail } from '../../validators';

import Input from '../atoms/input';
import Button from '../atoms/button';

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');


export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { email, name, password, username } = values;
    const user = { email, name, password, username };
    return this.props.dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form
        className="registration-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <fieldset>
          <legend>About you</legend>
          <Field
            component={Input}
            type="text"
            name="name"
            label="Name"
          />
          <Field
            component={Input}
            name="email"
            label="Email"
            type="email"
            validate={[required, validateEmail]}
          />
        </fieldset>
        <fieldset>
          <legend>Account details</legend>
          <Field
            component={Input}
            type="text"
            name="username"
            label="Username"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <Field
            component={Input}
            type="password"
            name="password"
            id="password"
            label="Password"
            validate={[required, isTrimmed, passwordLength]}
          />
          <Field
            component={Input}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            label="Confirm password"
            validate={[required, matchesPassword, nonEmpty]}
          />
        </fieldset>
        <Button
          disabled={this.props.pristine || this.props.submitting}
          type="submit"
          label="Create Account"
          primary
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);