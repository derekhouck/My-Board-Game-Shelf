import {
  SET_AUTH_TOKEN,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR
} from '../actions/auth';

const initialState = {
  authToken: null,
  currentUser: null,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return Object.assign({}, state, {
        authToken: action.authToken
      });
    case AUTH_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.currentUser
      });
    case AUTH_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    default:
      return state;
  }
}