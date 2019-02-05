import {
  AUTH_ERROR
} from '../actions/auth';

export default function reducer(state, action) {
  switch (action.type) {
    case AUTH_ERROR:
      return state;
    default:
      return state;
  }
}