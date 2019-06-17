import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

@Component({
  tag: 'c-social-media',
  styleUrl: 'social-media.scss',
  shadow: true,
})
export class SocialMedia {
  @Prop({ context: 'store' }) store: any;

  @Prop({ mutable: true }) theme: string;

  @Prop() icon: string;

  @Prop() href: string;

  @Prop() target: string;

  @State() tagName: string;

  @State() currentTheme: object;

  @State() attrs = {};

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme(name) {
    this.theme = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.theme] || {};
  }

  componentWillLoad() {
    this.setTheme(this.theme);

    this.store.subscribe(() => this.setTheme(this.theme));
  }

  componentDidLoad() {
    this.tagName = this.el.nodeName.toLowerCase();
  }

  render() {
    this.attrs = {
      href: this.href,
      target: this.target,
    };

    return [
      this.currentTheme ? <style>{ this.currentTheme[this.tagName] }</style> : '',

      <a { ...this.attrs }>
        <c-icon name={ this.icon }></c-icon>
      </a>,
    ];
  }
}
