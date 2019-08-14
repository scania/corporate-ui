import {
  Component, Prop, State, Element, Watch, Listen,
} from '@stencil/core';

import { actions } from '../../store';

@Component({
  tag: 'c-navigation',
  styleUrl: 'navigation.scss',
  shadow: true,
})
export class Navigation {
  @Prop({ context: 'store' }) ContextStore: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop({ mutable: true }) theme: string;

  /** Set the orientation for the navigation (vertical or horisontal). The default is horisontal navigation. */
  @Prop() orientation = '';

  /** Item links on the left side of the navigation */
  @Prop({ mutable: true }) primaryItems: any;

  /** Item links on the right side of the navigation. On vertical orientation, it will be added in order after primary-items. */
  @Prop({ mutable: true }) secondaryItems: any;

  /** Used to show a text in front of generated items on desktop and add a describing text for navigating back in mobile mode for sub navigation */
  @Prop() caption: string;

  /** Used to dynamically connect current node to a parent item in mobile mode interaction */
  @Prop() target: string;

  /** Option to disable sticky feature */
  @Prop() sticky = true;

  @State() store: any;

  @State() navigationOpen: boolean;

  @State() navigationExpanded: string;

  @State() isSub: boolean;

  @State() tagName: string;

  @State() currentTheme: object;

  @State() parentEl: any;

  @State() navWidth: any;

  @State() navHeight = 0 ;

  @State() scrollPos = 0;

  @State() isIE: boolean;

  @Element() el: HTMLElement;

  @Watch('primaryItems')
  setPrimaryItems(items) {
    this.primaryItems = this.parse(items);
  }

  @Watch('secondaryItems')
  setSecondaryItems(items) {
    this.secondaryItems = this.parse(items);
  }

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.theme];
  }

  @Listen('window:scroll')
  handleScroll() {
    let isStick = false;
    // try catch is used to avoid error in IE with getBoundingClientRect
    if (this.sticky) {
      try {
        isStick = this.el.getBoundingClientRect().top <= 0;
      } catch (e) { console.log(e); }

      if (!this.isSub) {
        isStick ? this.el.setAttribute('stuck', 'true') : this.el.removeAttribute('stuck');
      }

      if (this.isIE) {
        if (this.el != null) {
          if ((window.pageYOffset || document.documentElement.scrollTop) <= this.scrollPos) this.el.removeAttribute('stuck');
        }
      }
    }
  }

  @Listen('window:resize')
  onResize() {
    this.navHeight = !this.isSub ? this.el.clientHeight * -1 : 0;
    this.navWidth = (document.querySelector('c-header') || {} as any).clientWidth;
  }

  toggleNavigation(open) {
    this.store.dispatch({ type: actions.TOGGLE_NAVIGATION, open });
  }

  toggleSubNavigation(expanded) {
    this.store.dispatch({ type: actions.TOGGLE_SUB_NAVIGATION, expanded });
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);
    this.setPrimaryItems(this.primaryItems);
    this.setSecondaryItems(this.secondaryItems);

    this.store.subscribe(() => {
      this.navigationOpen = this.store.getState().navigation.open;
      this.navigationExpanded = this.store.getState().navigation.expanded;

      this.setTheme();
    });
  }

  componentDidLoad() {
    // To make sure navigation is always shown from start
    this.toggleNavigation(true);

    if (!this.el) return;

    this.tagName = this.el.nodeName.toLowerCase();
    this.isSub = this.el.getAttribute('slot') === 'sub';

    this.isIE = !document.head.attachShadow;

    const items = this.el.querySelectorAll('c-navigation[target]');

    if (this.isIE) {
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

  componentDidUpdate() {
    this.navHeight = !this.isSub ? this.el.clientHeight * -1 : 0;
    // fallback of sticky on IE
    if (this.isIE) {
      setTimeout(() => {
        try {
          this.scrollPos = this.scrollPos === 0 ? this.el.getBoundingClientRect().top : this.scrollPos;
        } catch (e) { console.log(e); }
        if (this.el.querySelector('.navbar')) this.navWidth = this.el.querySelector('.navbar').clientWidth;
      }, 100);
    }
  }

  parse(items) {
    return Array.isArray(items) ? items : JSON.parse(items || '[]');
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
    if (this.isIE && window.innerWidth > 992) {
      this.el.style.width = `${this.navWidth}px`;
      this.el.style.marginBottom = `${this.navHeight}px`;
    }
    return [
      <style { ...{ innerHTML: `:host { --navHeight: ${this.navHeight}px;}` } }></style>,
      this.currentTheme ? <style id="themeStyle">{ this.currentTheme[this.tagName] }</style> : '',

      <nav class={`navbar navbar-expand-lg ${this.orientation} ${this.navigationOpen ? ' show' : ''}`}>
          <nav class='navbar-nav'>
            { this.isSub
              ? [
                this.caption ? <strong class="nav-item caption">{ this.caption }</strong> : '',
                  <a href="#close" class="nav-item nav-link toggle-sub" onClick={(event) => this.open(event)}>{ this.caption || 'Back' }</a>,
              ]
              : ''
            }

            { this.primaryItems.map((item: any) => {
              item.class = this.combineClasses(item.class);
              return <a { ...item }></a>;
            }) }

            <slot name="primary-items" />
          </nav>

          <nav class={`navbar-nav ${this.orientation !== 'vertical' ? 'ml-auto' : ''}`}>
            { this.secondaryItems.map((item: any) => {
              item.class = this.combineClasses(item.class);
              return <a { ...item }></a>;
            }) }

            <slot name="secondary-items" />
          </nav>

        <a class='navbar-symbol'></a>
      </nav>,

      <slot name="sub" />,
    ];
  }
}
