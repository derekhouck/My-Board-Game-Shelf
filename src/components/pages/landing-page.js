import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './landing-page.css';

import Button from '../atoms/button';

export function LandingPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <section className="landing-page">
            <div className="landing-page__copy">
                <h1>Curate your board game collection</h1>
                <p><em>My Board Game Shelf</em> helps you plan the perfect game night.</p>
                <p>You can view your entire board game collection at a glance and filter by title, number of players, and tags.</p>
            </div>
            <div className="landing-page__actions">
                <Link to="/register">
                    <Button
                        primary
                        label="Register for free"
                    />
                </Link>
                <Link to="/sign-in">
                    <Button label="Sign in" />
                </Link>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);