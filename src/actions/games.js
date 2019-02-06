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

export const GAMES_ERROR = 'GAMES_ERROR';
export const gamesError = error => ({
  type: GAMES_ERROR,
  error
});

export const fetchGames = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchGamesRequest());
  return fetch(`${API_BASE_URL}/games`, {
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