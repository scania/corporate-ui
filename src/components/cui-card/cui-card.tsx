import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'cui-card',
  styleUrl: 'cui-card.scss',
  shadow: true
})
export class CuiCard {

  @Prop() headline: string;

  hostData() {
    return {
      class: { 'card': true }
    };
  }

  bodyClass:any = {class:"card-body"};
  footerClass:any = {class:"card-footer"};

  render() {
    return [
      <div class="card-header">{this.headline}</div>,
      <slot name="card-body" {...this.bodyClass}></slot>,
      <slot name="card-footer" {...this.footerClass}></slot>
    ]
  }
}
