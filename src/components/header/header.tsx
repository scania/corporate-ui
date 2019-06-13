import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

import { actions } from '../../store';

@Component({
  tag: 'c-header',
  styleUrl: 'header.scss',
  shadow: true,
})
export class Header {
  @Prop({ context: 'store' }) store: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop() theme: string;

  /** The site name will be displayed on the right hand side of the logotype on desktop mode */
  @Prop() siteName: string;

  /** A link that will be applied to the site-name */
  @Prop() siteUrl = '/';

  /** Header links that will be placed in the top right part of the header */
  @Prop() items: any;

  @State() tagName: string;

  @State() navigationOpen: Boolean;

  // There should be a better way of solving this, either by "{ mutable: true }"
  // or "{ reflectToAttr: true }" or harder prop typing Array<Object>
  @State() _items: object[] = [];

  @State() navigationSlot = [];

  @State() style: string;

  @Element() el: HTMLElement;

  @Watch('items')
  setItems() {
    this._items = Array.isArray(this.items) ? this.items : JSON.parse(this.items || '[]');
  }

  @Watch('theme')
  setTheme() {
    const name = this.theme || this.store.getState().theme.name;
    const currentTheme = this.store.getState().themes[name];

    this.style = currentTheme ? currentTheme[this.tagName] : '';
  }

  toggleNavigation(open) {
    this.store.dispatch({ type: actions.TOGGLE_NAVIGATION, open });
  }

  componentWillLoad() {
    this.tagName = this.el.tagName.toLowerCase();

    this.setTheme();
    this.setItems();

    this.store.subscribe(() => {
      this.setTheme();

      this.navigationOpen = this.store.getState().navigation.open;
    });
  }

  componentDidLoad() {
    const elem = document.head.attachShadow ? this.el.shadowRoot.querySelector('slot[name=navigation') : this.el.querySelector('c-navigation');

    if (elem) {
      elem.addEventListener('slotchange', e => this.getNavSlotItems(e.target));
      this.getNavSlotItems(elem);
    }

    // To make sure navigation is always hidden from start
    this.toggleNavigation(false);
  }

  getNavSlotItems(node) {
    // node.children is not supported in IE
    this.navigationSlot = document.head.attachShadow ? node.assignedNodes() || node.children : node.childNodes;
  }

  combineClasses(classes) {
    return [
      ...(classes || '').split(' '),
      ...['nav-item', 'nav-link'],
    ].join(' ');
  }

  render() {
    return [
      this.style ? <style>{ this.style }</style> : '',

      <nav class='navbar navbar-expand-lg navbar-default'>
        {this.navigationSlot.length
          ? <button
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
            { this._items.map((item: any) => {
              item.class = this.combineClasses(item.class);
              return <a { ...item }></a>;
            }) }

            <slot name="items" />
          </nav>
        </div>
      </nav>,

      <a href={ this.siteUrl } class='navbar-symbol'></a>,

      <slot name="navigation" />,
    ];
  }
}
