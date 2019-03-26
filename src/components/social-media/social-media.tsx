import { Component, Prop, State, Watch } from '@stencil/core';

import { store } from '../../global';
import * as themes from '../../tmp/c-social-media';

@Component({
  tag: 'c-social-media',
  styleUrl: 'social-media.scss',
  shadow: true
})
export class SocialMedia {
  @Prop() theme: string;
  @Prop() icon: string;
  @Prop() href: string;

  @State() currentTheme: string = this.theme || store.getState().theme.name;

  @Watch('theme')
  updateTheme(name) {
    this.currentTheme = name;
  }

  componentWillLoad() {
    store.subscribe(() => {
      this.currentTheme = store.getState().theme.name
    });
  }

  render() {
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

      <a href={this.href}>
        <c-icon name={ this.icon }></c-icon>
      </a>
    ];
  }
}
