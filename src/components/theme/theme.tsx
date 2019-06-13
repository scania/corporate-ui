/* eslint-disable no-unused-vars */
import {
  Component, Prop, Element, State, Watch,
} from '@stencil/core';
/* eslint-enable no-unused-vars */

// Typescript does not support loading of resources outside of "src"
// So instead of a relative path we do this hack.
import { version } from 'scania-theme/../../package.json';
import { actions } from '../../store';

@Component({
  tag: 'c-theme',
  styleUrl: 'theme.scss',
})
export class Theme {
  @Prop({ context: 'store' }) store: any;

  /** Set the brand name that will set the theme styling for the page. */
  @Prop() name: string;

  /** By setting this to true bootstrap classes will be accessable globally */
  @Prop() global = false;

  @Element() el: HTMLElement;

  @State() tagName: string;

  @State() style: string;

  @State() favicons: string[];

  @Watch('name')
  setTheme() {
    const store = this.store;
    const name = this.name || store.getState().theme.name;
    const themes = store.getState().themes;
    const currentTheme = themes[name] || {};

    this.style = currentTheme[this.tagName];
    this.favicons = currentTheme.favicons;

    store.dispatch({ type: actions.SET_THEME, name });
  }

  renderFavicon() {
    const container = document.createElement('div');
    container.innerHTML = this.favicons.join('');

    for (let i = 0; i < container.children.length; i += 1) {
      const node = container.children[i];
      document.head.appendChild(node.cloneNode(true));
    }
  }

  componentWillLoad() {
    this.tagName = this.el.tagName.toLowerCase();

    this.setTheme();

    document.documentElement.setAttribute('corporate-ui-version', version);
  }

  render() {
    if (this.favicons && this.favicons) {
      this.renderFavicon();
    }

    return [
      this.style ? <style>{ this.style }</style> : '',
      this.global ? <c-global-style></c-global-style> : '',
    ];
  }
}
