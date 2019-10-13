import { TAGS_ERROR } from "../actions/tags";

const initialState = {
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TAGS_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });
    default:
      return state;
  }
}