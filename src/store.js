import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as burgerMenu } from 'redux-burger-menu';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';
import gamesReducer from './reducers/games';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import { RESET_FILTERS } from './actions/games'

const store = createStore(
  combineReducers({
    form: formReducer.plugin({
      'games-search-form': (state, action) => {
        switch(action.type) {
          case RESET_FILTERS:
            return undefined;
          default:
            return state;
        }
      }
    }),
    users: usersReducer,
    auth: authReducer,
    games: gamesReducer,
    burgerMenu
  }), 
  applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;