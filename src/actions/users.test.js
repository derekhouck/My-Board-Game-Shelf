import {
  FETCH_USER_GAMES_SUCCESS, fetchUserGamesSuccess,
  FETCH_USERS_REQUEST, fetchUsersRequest,
  FETCH_USERS_SUCCESS, fetchUsersSuccess,
  REMOVE_USER_GAME, removeUserGame,
  TOGGLE_DELETING, toggleDeleting,
  USERS_ERROR, usersError
} from './users';

describe('Users actions', function () {
  describe('fetchUserGamesSuccess', function () {
    it('should return FETCH_USER_GAMES_SUCCESS', function () {
      const action = fetchUserGamesSuccess();
      expect(action.type).toEqual(FETCH_USER_GAMES_SUCCESS);
    });
  });

  describe('fetchUsersRequest', function () {
    it('should return FETCH_USERS_REQUEST', function () {
      const action = fetchUsersRequest();
      expect(action.type).toEqual(FETCH_USERS_REQUEST);
    });
  });

  describe('fetchUsersSuccess', function () {
    it('should return FETCH_USERS_SUCCESS', function () {
      const users = ['user one', 'user two'];
      const action = fetchUsersSuccess(users);
      expect(action.type).toEqual(FETCH_USERS_SUCCESS);
      expect(action.users).toEqual(users);
    });
  });

  describe('removeUserGame', function () {
    it('should return REMOVE_USER_GAME', function () {
      const game = 'sample game';
      const action = removeUserGame(game);
      expect(action.type).toEqual(REMOVE_USER_GAME);
      expect(action.game).toEqual(game);
    });
  });

  describe('toggleDeleting', function () {
    it('should return TOGGLE_DELETING', function () {
      const action = toggleDeleting();
      expect(action.type).toEqual(TOGGLE_DELETING);
    });
  });

  describe('usersError', function () {
    it('should return USERS_ERROR', function () {
      const error = 'sample error';
      const action = usersError(error);
      expect(action.type).toEqual(USERS_ERROR);
      expect(action.error).toEqual(error);
    });
  });
});