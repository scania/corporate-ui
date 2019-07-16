import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

// import Stickyfill from 'stickyfilljs';
import { actions } from '../../store';

@Component({
  tag: 'c-header',
  styleUrl: 'header.scss',
  shadow: true,
})
export class Header {
  @Prop({ context: 'store' }) ContextStore: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop({ mutable: true }) theme: string;

  /** The site name will be displayed on the right hand side of the logotype on desktop mode */
  @Prop() siteName: string;

  /** A link that will be applied to the site-name */
  @Prop() siteUrl = '/';

  /** Header links that will be placed in the top right part of the header */
  @Prop({ mutable: true }) items: any;

  /** Short name will be displayed in the top-centered of the header on mobile mode */
  @Prop() shortName: string;

  @State() store: any;

  @State() navigationOpen: Boolean;

  @State() stuckState: boolean;

  @State() tagName: string;

  @State() currentTheme: object;

  @State() height = 0;

  @Element() el: HTMLElement;

  @Watch('items')
  setItems(items) {
    this.items = Array.isArray(items) ? items : JSON.parse(items || '[]');
  }

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.theme];
  }

  toggleNavigation(open) {
    this.store.dispatch({ type: actions.TOGGLE_NAVIGATION, open });
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);
    this.setItems(this.items);

    this.store.subscribe(() => {
      this.setTheme();

      this.navigationOpen = this.store.getState().navigation.open;
      this.stuckState = this.store.getState().navigation.stuck;
    });
  }

  componentDidLoad() {
    // To make sure navigation is always hidden from start
    this.toggleNavigation(false);

    if (!this.el) return;

    this.tagName = this.el.nodeName.toLowerCase();
  }

  combineClasses(classes) {
    return [
      ...(classes || '').split(' '),
      ...['nav-item', 'nav-link'],
    ].join(' ');
  }

  hostData() {
    return {
      stuck: this.stuckState ? 'true' : 'false',
    };
  }

  render() {
    return [
      this.currentTheme ? <style id="themeStyle">{ this.currentTheme[this.tagName] }</style> : '',

      <nav class='navbar navbar-expand-lg navbar-default' short-name={this.shortName}>

        <a href={ this.siteUrl } class='navbar-brand collapse'></a>
        <strong class='navbar-title'>{ this.siteName }</strong>

        <div class='collapse navbar-collapse'>
          <nav class='navbar-nav ml-auto'>
            { this.items.map((item: any) => {
              item.class = this.combineClasses(item.class);
              return <a { ...item }></a>;
            }) }

            <slot name="items" />
          </nav>
        </div>
      </nav>,

      <a href={ this.siteUrl } class='navbar-symbol'></a>,
    ];
  }
}
