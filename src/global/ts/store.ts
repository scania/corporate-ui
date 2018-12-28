
import { createStore, combineReducers } from 'redux';
import * as watch from 'redux-watch'
import reducerRegistry from './reducerRegistry';

const initialState = {}
const reducer = combine(reducerRegistry.getReducers());
const store = createStore(counter, initialState);

// Adding register reducer method to the global store object
store.register = reducerRegistry.register.bind(reducerRegistry)
store.watch = watch

export {
  store,
  init as storeInit
}

function init() {
  // Replace the store's reducer whenever a new reducer is registered.
  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combine(reducers));
  });

  /*store.subscribe(() => {
    console.log(store.getState())
  });*/
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
    }
}

// Preserve initial state for not-yet-loaded reducers
function combine(reducers) {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return combineReducers(reducers);
};