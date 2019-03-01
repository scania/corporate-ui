import { Component, Prop, State, Watch } from '@stencil/core';

import { store } from '../../global.js';
import * as themes from '../../../tmp/theme.js';

@Component({
  tag: 'c-theme',
  styleUrl: 'theme.scss'
})
export class Theme {
  @Prop() name: string = store.getState().theme;

  @State() currentTheme: any;

  @Watch('name')
  setTheme(name) {
    this.currentTheme = name;
    store.dispatch({ type: 'SET_THEME', theme: name });
  }

  componentWillLoad() {
    this.setTheme(this.name);
  }

  render() {
    return this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '';
  }
}
