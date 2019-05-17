import {
  Component, Prop, State, Watch,
} from '@stencil/core';

import { store } from '../../store';

@Component({
  tag: 'c-social-media',
  styleUrl: 'social-media.scss',
  shadow: true,
})
export class SocialMedia {
  @Prop() theme: string;

  @Prop() icon: string;

  @Prop() href: string;

  @Prop() target: string;

  attrs = {};

  @State() currentTheme: string = this.theme || store.getState().theme.name;

  @Watch('theme')
  setTheme(name) {
    name = name || store.getState().theme.name;
    this.currentTheme = store.getState().themes[name];
  }

  componentWillLoad() {
    store.subscribe(() => this.setTheme(this.theme));

    this.setTheme(this.theme);
  }

  render() {
    const type = document.head.attachShadow ? 'default' : 'ie';

    this.attrs = {
      href: this.href,
      target: this.target,
    };

    return [
      this.currentTheme && this.currentTheme['c-social-media'] ? <style>{ this.currentTheme['c-social-media'][type] }</style> : '',

      <a { ...this.attrs }>
        <c-icon name={ this.icon }></c-icon>
      </a>,
    ];
  }
}
