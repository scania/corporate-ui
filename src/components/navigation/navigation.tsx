import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

import { store, actions } from '../../store';

@Component({
  tag: 'c-navigation',
  styleUrl: 'navigation.scss',
  shadow: true,
})
export class Navigation {
  /** Per default, this will inherit the value from c-theme name property */
  @Prop() theme: string;

  /** Set the orientation for the navigation (vertical or horisontal). The default is horisontal navigation. */
  @Prop() orientation: string = '';

  /** Item links on the left side of the navigation */
  @Prop() primaryItems: any;

  /** Item links on the right side of the navigation. On vertical orientation, it will be added in order after primary-items. */
  @Prop() secondaryItems: any;

  /** Used to show a text in front of generated items on desktop and add a describing text for navigating back in mobile mode for sub navigation */
  @Prop() caption: string;

  /** Used to dynamically connect current node to a parent item in mobile mode interaction */
  @Prop() target: string;

  @State() isSub: boolean;

  @State() navigationOpen: boolean = store.getState().navigation.open;

  @State() navigationExpanded: string = store.getState().navigation.expanded;

  @State() currentTheme: string;

  @State() _primaryItems: object[] = [];

  @State() _secondaryItems: object[] = [];

  @State() parentEl: any;

  @Element() el: HTMLElement;

  @Watch('primaryItems')
  @Watch('secondaryItems')
  setItems(items, type) {
    this[`_${type}`] = Array.isArray(items) ? items : JSON.parse(items || '[]');
  }

  @Watch('theme')
  setTheme(name) {
    name = name || store.getState().theme.name;
    this.currentTheme = store.getState().themes[name];
  }

  toggleNavigation(open) {
    store.dispatch({ type: actions.TOGGLE_NAVIGATION, open });
  }

  toggleSubNavigation(expanded) {
    store.dispatch({ type: actions.TOGGLE_SUB_NAVIGATION, expanded });
  }

  componentWillLoad() {
    store.subscribe(() => {
      this.setTheme(this.theme);
      this.navigationOpen = store.getState().navigation.open;
      this.navigationExpanded = store.getState().navigation.expanded;
    });

    this.setTheme(this.theme);
    this.setItems(this.primaryItems, 'primaryItems');
    this.setItems(this.secondaryItems, 'secondaryItems');
  }

  componentDidLoad() {
    // To make sure navigation is always show from start
    this.toggleNavigation(true);

    this.isSub = this.el.getAttribute('slot') === 'sub';

    const items = this.el.querySelectorAll('c-navigation[target]');

    if (!document.head.attachShadow) {
      [this.parentEl] = Array.from(this.el.children).filter(e => e.matches('nav'));
    } else {
      this.parentEl = this.el;
    }

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      const target = item.getAttribute('target');
      const node: HTMLAnchorElement = this.parentEl.querySelector(`a[href="${target}"]`);
      node.classList.add('parent');
      node.onclick = (event) => this.open(event);
    }
  }

  combineClasses(classes) {
    return [
      ...(classes || '').split(' '),
      ...['nav-item', 'nav-link'],
    ].join(' ');
  }

  open(event) {
    const target = event.target.getAttribute('href');
    const node = this.el.querySelector(`c-navigation[target="${target}"]`);

    if (window.innerWidth > 992) {
      return;
    }

    if (node) {
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
      this.toggleSubNavigation(target);
    }

    if (target === '#close') {
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
      this.toggleSubNavigation('');
    }
  }

  hostData() {
    return {
      open: this.target === this.navigationExpanded || (!this.isSub && this.navigationExpanded) ? 'true' : 'false',
    };
  }

  render() {
    const name = document.head.attachShadow ? 'c-navigation' : 'c-navigation_ie';

    return [
      this.currentTheme ? <style>{ this.currentTheme[name] }</style> : '',

      <nav class={`navbar navbar-expand-lg ${this.orientation}`}>
        <div class={`collapse navbar-collapse${this.navigationOpen ? ' show' : ''}`}>
          <nav class='navbar-nav'>
            { this.isSub
              ? [
                this.caption ? <strong class="nav-item caption">{ this.caption }</strong> : '',
                  <a href="#close" class="nav-item nav-link toggle-sub" onClick={(event) => this.open(event)}>{ this.caption || 'Back' }</a>,
              ]
              : ''
            }

            { this._primaryItems.map((item: any) => {
              item.class = this.combineClasses(item.class);
              return <a { ...item }></a>;
            }) }

            <slot name="primary-items" />
          </nav>
        </div>

        <div class={`collapse navbar-collapse${this.navigationOpen ? ' show' : ''}`}>
          <nav class='navbar-nav ml-auto'>
            { this._secondaryItems.map((item: any) => {
              item.class = this.combineClasses(item.class);
              return <a { ...item }></a>;
            }) }

            <slot name="secondary-items" />
          </nav>
        </div>
      </nav>,

      <slot name="sub" />,
    ];
  }
}
