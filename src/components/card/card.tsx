import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

@Component({
  tag: 'c-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class Card {
  @Prop({ context: 'store' }) ContextStore: any;

  @Prop({ mutable: true }) theme: string;

  @State() store: any;

  @State() tagName: string;

  @State() currentTheme: object;

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.theme];
  }

  hostData() {
    return {
      class: { card: true },
    };
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);

    this.store.subscribe(() => this.setTheme());
  }

  componentDidLoad() {
    this.tagName = this.el.nodeName.toLowerCase();

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
      this.currentTheme ? <style>{ this.currentTheme[this.tagName] }</style> : '',

      <slot name='card-header' { ... { class: 'card-header' } } />,
      <slot name='card-body' { ... { class: 'card-body' } } />,
      <slot name='card-footer' { ... { class: 'card-footer' } } />,
    ];
  }
}
