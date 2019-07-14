import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  FETCH_TAGS_SUCCESS,
  FILTER_GAMES,
  REMOVE_GAME,
  GAMES_ERROR,
  RESET_FILTERS
} from '../actions/games';

const initialState = {
  games: [],
  tags: [],
  filters: {},
  loading: false,
  error: null
};

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
    case FETCH_TAGS_SUCCESS:
      return Object.assign({}, state, {
        tags: action.tags
      });
    case FILTER_GAMES:
      return Object.assign({}, state, {
        filters: action.filters
      });
    case REMOVE_GAME:
      return Object.assign({}, state, {
        loading: false,
        games: state.games.filter(game => game.id !== action.game.id)
      });
    case RESET_FILTERS:
      return Object.assign({}, state, {
        filters: {}
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