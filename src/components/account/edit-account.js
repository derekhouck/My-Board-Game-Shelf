import React from 'react';
import { connect } from 'react-redux';
import { focus, reduxForm, Field } from 'redux-form';
import { isTrimmed, required, validateEmail } from '../../validators';
import { editUser } from '../../actions/users';
import { refreshAuthToken } from '../../actions/auth';

import Button from '../atoms/button';
import Input from '../atoms/input';

export class EditAccount extends React.Component {
  componentDidMount() {
    const { currentUser, initialize } = this.props;
    const initData = {
      "email": currentUser.email,
      "name": currentUser.name,
      "username": currentUser.username
    };
    initialize(initData);
  }

  onSubmit(values) {
    const { email, name, username } = values;
    const { currentUser, dispatch } = this.props;
    const updateData = {
      email,
      id: currentUser.id,
      name,
      username
    };

    return dispatch(editUser(updateData))
      .then(() => dispatch(refreshAuthToken(true)));
  }

  render() {
    return (
      <form
        className="edit-account-form"
        onSubmit={
          this.props.handleSubmit(values => this.onSubmit(values))
        }
      >
        <fieldset>
          <legend>Edit Your Account</legend>
          <Field
            component={Input}
            label="Name"
            name="name"
            type="text"
          />
          <Field
            component={Input}
            label="Email"
            name="email"
            type="email"
            validate={[required, validateEmail]}
          />
          <Field
            component={Input}
            type="text"
            name="username"
            label="Username"
            validate={[required, isTrimmed]}
          />
        </fieldset>
        <div className="form-actions btn-group">
          <Button
            disabled={this.props.pristine || this.props.submitting}
            type="submit"
            label="Save Edits"
            primary
          />
          <Button
            label="Cancel"
            secondary
            onClick={() => this.props.resetEditing()}
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
  form: 'edit-account-form',
  onSubmitFail: (errors, dispatch) => dispatch(focus('edit-account-form', Object.keys(errors)[0]))
})(connect(mapStateToProps)(EditAccount));