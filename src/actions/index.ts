import {
  AppSetThemeAction
} from './setTheme';

// Keep this type updated with each known action
export type ActionTypes =
  | AppSetThemeAction
;

export enum TypeKeys {
  APP_SET_THEME = 'APP_SET_THEME'
};
