import { createStore, combineReducers } from 'redux';

export const actions = {
  SET_THEME: 'SET_THEME',
  TOGGLE_NAVIGATION: 'TOGGLE_NAVIGATION',
};

function theme(state = { name: '' }, action) {
  switch (action.type) {
    case actions.SET_THEME:
      return { ...state, name: action.name };
    default:
      return state;
  }
}

function navigation(state = { open: false }, action) {
  switch (action.type) {
    case actions.TOGGLE_NAVIGATION:
      return { ...state, open: action.open };
    default:
      return state;
  }
}

const reducers = combineReducers({
  theme,
  navigation,
});

export const store = createStore(reducers);
