import { Component, Prop, State, Watch } from '@stencil/core';

import { store, actions } from '../../store';
import * as themes from '../../themes.built/c-theme';

@Component({
  tag: 'c-theme',
  styleUrl: 'theme.scss'
})
export class Theme {
  @Prop() name: string = store.getState().theme.name;

  @State() currentTheme: any;

  @Watch('name')
  setTheme(name) {
    this.currentTheme = name;
    store.dispatch({ type: actions.SET_THEME, name });
  }

  componentWillLoad() {
    this.setTheme(this.name);
  }

  render() {
    return this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '';
  }
}
