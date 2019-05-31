import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

import { store } from '../../store';

@Component({
  tag: 'c-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class Card {
  @Prop() theme: string;

  @State() currentTheme: string = this.theme || store.getState().theme.name;

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme(name) {
    name = name || store.getState().theme.name;
    this.currentTheme = store.getState().themes[name];
  }

  hostData() {
    return {
      class: { card: true },
    };
  }

  componentWillLoad() {
    store.subscribe(() => this.setTheme(this.theme));

    this.setTheme(this.theme);
  }

  componentDidLoad() {
    const slots = this.el.shadowRoot.querySelectorAll('slot');

    slots.forEach(elem => {
      this.toggleHide(elem);

      elem.addEventListener('slotchange', e => this.toggleHide(e.target));
    });
  }

  toggleHide(node) {
    const nodes = node.assignedNodes().length || node.children.length;
    node.style.display = nodes ? '' : 'none';
  }

  render() {
    const name = document.head.attachShadow ? 'c-card' : 'c-card_ie';

    return [
      this.currentTheme ? <style>{ this.currentTheme[name] }</style> : '',

      <slot name='card-header' { ... { class: 'card-header' } } />,
      <slot name='card-body' { ... { class: 'card-body' } } />,
      <slot name='card-footer' { ... { class: 'card-footer' } } />,
    ];
  }
}
