import { Component, State } from '@stencil/core';
import { store } from '../../store';
import * as style from './style';

@Component({
  tag: 'cui-footer',
  styleUrls: ['cui-footer.scss'],
  shadow: true
})
export class CuiFooter {
  @State() currentTheme: string;

  hostData() {
    let hostClass = {class: {}}
    hostClass.class[this.currentTheme] = this.currentTheme;
    return hostClass;
  }

  render() {
    store.subscribe(() => this.currentTheme = store.getState())
    return [
      <style>{style[this.currentTheme]}</style>,
      <footer>
        <div class="container-fluid">
          <span class="wordmark"></span>
          <p>
            Copyright &copy; Scania 2019
          </p>
        </div>
      </footer>
    ];
  }
}
