import {
 Component, Prop, State, Element, Watch,
} from '@stencil/core';

import { store } from '../../store';
import * as themes from '../../themes.built/c-footer';

@Component({
  tag: 'c-footer',
  styleUrl: 'footer.scss',
  shadow: true,
})
export class Footer {
  /** Per default, this will inherit the value from c-theme name property */
  @Prop() theme: string;

  /** Change default copyright text */
  @Prop() text = 'Copyright &copy; Scania 2019';

  /** Set footer links */
  @Prop() items: any;

  /** Add social media icons */
  @Prop() socialMediaItems: any;

  @State() currentTheme: string = this.theme || store.getState().theme.name;

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
  updateTheme(name) {
    this.currentTheme = name;
  }

  componentWillLoad() {
    store.subscribe(() => this.currentTheme = store.getState().theme.name);

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
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

      <nav class='navbar navbar-expand-lg navbar-default' data-test-id='c-footer'>

        <div class="navbar-top">
          <strong class='navbar-brand' data-test-id='c-footer-logo'></strong>

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
              { this._items.map(item => {
                item['class'] = this.combineClasses(item['class']);
                return <a { ...item }></a>
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

        <p data-test-id='c-footer-copyright'>
          {this.text}
          <slot name="text" />
        </p>
      </nav>,
    ];
  }
}
