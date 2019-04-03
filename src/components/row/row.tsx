import { Component } from '@stencil/core';

@Component({
  tag: 'c-row',
  styleUrl: 'row.scss',
  shadow: true,
})
export class Row {
  hostData() {
    return {
      class: { row: true },
    };
  }

  render() {
    return <slot />;
  }
}
