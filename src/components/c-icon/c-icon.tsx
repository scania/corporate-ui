import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-icon',
  styleUrl: 'c-icon.scss',
  shadow: true
})
export class cIcon {
  @Prop() name: string;

  render() {
    return (
      <i class={ 'fa fa-' + this.name }></i>
    );
  }
}
