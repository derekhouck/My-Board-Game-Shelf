import {
  SET_AUTH_TOKEN, setAuthToken,
  CLEAR_AUTH, clearAuth,
  AUTH_REQUEST, authRequest,
  AUTH_SUCCESS, authSuccess,
  AUTH_ERROR, authError
} from './auth';

describe('Auth actions', function () {
  describe('setAuthToken', function () {
    it('should return SET_AUTH_TOKEN', function () {
      const authToken = 'sampleauthtoken';
      const action = setAuthToken(authToken);
      expect(action.type).toEqual(SET_AUTH_TOKEN);
      expect(action.authToken).toEqual(authToken);
    })
  });

  describe('clearAuth', function () {
    it('should return CLEAR_AUTH', function () {
      const action = clearAuth();
      expect(action.type).toEqual(CLEAR_AUTH);
    });
  });

  describe('authRequest', function () {
    it('should return AUTH_REQUEST', function () {
      const action = authRequest();
      expect(action.type).toEqual(AUTH_REQUEST);
    });
  });

  describe('authSuccess', function () {
    it('should return AUTH_SUCCESS', function () {
      const currentUser = 'exampleuser';
      const action = authSuccess(currentUser);
      expect(action.type).toEqual(AUTH_SUCCESS);
      expect(action.currentUser).toEqual(currentUser);
    });
  });

  describe('authError', function () {
    it('should return AUTH_ERROR', function () {
      const error = 'Example error';
      const action = authError(error);
      expect(action.type).toEqual(AUTH_ERROR);
      expect(action.error).toEqual(error);
    });
  })
});