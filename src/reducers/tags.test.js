import reducer from './tags';
import { tagsError } from '../actions/tags';

describe('tagsReducer', function () {
  const initialState = {
    error: null,
  };
  const error = 'sample error';

  it('should set the initial state when nothing is passed in', function () {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should return the current state on an unknown action', function () {
    const state = reducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  describe('tagsError', function () {
    it('should set error', function () {
      const state = reducer(undefined, tagsError(error));
      expect(state.error).toEqual(error);
    });
  })
})