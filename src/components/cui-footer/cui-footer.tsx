import { Component } from '@stencil/core';

@Component({
  tag: 'cui-footer',
  styleUrls: ['cui-footer.scss'],
  shadow: true
})
export class CuiFooter {
  render() {
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
