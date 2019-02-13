import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cui-container',
  styleUrl: 'cui-container.scss',
  shadow: true
})
export class CuiContainer {

  @Prop() type?: '' | 'fluid' | 'flex';

  hostData() {
    const data = { class: { } };
    data.class['container' + (this.type ? '-' + this.type : '')] = true;
    return data;
  }

  render() {
    return <slot></slot>;
  }
}
