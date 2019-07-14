import {
  START_LOADING, startLoading,
  STOP_LOADING, stopLoading
} from './utils';

describe('Utils actions', function () {
  describe('startLoading', function () {
    it('should return START_LOADING', function () {
      const action = startLoading();
      expect(action.type).toEqual(START_LOADING);
    });
  });

  describe('stopLoading', function () {
    it('should return STOP_LOADING', function () {
      const action = stopLoading();
      expect(action.type).toEqual(STOP_LOADING);
    });
  });
});