import { TypeKeys } from '../actions/index';

export interface AppSetThemeAction {
  type: TypeKeys.APP_SET_THEME,
  theme: string;
}

export const appSetTheme = (theme: string) => async (dispatch, _getState) => {
  return dispatch({
    type: TypeKeys.APP_SET_THEME,
    theme: theme
  })
};
