import reducer from './admin';
import {
  adminError,
  adminRequest,
  fetchAdminGamesSuccess
} from '../actions/admin';

describe('adminReducer', function () {
  const error = 'Example error';
  const games = [
    { title: 'game one', id: 1 },
    { title: 'game two', id: 2 }
  ];
  const initialState = {
    error: null,
    games: [],
    loading: false,
  };
  const loading = true;

  it('should set the initial state when nothing is passed in', function () {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should return the current state on an unknown action', function () {
    const state = reducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  describe('adminError', function () {
    it('should set loading to false and set error', function () {
      const currentState = Object.assign({}, initialState, { loading });
      expect(currentState.loading).toBe(true);
      expect(currentState.error).toBe(null);
      const state = reducer(currentState, adminError(error));
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('adminRequest', function () {
    it('should set loading to true and error to null', function () {
      const currentState = Object.assign({}, initialState, { error })
      expect(currentState.loading).toBe(false);
      expect(currentState.error).not.toEqual(null);
      const state = reducer(currentState, adminRequest());
      expect(state.loading).toBe(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('fetchAdminGamesSuccess', function () {
    it('should set loading to false and set games', function () {
      const currentState = Object.assign({}, initialState, { loading });
      expect(currentState.loading).toBe(true);
      const state = reducer(currentState, fetchAdminGamesSuccess(games));
      expect(state.loading).toBe(false);
      expect(state.games).toEqual(games);
    })
  });
});