import reducer from './auth';
import {
  setAuthToken,
  clearAuth,
  authRequest,
  authSuccess,
  authError
} from '../actions/auth';

describe('authReducer', function () {
  const initialState = {
    authToken: null,
    currentUser: null,
    loading: false,
    error: null
  };
  const authToken = 'sampleauthtoken';
  const currentUser = 'Example User';
  const error = 'Example error';
  const loading = true;

  it('should set the initial state when nothing is passed in', function () {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should return the current state on an unknown action', function () {
    const state = reducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  describe('setAuthToken', function () {
    it('should set the authToken', function () {
      const state = reducer(undefined, setAuthToken(authToken));
      expect(state.authToken).toEqual(authToken);
    });
  });

  describe('clearAuthToken', function () {
    it('should set authToken and currentUser to null', function () {
      const currentState = Object.assign({}, initialState, { authToken, currentUser });
      expect(currentState.authToken).not.toEqual(null);
      expect(currentState.currentUser).not.toEqual(null);
      const state = reducer(currentState, clearAuth());
      expect(state.authToken).toEqual(null);
      expect(state.currentUser).toEqual(null);
    });
  });

  describe('authRequest', function () {
    it('should set loading to true and error to null', function () {
      const currentState = Object.assign({}, initialState, { error });
      expect(currentState.error).not.toEqual(null);
      const state = reducer(currentState, authRequest());
      expect(state.loading).toBe(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('authSuccess', function () {
    it('should set loading to false and set currentUser', function () {
      const currentState = Object.assign({}, initialState, { loading });
      expect(currentState.loading).toBe(true);
      const state = reducer(currentState, authSuccess(currentUser));
      expect(state.loading).toBe(false);
      expect(state.currentUser).toEqual(currentUser);
    });
  });

  describe('authError', function () {
    it('should set loading to false and set error', function () {
      const currentState = Object.assign({}, initialState, { loading });
      expect(currentState.loading).toBe(true);
      const state = reducer(currentState, authError(error));
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(error);
    });
  });
});