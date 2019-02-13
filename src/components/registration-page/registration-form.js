import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import { required, nonEmpty, matches, length, isTrimmed } from '../../validators';

import Input from '../input';
import Button from '../button';

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');


export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, name } = values;
    const user = { username, password, name };
    return this.props.dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form
        className="registration-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <Field
          component={Input}
          type="text"
          name="name"
          label="Name"
        />
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
        <Button 
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