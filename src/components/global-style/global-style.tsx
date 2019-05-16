import {
  Component,
} from '@stencil/core';

import 'bootstrap';
import 'jquery';

@Component({
  tag: 'c-global-style',
  styleUrl: 'global-style.scss',
})
export class GlobalStyle {
  render() {
    return '';
  }
}
