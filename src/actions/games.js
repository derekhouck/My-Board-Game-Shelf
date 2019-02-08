import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_GAMES_REQUEST = 'FETCH_GAMES_REQUEST';
export const fetchGamesRequest = () => ({
  type: FETCH_GAMES_REQUEST
});

export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
export const fetchGamesSuccess = games => ({
  type: FETCH_GAMES_SUCCESS,
  games
});

export const REMOVE_GAME = 'REMOVE_GAME';
export const removeGame = game => ({
  type: REMOVE_GAME,
  game
});

export const GAMES_ERROR = 'GAMES_ERROR';
export const gamesError = error => ({
  type: GAMES_ERROR,
  error
});

export const fetchGames = filters => (dispatch, getState) => {
  let url = new URL(`${API_BASE_URL}/games`);
  if (filters) {
    Object.keys(filters).forEach(key => {
      return url.searchParams.append(key, filters[key])
    });
  }
  const authToken = getState().auth.authToken;

  dispatch(fetchGamesRequest());

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(games => dispatch(fetchGamesSuccess(games)))
    .catch(err => {
      dispatch(gamesError(err));
    });
}

export const addGame = game => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/games`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(game)
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

export const editGame = game => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/games/${game.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(game)
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

export const deleteGame = game => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/games/${game.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(removeGame(game)))
    .catch(err => {
      dispatch(gamesError(err));
    });
};