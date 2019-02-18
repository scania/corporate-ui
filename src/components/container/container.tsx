import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-container',
  styleUrl: 'container.scss',
  shadow: true
})
export class Container {

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
