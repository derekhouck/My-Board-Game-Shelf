import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';

export default createStore(
  combineReducers({
    form: formReducer,
    users: usersReducer,
    auth: authReducer
  }), 
  applyMiddleware(thunk)
);