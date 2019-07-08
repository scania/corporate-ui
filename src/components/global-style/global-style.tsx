import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

@Component({
  tag: 'c-global-style',
  styleUrl: 'global-style.scss',
})
export class GlobalStyle {
  @Prop({ context: 'store' }) ContextStore: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop({ mutable: true }) theme: string;

  @State() store: any;

  @State() tagName: string;

  @State() currentTheme: object;

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.theme];
  }

  async loadLibs() {
    await import('jquery');
    await import('bootstrap');
  }

  componentWillLoad() {
    this.loadLibs();

    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);

    this.store.subscribe(() => this.setTheme());
  }

  componentDidLoad() {
    this.tagName = this.el.nodeName.toLowerCase();
  }

  render() {
    return this.currentTheme ? <style>{ this.currentTheme[this.tagName] }</style> : '';
  }
}
