import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST
});

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const USERS_ERROR = 'USERS_ERROR';
export const usersError = error => ({
  type: USERS_ERROR,
  error
});

export const fetchUsers = () => dispatch => {
  dispatch(fetchUsersRequest());
  return fetch(`${API_BASE_URL}/users`)
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(users => dispatch(fetchUsersSuccess(users)))
    .catch(err => {
      dispatch(usersError(err));
    });
}