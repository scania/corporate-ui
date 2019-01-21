import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cui-icon',
  styleUrl: 'component.scss',
  shadow: true
})
export class CuiIcon {
  @Prop() name: string;

  render() {
    return [
      <i class={"fa fa-"+this.name}></i>
    ];
  }
}
