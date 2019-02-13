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
    store.subscribe(() => this.currentTheme = store.getState())
  }

  render() {
    return [
      <style>{style[this.currentTheme]}</style>,
      <footer>
        <div class="container-fluid">
          <span class="wordmark" />
          <p>Copyright &copy; Scania 2019</p>
        </div>
      </footer>
    ];
  }
}
