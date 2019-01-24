import { Component } from '@stencil/core';

@Component({
  tag: 'cui-footer',
  styleUrl: 'component.scss',
  shadow: true
})
export class CuiFooter {
  render() {
    return (
      <footer>
        <div class="container-fluid">
          <span class="wordmark" />
          <p>Copyright &copy; Scania 2019</p>
        </div>
      </footer>
    );
  }
}
