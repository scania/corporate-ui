import { Component, Element } from '@stencil/core';

@Component({
  tag: 'cui-card',
  styleUrl: 'cui-card.scss',
  shadow: true
})
export class CuiCard {

  @Element() el: HTMLElement;

  hostData() {
    return {
      class: { 'card': true }
    };
  }

  componentDidLoad() {
    let slots = this.el.shadowRoot.querySelectorAll('slot');

    for (let i = 0; i < slots.length; i++) {
      let slot = slots[i];
      this.toggleHide(slot)

      slot.addEventListener('slotchange', (e) => {
        this.toggleHide(e.target)
      });
    }
  }

  toggleHide = (node) => {
    let nodes = node.assignedNodes().length || node.children.length;
    node.style.display = nodes ? '' : 'none';
  }

  render() {
    return [
      <slot name="card-header" {... { class: "card-header" } } />,
      <slot name="card-body" {... { class: "card-body" } } />,
      <slot name="card-footer" {... { class: "card-footer" } } />
    ]
  }
}
