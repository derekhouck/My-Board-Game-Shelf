import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './reducers/users';

export default createStore(usersReducer, applyMiddleware(thunk));