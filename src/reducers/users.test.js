import reducer from './users';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  toggleDeleting,
  usersError
} from '../actions/users';

describe('usersReducer', function () {
  const initialState = {
    users: [],
    loading: false,
    deleting: false,
    error: null
  };
  const error = 'Test error';
  const loading = true;
  const users = ['user one', 'user two'];

  describe('fetchUsersRequest', function () {
    it('should set loading to true and error to null', function () {
      const currentState = Object.assign({}, initialState, { error });
      expect(currentState.loading).toBe(false);
      expect(currentState.error).toBe(error);
      const state = reducer(currentState, fetchUsersRequest());
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });
  });

  describe('fetchUsersSuccess', function () {
    it('should set loading to false and set users', function () {
      const currentState = Object.assign({}, initialState, { loading });
      expect(currentState.loading).toBe(true);
      expect(currentState.users).toEqual([]);
      const state = reducer(currentState, fetchUsersSuccess(users));
      expect(state.loading).toBe(false);
      expect(state.users).toEqual(users);
    });
  });

  describe('toggleDeleting', function () {
    it('should toggle deleting', function () {
      expect(initialState.deleting).toBe(false);
      const state = reducer(initialState, toggleDeleting());
      expect(state.deleting).toBe(true);
    });
  });

  describe('usersError', function () {
    it('should set loading to false and set error', function () {
      const currentState = Object.assign({}, initialState, { loading });
      expect(currentState.loading).toBe(true);
      expect(currentState.error).toBe(null);
      const state = reducer(currentState, usersError(error));
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });
});