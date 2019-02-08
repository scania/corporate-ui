import { Component, State } from '@stencil/core';
import { store } from '../../store';

@Component({
  tag: 'cui-footer',
  styleUrls: ['cui-footer.scss','theme.scss'],
  shadow: true
})
export class CuiFooter {
  @State() theme: string;

  hostData() {
    let hostClass = {class: {}}
    hostClass.class[this.theme] = this.theme;
    return hostClass;
  }

  render() {
    store.subscribe(() => this.theme = store.getState())
    return (
        <footer>
          <div class="container-fluid">
            <span class="wordmark"></span>
            <p>
              Copyright &copy; Scania 2019
            </p>
          </div>
        </footer>
    );
  }
}
