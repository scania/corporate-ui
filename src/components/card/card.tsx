import { Component, Prop, State, Element, Watch } from '@stencil/core';

import { store } from '../../global';
import * as themes from '../../tmp/c-card';

@Component({
  tag: 'c-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card {
  @Prop() theme: string;

  @State() currentTheme: string = this.theme || store.getState().theme.name;

  @Element() el: HTMLElement;

  @Watch('theme')
  updateTheme(name) {
    this.currentTheme = name;
  }

  hostData() {
    return {
      class: { card: true }
    };
  }

  componentWillLoad() {
    store.subscribe(() => this.currentTheme = store.getState().theme.name);
  }

  componentDidLoad() {
    const slots = this.el.shadowRoot.querySelectorAll('slot');

    slots.forEach(elem => {
      this.toggleHide(elem);

      elem.addEventListener('slotchange', e => this.toggleHide(e.target) );
    });
  }

  toggleHide(node) {
    const nodes = node.assignedNodes().length || node.children.length;
    node.style.display = nodes ? '' : 'none';
  }

  render() {
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

      <slot name='card-header' { ... { class: 'card-header' } } />,
      <slot name='card-body' { ... { class: 'card-body' } } />,
      <slot name='card-footer' { ... { class: 'card-footer' } } />
    ];
  }
}
