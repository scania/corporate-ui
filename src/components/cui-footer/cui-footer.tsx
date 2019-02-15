import { Component, Prop, State, Watch } from '@stencil/core';
import { store } from '../../store';
import * as style from '../../themes.built/cui-footer';

@Component({
  tag: 'cui-footer',
  styleUrls: ['cui-footer.scss'],
  shadow: true
})
export class CuiFooter {

  @Prop() theme: string;

  @State() currentTheme: string = this.theme;

  @Watch('theme')
  updateName(name) {
    this.currentTheme = name;
  }

  componentWillLoad() {
    store.subscribe(() => this.currentTheme = store.getState());
  }

  render() {
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
