import React from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../styles/landing-page.css';

import LoginForm from './login-form';
import Button from './button';

export function LandingPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="landing-page">
            <h2>Welcome to<br /><strong>My Board Game Shelf</strong></h2>
            <LoginForm />
            <Link to="/register">
                <Button label="Register" />
            </Link>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);