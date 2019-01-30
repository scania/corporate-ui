import { TypeKeys, ActionTypes } from '../actions/index';

interface AppState {
  theme: string;
}

const getInitialState = () => {
  return {
    theme: 'default'
  }
};

const app = (state: AppState = getInitialState(), action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.APP_SET_THEME: {
      return { ...state, theme: action.theme }
    }
  }

  return state;
};

export default app;
