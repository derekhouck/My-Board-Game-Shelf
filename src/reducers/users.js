import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, USERS_ERROR } from '../actions/users';

const initialState = {
  users: [],
  loading: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        users: action.users
      });
    case USERS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    default:
      return state;
  }
}