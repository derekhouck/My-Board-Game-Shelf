import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const ADMIN_ERROR = 'ADMIN_ERROR';
export const adminError = error => ({
  type: ADMIN_ERROR,
  error
});

export const ADMIN_REQUEST = 'ADMIN_REQUEST';
export const adminRequest = () => ({
  type: ADMIN_REQUEST
});

export const FETCH_ADMIN_GAMES_SUCCESS = 'FETCH_ADMIN_GAMES_SUCCESS';
export const fetchAdminGamesSuccess = games => ({
  type: FETCH_ADMIN_GAMES_SUCCESS,
  games
});

export const fetchAdminGames = filters => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  let url = new URL(`${API_BASE_URL}/admin/games`);
  if (filters) {
    Object.keys(filters).forEach(key => {
      return url.searchParams.append(key, filters[key])
    });
  }

  dispatch(adminRequest());

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(games => dispatch(fetchAdminGamesSuccess(games)))
    .catch(err => {
      dispatch(adminError(err));
    });
}