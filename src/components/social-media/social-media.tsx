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

  @Prop() theme: string;

  @Prop() icon: string;

  @Prop() href: string;

  @Prop() target: string;

  @State() tagName: string;

  @State() style: string;

  @State() attrs = {};

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme() {
    const name = this.theme || this.store.getState().theme.name;
    const currentTheme = this.store.getState().themes[name];

    this.style = currentTheme ? currentTheme[this.tagName] : '';
  }

  componentWillLoad() {
    this.tagName = this.el.tagName.toLowerCase();

    this.setTheme();

    this.store.subscribe(() => this.setTheme());
  }

  render() {
    this.attrs = {
      href: this.href,
      target: this.target,
    };

    return [
      this.style ? <style>{ this.style }</style> : '',

      <a { ...this.attrs }>
        <c-icon name={ this.icon }></c-icon>
      </a>,
    ];
  }
}
