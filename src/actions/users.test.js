import {
  FETCH_USERS_REQUEST, fetchUsersRequest,
  FETCH_USERS_SUCCESS, fetchUsersSuccess,
  TOGGLE_DELETING, toggleDeleting,
  USERS_ERROR, usersError
} from './users';

describe('Users actions', function () {
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