import { tagsError, TAGS_ERROR } from "./tags";

describe('Tags actions', function () {
  describe('tagsError', function () {
    it('should return TAGS_ERROR', function () {
      const error = 'sample error';
      const action = tagsError(error);
      expect(action.type).toEqual(TAGS_ERROR);
      expect(action.error).toEqual(error);
    });
  });
});