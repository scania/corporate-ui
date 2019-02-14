import { Component } from '@stencil/core';

@Component({
  tag: 'cui-row',
  styleUrl: 'cui-row.scss',
  shadow: true
})
export class CuiRow {

  hostData() {
    return {
      class: { row: true }
    };
  }

  render() {
    return <slot></slot>;
  }
}
