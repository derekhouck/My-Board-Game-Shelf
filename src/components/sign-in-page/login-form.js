import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { required, nonEmpty } from '../../validators';

import Input from '../atoms/input';
import Button from '../button';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        const isDisabled = () => this.props.pristine || this.props.submitting;
        let error, body;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error.message}
                </div>
            );
        }
        if (this.props.loading) {
            body = (
                <div className="message message-default">
                    Logging you in...
                </div>
            );
        } else {
            body = (
                <form
                    className="login-form"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    {error}
                    <fieldset>
                        <legend>Account details</legend>
                        <Field
                            component={Input}
                            type="text"
                            name="username"
                            id="username"
                            label="Username"
                            validate={[required, nonEmpty]}
                        />
                        <Field
                            component={Input}
                            type="password"
                            name="password"
                            id="password"
                            label="Password"
                            validate={[required, nonEmpty]}
                        />
                    </fieldset>
                    <Button
                        label="Sign in"
                        disabled={isDisabled()}
                        primary
                    />
                </form>
            );
        }
        return body;
    }
}

const mapStateToProps = state => ({
    error: state.auth.error,
    loading: state.auth.loading
});

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(connect(mapStateToProps)(LoginForm));