import {
  Component, Prop, State, Watch,
} from '@stencil/core';

import { theme as scaniaTheme } from 'scania-theme';
// Typescript does not support loading of resources outside of "src"
// So instead of a relative path we do this hack.
import * as packageFile from 'scania-theme/../../package.json';
import { store, actions } from '../../store';

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
    store.dispatch({ type: actions.SET_THEME, name });
    this.currentTheme = store.getState().themes[name];
  }

  addTheme(theme) {
    // this.currentTheme = name;
    store.dispatch({ type: actions.ADD_THEME, theme });
  }

  componentWillLoad() {
    this.addTheme({ scania: scaniaTheme });
    this.setTheme(this.name);

    document.documentElement.setAttribute('corporate-ui-version', packageFile.version);
  }

  render() {
    const type = document.head.attachShadow ? 'default' : 'ie';

    return [
      this.currentTheme && this.currentTheme['c-theme'] ? <style>{ this.currentTheme['c-theme'][type] }</style> : '',
      this.global ? <c-global-style></c-global-style> : '',
    ];
  }
}
