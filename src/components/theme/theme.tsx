/* eslint-disable no-unused-vars */
import {
  Component, Prop, Element, State, Watch,
} from '@stencil/core';
/* eslint-enable no-unused-vars */

// Typescript does not support loading of resources outside of "src"
// So instead of a relative path we do this hack.
import { version } from '@stencil/../../package.json';
import { actions } from '../../store';

@Component({
  tag: 'c-theme',
  styleUrl: 'theme.scss',
})
export class Theme {
  @Prop({ context: 'store' }) ContextStore: any;

  /** Set the brand name that will set the theme styling for the page. */
  @Prop({ mutable: true }) name: string;

  /** By setting this to true bootstrap classes will be accessable globally */
  @Prop() global = false;

  @Element() el: HTMLElement;

  @State() store: any;

  @State() tagName: string;

  @State() currentTheme = { favicons: [] };

  @State() favicons: string[];

  @Watch('name')
  setName(name) {
    this.setTheme(name);

    this.store.dispatch({ type: actions.SET_THEME, name });
  }

  setTheme(name = undefined) {
    this.name = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.name];
    this.favicons = this.currentTheme ? this.currentTheme.favicons : undefined;
  }

  renderFavicon() {
    if (document.head.querySelector('link[rel=icon]')) return;

    const container = document.createElement('div');
    container.innerHTML = this.favicons.join('');

    for (let i = 0; i < container.children.length; i += 1) {
      const node = container.children[i];
      document.head.appendChild(node.cloneNode(true));
    }
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setName(this.name);

    this.store.subscribe(() => this.setTheme());

    (window as any).CorporateUi = { ...(window as any).CorporateUi, version };
    document.documentElement.setAttribute('corporate-ui-version', version);
  }

  componentDidLoad() {
    this.tagName = this.el.nodeName.toLowerCase();
  }

  render() {
    if (this.favicons && this.favicons) {
      this.renderFavicon();
    }

    return [
      this.currentTheme ? <style>{ this.currentTheme[this.tagName] }</style> : '',
      this.global ? <c-global-style></c-global-style> : '',
    ];
  }
}
