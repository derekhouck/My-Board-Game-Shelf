import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors, startLoading, stopLoading } from './utils';
import { clearAuth } from './auth'
import { clearAuthToken } from '../local-storage';

export const ADD_GAME = 'ADD_GAME';
export const addGame = game => ({
  type: ADD_GAME,
  game
});

export const FETCH_USER_GAMES_SUCCESS = 'FETCH_USER_GAMES_SUCCESS';
export const fetchUserGamesSuccess = games => ({
  type: FETCH_USER_GAMES_SUCCESS,
  games
});

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST
});

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const REMOVE_USER_GAME = 'REMOVE_USER_GAME';
export const removeUserGame = game => ({
  type: REMOVE_USER_GAME,
  game
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

export const addGameToShelf = game => (dispatch, getState) => {
  const { authToken, currentUser } = getState().auth;

  dispatch(startLoading());
  return fetch(`${API_BASE_URL}/users/${currentUser.id}/games`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ gameId: game.id })
  })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
      dispatch(addGame(game));
      dispatch(stopLoading());
    })
    .catch(err => {
      dispatch(usersError(err));
      dispatch(stopLoading());
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

export const fetchUsers = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
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

export const fetchUserGames = (userId, filters) => (dispatch, getState) => {
  let url = new URL(`${API_BASE_URL}/users/${userId}/games`);
  if (filters) {
    Object.keys(filters).forEach(key => {
      return url.searchParams.append(key, filters[key])
    });
  }
  const authToken = getState().auth.authToken;

  dispatch(startLoading());

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(games => {
      dispatch(fetchUserGamesSuccess(games));
      dispatch(stopLoading());
    })
    .catch(err => {
      dispatch(usersError(err));
      dispatch(stopLoading());
    });
}

export const removeGameFromShelf = game => (dispatch, getState) => {
  const { authToken, currentUser } = getState().auth;

  dispatch(startLoading());

  return fetch(`${API_BASE_URL}/users/${currentUser.id}/games`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ gameId: game.id })
  })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
      dispatch(removeUserGame(game));
      dispatch(stopLoading());
    })
    .catch(err => {
      dispatch(usersError(err));
      dispatch(stopLoading());
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