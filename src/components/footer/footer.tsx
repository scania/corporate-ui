import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

import { store } from '../../store';

@Component({
  tag: 'c-footer',
  styleUrl: 'footer.scss',
  shadow: true,
})
export class Footer {
  /** Per default, this will inherit the value from c-theme name property */
  @Prop() theme: string;

  /** Change default copyright text */
  @Prop() text = 'Copyright © Scania 2019';

  /** Set footer links */
  @Prop() items: any;

  /** Add social media icons */
  @Prop() socialMediaItems: any;

  @State() currentTheme: string;

  @State() show = false;

  // There should be a better way of solving this, either by "{ mutable: true }"
  // or "{ reflectToAttr: true }" or harder prop typing Array<Object>
  @State() _items: object[] = [];

  @State() itemsSlot = [];

  @State() _socialMediaItems: object[] = [];

  @Element() el: HTMLElement;

  @Watch('items')
  @Watch('socialMediaItems')
  setItems(items, type) {
    this[type] = Array.isArray(items) ? items : JSON.parse(items || '[]');
  }

  @Watch('theme')
  setTheme(name) {
    name = name || store.getState().theme.name;
    this.currentTheme = store.getState().themes[name];
  }

  componentWillLoad() {
    store.subscribe(() => this.setTheme(this.theme));

    this.setTheme(this.theme);
    this.setItems(this.items, '_items');
    this.setItems(this.socialMediaItems, '_socialMediaItems');
  }

  componentDidLoad() {
    const elem = this.el.shadowRoot.querySelector('slot[name=items');

    if (elem) {
      elem.addEventListener('slotchange', e => this.getSlotItems(e.target));
      this.getSlotItems(elem);
    }
  }

  getSlotItems(node) {
    this.itemsSlot = node.assignedNodes() || node.children;
  }

  combineClasses(classes) {
    return [
      ...(classes || '').split(' '),
      ...['nav-item', 'nav-link'],
    ].join(' ');
  }

  render() {
    const type = document.head.attachShadow ? 'default' : 'ie';

    return [
      this.currentTheme && this.currentTheme['c-footer'] ? <style>{ this.currentTheme['c-footer'][type] }</style> : '',

      <nav class='navbar navbar-expand-lg navbar-default'>

        <div class="navbar-top">
          <strong class='navbar-brand'></strong>

          <nav class='navbar-nav social-media-items'>
            { this._socialMediaItems.map(item => (
              <c-social-media { ...item }></c-social-media>
            )) }

            <slot name="social-media-items" />
          </nav>
        </div>

        <div class="dropup">
          <div class={`collapse navbar-collapse${this.show ? ' show' : ''}`}>
            <nav class='navbar-nav'>
              { this._items.map((item: any) => {
                item.class = this.combineClasses(item.class);
                return <a { ...item }></a>;
              }) }

              <slot name="items" />
            </nav>
          </div>

          {this._items.length || this.itemsSlot.length
            ? <button
              class='navbar-toggler collapsed btn btn-link dropdown-toggle'
              type='button'
              onClick={() => this.show = !this.show }>
              Scania
            </button>
            : ''}
        </div>

        <p>
          {this.text}
          <slot name="text" />
        </p>
      </nav>,
    ];
  }
}
