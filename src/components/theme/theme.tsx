import {
  Component, Prop, State, Watch,
} from '@stencil/core';

import { store, actions } from '../../store';
import * as themes from '../../themes.built/c-theme';

// We use require due package file location being outside "rootDir"
// const packageFile = require('../../../../package.json');

@Component({
  tag: 'c-theme',
  styleUrl: 'theme.scss',
})
export class Theme {
  /** Set the brand name that will set the theme styling for the page. */
  @Prop() name: string = store.getState().theme.name;

  /** By setting this to true bootstrap classes will be accessable globally */
  @Prop() global = false;

  @State() currentTheme: any;

  @Watch('name')
  setTheme(name) {
    this.currentTheme = name;
    store.dispatch({ type: actions.SET_THEME, name });
  }

  componentWillLoad() {
    this.setTheme(this.name);

    // document.documentElement.setAttribute('corporate-ui-version', packageFile.version);
  }

  render() {
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',
      this.global ? <c-global-style></c-global-style> : '',
    ];
  }
}
