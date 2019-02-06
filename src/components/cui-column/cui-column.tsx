import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cui-column',
  styleUrl: 'cui-column.scss',
  shadow: true
})
export class CuiColumn {

  @Prop() type?: 'sm' | 'md' | 'lg' | 'xl';
  // Size should have a min-max validation later
  @Prop() size: number;

  hostData() {
    let data = { class: {} }
    data.class['col-' + this.type] = this.type;
    data.class['col-' + this.size] = this.size;
    return data;
  }

  render() {
    return <slot></slot>
  }
}
