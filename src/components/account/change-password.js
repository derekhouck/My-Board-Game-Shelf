import React from 'react';
import { connect } from 'react-redux';
import { focus, reduxForm, Field } from 'redux-form';
import { isTrimmed, length, matches, nonEmpty, required } from '../../validators';

import Button from '../button';
import Input from '../atoms/input';
import { editUser } from '../../actions/users';

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class ChangePassword extends React.Component {
  onSubmit(values) {
    const { password } = values;
    const updateData = {
      id: this.props.currentUser.id,
      password
    };

    return this.props.dispatch(editUser(updateData));
  }

  render() {
    return (
      <form
        className="change-password-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <fieldset>
          <legend>Change Your Password</legend>
          <Field
            component={Input}
            type="password"
            name="password"
            id="password"
            label="New Password"
            validate={[required, isTrimmed, passwordLength]}
          />
          <Field
            component={Input}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            label="Confirm new password"
            validate={[required, matchesPassword, nonEmpty]}
          />
        </fieldset>
        <div className="form-actions btn-group">
          <Button
            disabled={this.props.pristine || this.props.submitting}
            type="submit"
            label="Change Password"
            primary
          />
          <Button
            label="Cancel"
            onClick={() => this.props.resetPasswordChange()}
            secondary
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default reduxForm({
  form: 'change-password-form',
  onSubmitFail: (errors, dispatch) => dispatch(focus('change-password-form', Object.keys(errors)[0]))
})(connect(mapStateToProps)(ChangePassword));