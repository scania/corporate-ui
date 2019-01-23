import {
  AppSetNameAction
} from './setTheme';

export interface NullAction {
  type: TypeKeys.NULL
}

// Keep this type updated with each known action
export type ActionTypes =
  | NullAction

  | AppSetNameAction
;

export enum TypeKeys {
  // Won't match anything
  NULL = 'NULL',

  ERROR = 'ERROR',

  APP_SET_NAME = 'APP_SET_NAME'
};
