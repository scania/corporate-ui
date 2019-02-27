import { Component, Prop, State, Watch } from '@stencil/core';
import { store } from '../../store';
import * as style from '../../themes.built/theme';

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
    return <style>{style[this.currentTheme]}</style>;
  }
}
