import React from 'react';
import { connect } from 'react-redux';
import { focus, reduxForm, Field } from 'redux-form';
import { isTrimmed, required } from '../../validators';
import { editUser } from '../../actions/users';
import { refreshAuthToken } from '../../actions/auth';

import Button from '../button';
import Input from '../input';

export class EditAccount extends React.Component {
  componentDidMount() {
    const initData = {
      "name": this.props.currentUser.name,
      "username": this.props.currentUser.username
    };
    this.props.initialize(initData);
  }

  onSubmit(values) {
    const { name, username } = values;
    const { currentUser, dispatch } = this.props;
    const updateData = {
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
            type="text"
            name="name"
            label="Name"
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