import { 
  FETCH_GAMES_REQUEST, 
  FETCH_GAMES_SUCCESS, 
  REMOVE_GAME,
  GAMES_ERROR } from '../actions/games';

const initialState = {
  games: [],
  loading: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GAMES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case FETCH_GAMES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        games: action.games
      });
      case REMOVE_GAME:
      return Object.assign({}, state, {
        loading: false,
        games: state.games.filter(game => game.id !== action.game.id)
      });
    case GAMES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    default:
      return state;
  }
}