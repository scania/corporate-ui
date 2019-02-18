import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-icon',
  styleUrl: 'icon.scss',
  shadow: true
})
export class Icon {
  @Prop() name: string;

  render() {
    return (
      <i class={ 'fa fa-' + this.name }></i>
    );
  }
}
