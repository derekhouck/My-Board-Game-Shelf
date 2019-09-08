import {
  ADMIN_ERROR,
  ADMIN_REQUEST,
  FETCH_ADMIN_GAMES_SUCCESS
} from '../actions/admin';

const initialState = {
  error: null,
  games: [],
  loading: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    case ADMIN_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case FETCH_ADMIN_GAMES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        games: action.games,
      });
    default:
      return state;
  }
};