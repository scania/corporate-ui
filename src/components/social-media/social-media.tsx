import {
  Component, Prop, State, Watch,
} from '@stencil/core';

import { store } from '../../store';
import * as themes from '../../themes.built/c-social-media';

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
  updateTheme(name) {
    this.currentTheme = name;
  }

  componentWillLoad() {
    store.subscribe(() => {
      this.currentTheme = store.getState().theme.name;
    });
  }

  render() {
    this.attrs = {
      href: this.href,
      target: this.target,
    };
    if (!document.head.attachShadow) {
      this.currentTheme += '_ie';
    }
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

      <a { ...this.attrs }>
        <c-icon name={ this.icon }></c-icon>
      </a>,
    ];
  }
}
