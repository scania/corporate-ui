import { Component, Prop, State, Watch, Method } from '@stencil/core';
import {  store } from '../../store';
import * as style from './style.js'

@Component({
  tag: 'cui-theme',
  styleUrls: ['cui-theme.scss']
})
export class CuiTheme {
  @Prop() name: string;
  @State() globalStyle : any;

  @Watch('name')
  updateName(newValue: string){
    this.appSetTheme(newValue)
    store.dispatch({ type:'SET_THEME', theme:newValue })
  }

  componentWillLoad() {
    this.globalStyle = style[this.name];
    store.dispatch({ type:'SET_THEME', theme:'scania' })
  }

  @Method()
  appSetTheme(name){
    this.globalStyle = style[name];
  }

  render(){
    return <style>{this.globalStyle}</style>
  }
}
