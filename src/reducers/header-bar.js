import { TOGGLE_NAV_LIST } from '../actions/header-bar';

const initialState = {
  expanded: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAV_LIST:
      return Object.assign({}, state, {
        expanded: !state.expanded
      });
    default:
      return state;
  }
}