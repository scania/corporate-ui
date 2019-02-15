import { Component } from '@stencil/core';

@Component({
  tag: 'c-row',
  styleUrl: 'c-row.scss',
  shadow: true
})
export class cRow {

  hostData() {
    return {
      class: { row: true }
    };
  }

  render() {
    return <slot></slot>;
  }
}
