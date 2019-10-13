import React from 'react';
import { requiresLogin } from './requires-login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const requiresAdmin = () => Component => {
  function RequiresAdmin(props) {
    const { isAdmin, ...passThroughProps } = props;
    return isAdmin
      ? <Component {...passThroughProps} />
      : <Redirect to="/" />;
  }

  RequiresAdmin.defaultProps = {
    isAdmin: false
  };

  const mapStateToProps = state => ({
    isAdmin: state.auth.currentUser
      ? state.auth.currentUser.admin
      : false,
  });

  return connect(mapStateToProps)(requiresLogin()(RequiresAdmin));
};