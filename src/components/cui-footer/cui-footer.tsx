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
    const hostClass = { class: { } };
    hostClass.class[this.currentTheme] = this.currentTheme;
    return hostClass;
  }

  render() {
    store.subscribe(() => this.currentTheme = store.getState());
    return [
      <style>{ style[this.currentTheme] }</style>,
      <footer data-test-id='cui-footer'>
        <div class='container-fluid'>
          <span data-test-id='cui-footer-logo' class='wordmark' />
          <p data-test-id='cui-footer-copyright'>Copyright &copy; Scania 2019</p>
        </div>
      </footer>
    ];
  }
}
