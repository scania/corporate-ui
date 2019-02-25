import { Component, Prop, State, Watch } from '@stencil/core';

import { store } from '../../store';
import * as style from '../../themes.built/navigation';

@Component({
  tag: 'c-navigation',
  styleUrl: 'navigation.scss',
  shadow: true
})
export class Navigation {
  @Prop() theme: string;
  @Prop() primaryItems: any = [];
  @Prop() secondaryItems: any = [];
  @Prop() show: boolean;

  @State() currentTheme: string = this.theme;
  @State() _primaryItems: object[] = [];
  @State() _secondaryItems: object[] = [];

  @Watch('primaryItems')
  @Watch('secondaryItems')
  setItems(items, type) {
    this['_' + type] = Array.isArray(items) ? items : JSON.parse(items);
  }

  @Watch('theme')
  updateTheme(name) {
    this.currentTheme = name;
  }

  componentWillLoad() {
    store.subscribe(() => this.currentTheme = store.getState());

    this.setItems(this.primaryItems, 'primaryItems');
    this.setItems(this.secondaryItems, 'secondaryItems');
  }

  render() {
    return [
      <style>{ style[this.currentTheme] }</style>,

      <nav class='navbar navbar-expand-lg'>
        <div class={'collapse navbar-collapse' + (this.show ? ' show' : '')}>
          <ul class='navbar-nav'>
            {this._primaryItems.map((item, key) =>
              <li class='nav-item'>
                <slot name={'nav-item-' + key}>
                  <a href={item['location']} class='nav-link'>
                    <span>{item['text']}</span>
                  </a>
                </slot>
              </li>
            )}
          </ul>
        </div>

        <div class={'collapse navbar-collapse' + (this.show ? ' show' : '')}>
          <ul class='navbar-nav ml-auto'>
            {this._secondaryItems.map((item, key) =>
              <li class='nav-item'>
                <slot name={'nav-item-' + key}>
                  <a href={item['location']} class='nav-link'>
                    <span>{item['text']}</span>
                  </a>
                </slot>
              </li>
            )}
          </ul>
        </div>
      </nav>
    ];
  }
}
