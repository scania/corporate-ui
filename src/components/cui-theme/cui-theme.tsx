import { Component, Prop, State, Method, Watch } from '@stencil/core';
import {  store } from '../../store';
import * as style from '../../themes.built/cui-theme';

@Component({
  tag: 'c-theme',
  styleUrls: ['c-theme.scss']
})
export class CuiTheme {

  @Prop() name: string;

  @State() globalStyle: any;

  @Watch('name')
  updateName(name) {
    this.appSetTheme(name);
  }

  componentWillLoad() {
    this.appSetTheme(this.name);
  }

  @Method()
  appSetTheme(name) {
    this.globalStyle = style[name];
    store.dispatch({ type: 'SET_THEME', theme: name });
  }

  render() {
    return <style>{ this.globalStyle }</style>;
  }
}
