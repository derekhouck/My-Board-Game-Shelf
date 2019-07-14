import reducer from './loading';
import { startLoading, stopLoading } from '../actions/utils';

describe('loadingReducer', function () {
  const initialState = {
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

  describe('startLoading', function () {
    it('should set loading to true', function () {
      const currentState = Object.assign({}, initialState);
      expect(currentState.loading).toBe(false);
      const state = reducer(currentState, startLoading());
      expect(state.loading).toBe(true);
    });
  });

  describe('stopLoading', function () {
    it('should set loading to false', function () {
      const currentState = Object.assign({}, initialState, { loading });
      expect(currentState.loading).toBe(true);
      const state = reducer(currentState, stopLoading());
      expect(state.loading).toBe(false);
    });
  });
})