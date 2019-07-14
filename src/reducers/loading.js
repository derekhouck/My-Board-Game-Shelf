import { START_LOADING, STOP_LOADING } from '../actions/utils';

const initialState = {
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return Object.assign({}, state, {
        loading: true,
      });
    case STOP_LOADING:
      return Object.assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}