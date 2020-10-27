import {
  Component, h, Prop, State, Element, Watch,
} from '@stencil/core';
import store from '../../store_new';

@Component({
  tag: 'c-global-style',
  styleUrl: 'global-style.scss',
})
export class GlobalStyle {
  /** Per default, this will inherit the value from c-theme name property */
  @Prop({ mutable: true }) theme: string;

  @State() store: any;

  @State() tagName: string;

  @State() currentTheme = { components: [] };

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.state.theme.current;
    this.currentTheme = this.store.state.theme.items[this.theme];
  }

  async loadLibs() {
    const jquery = await import('jquery');
    window['CorporateUi'].$ = jquery.default;
    await import('bootstrap');

    const event = new CustomEvent('bsReady', { detail: { jquery: jquery.default } });
    document.dispatchEvent(event);
  }

  componentWillLoad() {
    this.loadLibs();

    this.store = store;

    this.setTheme(this.theme);

    if (!(this.el && this.el.nodeName)) return;

    this.tagName = this.el.nodeName.toLowerCase();
  }

  render() {
    return this.currentTheme ? <style>{ this.currentTheme.components[this.tagName] }</style> : '';
  }
}
