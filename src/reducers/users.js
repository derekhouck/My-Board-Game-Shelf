import {
  FETCH_USER_GAMES_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  REMOVE_GAME,
  TOGGLE_DELETING,
  USERS_ERROR
} from '../actions/users';

const initialState = {
  games: [],
  users: [],
  loading: false,
  deleting: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_GAMES_SUCCESS:
      return Object.assign({}, state, {
        games: action.games
      });
    case FETCH_USERS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        users: action.users
      });
    case REMOVE_GAME:
      return Object.assign({}, state, {
        games: state.games.filter(game => game.id !== action.game.id)
      });
    case TOGGLE_DELETING:
      return Object.assign({}, state, {
        deleting: !state.deleting
      });
    case USERS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    default:
      return state;
  }
}