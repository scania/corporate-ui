import { SET_THEME } from '../actions';

const initialState= 'default';

export default function themeReducer(state=initialState,action){
  switch (action.type){
    case SET_THEME:
      return Object.assign({}, state, {
        theme: action.theme
      })
    default:
      return state
  }
};
