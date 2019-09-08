import {
  ADMIN_ERROR, adminError,
  ADMIN_REQUEST, adminRequest,
  FETCH_ADMIN_GAMES_SUCCESS, fetchAdminGamesSuccess, fetchAdminGames
} from './admin';

describe('Admin actions', function () {
  describe('adminError', function () {
    it('should return ADMIN_ERROR', function () {
      const action = adminError();
      expect(action.type).toEqual(ADMIN_ERROR);
    });
  });

  describe('adminRequest', function () {
    it('should return ADMIN_REQUEST', function () {
      const action = adminRequest();
      expect(action.type).toEqual(ADMIN_REQUEST);
    });
  });

  describe('fetchAdminGamesSuccess', function () {
    it('should return FETCH_ADMIN_GAMES_SUCCESS', function () {
      const action = fetchAdminGamesSuccess();
      expect(action.type).toEqual(FETCH_ADMIN_GAMES_SUCCESS);
    });
  });
});