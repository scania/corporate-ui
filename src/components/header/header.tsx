import { Component, Prop, State, Element, Watch } from '@stencil/core';

import { store, actions } from '../../store';
import * as themes from '../../themes.built/c-header';

@Component({
  tag: 'c-header',
  styleUrl: 'header.scss',
  shadow: true
})
export class Header {
  @Prop() theme: string;
  @Prop() siteName: string;
  @Prop() siteUrl = '/';
  @Prop() items: any;

  @State() currentTheme: string = this.theme || store.getState().theme.name;
  @State() navigationOpen = store.getState().navigation.open;
  // There should be a better way of solving this, either by "{ mutable: true }"
  // or "{ reflectToAttr: true }" or harder prop typing Array<Object>
  @State() _items: object[] = [];
  @State() navigationSlot = [];

  @Element() el: HTMLElement;

  @Watch('items')
  setItems(items) {
    this._items = Array.isArray(items) ? items : JSON.parse(items || '[]');
  }

  @Watch('theme')
  updateTheme(name) {
    this.currentTheme = name;
  }

  toggleNavigation(open) {
    store.dispatch({ type: actions.TOGGLE_NAVIGATION, open });
  }

  componentWillLoad() {
    store.subscribe(() => {
      this.currentTheme = store.getState().theme.name
      this.navigationOpen = store.getState().navigation.open;
    });

    this.setItems(this.items);
  }

  componentDidLoad() {
    const elem = this.el.shadowRoot.querySelector('slot[name=navigation');
    elem.addEventListener('slotchange', e => this.getNavSlotItems(e.target) );

    this.getNavSlotItems(elem);
  }

  getNavSlotItems(node) {
    this.navigationSlot = node.assignedNodes() || node.children;
  }

  combineClasses(classes) {
    return [
      ...(classes || '').split(' '),
      ...['nav-item', 'nav-link']
    ].join(' ');
  }

  render() {
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

      <nav class='navbar navbar-expand-lg navbar-default'>
        {this.navigationSlot.length ?
          <button
            class='navbar-toggler collapsed'
            type='button'
            onClick={() => this.toggleNavigation(!this.navigationOpen) }>
            <span class='navbar-toggler-icon'></span>
          </button>
        : ''}

        <a href={ this.siteUrl } class='navbar-brand collapse'></a>
        <strong class='navbar-title'>{ this.siteName }</strong>

        <div class='collapse navbar-collapse'>
          <nav class='navbar-nav ml-auto'>
            { this._items.map(item => {
              item['class'] = this.combineClasses(item['class']);
              return <a { ...item }></a>
            }) }

            <slot name="items" />
          </nav>
        </div>
      </nav>,

      <a href={ this.siteUrl } class='navbar-symbol'></a>,

      <slot name="navigation" />
    ];
  }
}
