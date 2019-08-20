import { createStore, combineReducers } from 'redux';

export const actions = {
  SET_THEME: 'SET_THEME',
  ADD_THEME: 'ADD_THEME',
  TOGGLE_NAVIGATION: 'TOGGLE_NAVIGATION',
  TOGGLE_SUB_NAVIGATION: 'TOGGLE_SUB_NAVIGATION',
  ADD_ICONS: 'ADD_ICONS',
  REMOVE_ICONS: 'REMOVE_ICONS',
};

export const store = createStore(reducers());

// TODO: theme and themes should be merged and be restructure
// Something like: theme: { items: {}, current: '' }
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

function icon(state = { items: {} }, action) {
  switch (action.type) {
    case actions.ADD_ICONS:
      return { ...state, items: { ...state.items, ...action.items } };
    case actions.REMOVE_ICONS:
      return { ...state, items: { } };
    default:
      return state;
  }
}

function reducers() {
  return combineReducers({
    theme,
    themes,
    navigation,
    icon,
  });
}
