import { Component } from '@stencil/core';
import Tunnel from '../data/theme';

@Component({
  tag: 'cui-footer',
  styleUrl: 'cui-footer.scss',
  shadow: true
})
export class CuiFooter {
  render() {
    return (
      <Tunnel.Consumer>
      {({ theme }) => (
        <footer>
          <div class="container-fluid">
            <span class="wordmark"></span>
            <p>
              Copyright &copy; Scania 2019
            </p>
          </div>
          <style>
            @import url({'../../themes/' + theme + '/cui-footer.css'});
          </style>
        </footer>
      )}
      </Tunnel.Consumer>
    );
  }
}
