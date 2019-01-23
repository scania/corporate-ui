import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Add-on you might want
import logger from 'redux-logger'; // Add-on you might want
import rootReducer from '../reducers/index';

const configureStore = (preloadedState: any) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));

export { configureStore };
