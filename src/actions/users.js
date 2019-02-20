import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { clearAuth, refreshAuthToken } from './auth'
import { clearAuthToken } from '../local-storage';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST
});

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const SET_EDITING = 'SET_EDITING';
export const setEditing = editing => ({
  type: SET_EDITING,
  editing
});

export const TOGGLE_DELETING = 'TOGGLE_DELETING';
export const toggleDeleting = () => ({
  type: TOGGLE_DELETING
});

export const USERS_ERROR = 'USERS_ERROR';
export const usersError = error => ({
  type: USERS_ERROR,
  error
});

export const fetchUsers = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log(authToken);
  dispatch(fetchUsersRequest());
  return fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(users => dispatch(fetchUsersSuccess(users)))
    .catch(err => {
      dispatch(usersError(err));
    });
}

export const registerUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const editUser = user => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/users/${user.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(user => dispatch(refreshAuthToken(true)))
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const deleteUser = user => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/users/${user.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(() => {
      dispatch(clearAuth());
      clearAuthToken();
    })
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
}