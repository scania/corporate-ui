import { createStore } from 'redux';

const SET_THEME = 'SET_THEME';
const initialState = { theme: '' }

function setTheme(state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}

const store = createStore(setTheme);

export { store };
