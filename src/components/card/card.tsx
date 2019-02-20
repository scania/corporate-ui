import { Component, Element } from '@stencil/core';

@Component({
  tag: 'c-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card {
  @Element() el: HTMLElement;

  hostData() {
    return {
      class: { card: true }
    };
  }

  componentDidLoad() {
    const slots = this.el.shadowRoot.querySelectorAll('slot');

    slots.forEach(elem => {
      this.toggleHide(elem);

      elem.addEventListener('slotchange', e => {
        this.toggleHide(e.target);
      });
    });
  }

  toggleHide = node => {
    const nodes = node.assignedNodes().length || node.children.length;
    node.style.display = nodes ? '' : 'none';
  };

  render() {
    return [
      <slot name='card-header' {...{ class: 'card-header' }} />,
      <slot name='card-body' {...{ class: 'card-body' }} />,
      <slot name='card-footer' {...{ class: 'card-footer' }} />
    ];
  }
}
