import { createStore } from 'redux';

const SET_THEME = 'SET_THEME';

// reducers
function setTheme(state = 'default', action) {
  switch (action.type) {
    case SET_THEME:
      return state = action.theme
    default:
      return state
  }
}

const store = createStore(setTheme);

export{
  store
}
