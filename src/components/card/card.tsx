import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

@Component({
  tag: 'c-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class Card {
  @Prop({ context: 'store' }) store: any;

  @Prop() theme: string;

  @State() tagName: string;

  @State() style: string;

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme() {
    const name = this.theme || this.store.getState().theme.name;
    const currentTheme = this.store.getState().themes[name];

    this.style = currentTheme ? currentTheme[this.tagName] : '';
  }

  hostData() {
    return {
      class: { card: true },
    };
  }

  componentWillLoad() {
    this.tagName = this.el.tagName.toLowerCase();

    this.setTheme();

    this.store.subscribe(() => this.setTheme());
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
    return [
      this.style ? <style>{ this.style }</style> : '',

      <slot name='card-header' { ... { class: 'card-header' } } />,
      <slot name='card-body' { ... { class: 'card-body' } } />,
      <slot name='card-footer' { ... { class: 'card-footer' } } />,
    ];
  }
}
