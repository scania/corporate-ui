import { createStore, combineReducers } from 'redux';

export const actions = {
  SET_THEME: 'SET_THEME',
  ADD_THEME: 'ADD_THEME',
  TOGGLE_NAVIGATION: 'TOGGLE_NAVIGATION',
  TOGGLE_SUB_NAVIGATION: 'TOGGLE_SUB_NAVIGATION',
};

function theme(state = { name: '' }, action) {
  switch (action.type) {
    case actions.SET_THEME:
      return { ...state, name: action.name };
    default:
      return state;
  }
}

function themes(state = { }, action) {
  switch (action.type) {
    case actions.ADD_THEME:
      return { ...state, ...action.theme };
    default:
      return state;
  }
}

function navigation(state = { open: true, expanded: '' }, action) {
  switch (action.type) {
    case actions.TOGGLE_NAVIGATION:
      return { ...state, open: action.open };
    case actions.TOGGLE_SUB_NAVIGATION:
      return { ...state, expanded: action.expanded };
    default:
      return state;
  }
}

const reducers = combineReducers({
  theme,
  themes,
  navigation,
});

export const store = createStore(reducers);
