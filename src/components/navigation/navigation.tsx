import { Component, Prop, State, Watch } from '@stencil/core';

import { store } from '../../global';
import * as themes from '../../tmp/c-navigation';

@Component({
  tag: 'c-navigation',
  styleUrl: 'navigation.scss',
  shadow: true
})
export class Navigation {
  @Prop() theme: string;
  @Prop() primaryItems: any = [];
  @Prop() secondaryItems: any = [];

  @State() navigationOpen: boolean;
  @State() currentTheme: string = this.theme || store.getState().theme.name;
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
    store.subscribe(() => {
      this.currentTheme = store.getState().theme.name;
      this.navigationOpen = store.getState().navigation.open;
    });

    this.setItems(this.primaryItems, 'primaryItems');
    this.setItems(this.secondaryItems, 'secondaryItems');
  }

  combineClasses(classes) {
    return [
      ...(classes || '').split(' '),
      ...['nav-item', 'nav-link']
    ].join(' ');
  }

  render() {
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

      <nav class='navbar navbar-expand-lg'>
        <div class={'collapse navbar-collapse' + (this.navigationOpen ? ' show' : '')}>
          <nav class='navbar-nav'>
            { this._primaryItems.map(item => {
              item['class'] = this.combineClasses(item['class']);
              return <a { ...item }></a>
            }) }

            <slot name="primary-items" />
          </nav>
        </div>

        <div class={'collapse navbar-collapse' + (this.navigationOpen ? ' show' : '')}>
          <nav class='navbar-nav ml-auto'>
            { this._secondaryItems.map(item => {
              item['class'] = this.combineClasses(item['class']);
              return <a { ...item }></a>
            }) }

            <slot name="secondary-items" />
          </nav>
        </div>
      </nav>
    ];
  }
}
