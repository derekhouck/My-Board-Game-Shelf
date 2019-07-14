import reducer from './games';
import {
  fetchGamesRequest,
  fetchGamesSuccess,
  fetchTagsSuccess,
  filterGames,
  removeGame,
  resetFilters,
  gamesError
} from '../actions/games';

describe('gamesReducer', function () {
  const initialState = {
    games: [],
    tags: [],
    filters: {},
    loading: false,
    error: null
  };
  const error = 'Example error';
  const loading = true;
  const games = [
    { title: 'game one', id: 1 },
    { title: 'game two', id: 2 }
  ];
  const tags = ['tag one', 'tag two'];
  const filters = { example: 'filter' };

  it('should set the initial state when nothing is passed in', function () {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should return the current state on an unknown action', function () {
    const state = reducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  describe('fetchGamesRequest', function () {
    it('should set loading to true and error to null', function () {
      const currentState = Object.assign({}, initialState, { error })
      expect(currentState.loading).toBe(false);
      expect(currentState.error).not.toEqual(null);
      const state = reducer(currentState, fetchGamesRequest());
      expect(state.loading).toBe(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('fetchGamesSuccess', function () {
    it('should set loading to false and set games', function () {
      const currentState = Object.assign({}, initialState, { loading });
      expect(currentState.loading).toBe(true);
      const state = reducer(currentState, fetchGamesSuccess(games));
      expect(state.loading).toBe(false);
      expect(state.games).toEqual(games);
    })
  });

  describe('fetchTagsSuccess', function () {
    it('should set tags', function () {
      const currentState = Object.assign({}, initialState);
      expect(currentState.tags).toEqual([]);
      const state = reducer(currentState, fetchTagsSuccess(tags));
      expect(state.tags).toEqual(tags);
    });
  });

  describe('filterGames', function () {
    it('should set filters', function () {
      const state = reducer(initialState, filterGames(filters));
      expect(state.filters).toEqual(filters);
    });
  });

  describe('removeGame', function () {
    it('should set loading to false and remove the game from games', function () {
      const game = { title: 'game two', id: 2 };
      const currentState = Object.assign({}, initialState, { loading, games });
      expect(currentState.loading).toBe(true);
      expect(currentState.games).toContainEqual(game);
      expect(currentState.games.length).toEqual(games.length);
      const state = reducer(currentState, removeGame(game));
      expect(state.loading).toBe(false);
      expect(state.games).not.toContainEqual(game);
      expect(state.games.length).toEqual(games.length - 1);
    });
  });

  describe('resetFilters', function () {
    it('should empty filters', function () {
      const currentState = Object.assign({}, initialState, { filters });
      expect(currentState.filters).not.toEqual({});
      const state = reducer(currentState, resetFilters());
      expect(state.filters).toEqual({});
    });
  });

  describe('gamesError', function () {
    it('should set loading to false and set error', function () {
      const currentState = Object.assign({}, initialState, { loading });
      expect(currentState.loading).toBe(true);
      expect(currentState.error).toBe(null);
      const state = reducer(currentState, gamesError(error));
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });
});