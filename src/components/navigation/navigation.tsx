import {
  Component, Prop, State, Watch,
} from '@stencil/core';

import { store, actions } from '../../store';
import * as themes from '../../themes.built/c-navigation';

@Component({
  tag: 'c-navigation',
  styleUrl: 'navigation.scss',
  shadow: true,
})
export class Navigation {
  /** Per default, this will inherit the value from c-theme name property */
  @Prop() theme: string;

  /** Set the orientation for the navigation (vertical or horisontal). The default is horisontal navigation. */
  @Prop() orientation: string = '';

  /** Item links on the left side of the navigation */
  @Prop() primaryItems: any;

  /** Item links on the right side of the navigation. On vertical orientation, it will be added in order after primary-items. */
  @Prop() secondaryItems: any;

  @State() navigationOpen: boolean = store.getState().navigation.open;

  @State() currentTheme: string = this.theme || store.getState().theme.name;

  @State() _primaryItems: object[] = [];

  @State() _secondaryItems: object[] = [];

  @Watch('primaryItems')
  @Watch('secondaryItems')
  setItems(items, type) {
    this[`_${type}`] = Array.isArray(items) ? items : JSON.parse(items || '[]');
  }

  @Watch('theme')
  updateTheme(name) {
    this.currentTheme = name;
  }

  toggleNavigation(open) {
    store.dispatch({ type: actions.TOGGLE_NAVIGATION, open });
  }

  componentWillLoad() {
    store.subscribe(() => {
      this.currentTheme = store.getState().theme.name;
      this.navigationOpen = store.getState().navigation.open;
    });

    this.setItems(this.primaryItems, 'primaryItems');
    this.setItems(this.secondaryItems, 'secondaryItems');
  }

  componentDidLoad() {
    // To make sure navigation is always show from start
    this.toggleNavigation(true);
  }

  combineClasses(classes) {
    return [
      ...(classes || '').split(' '),
      ...['nav-item', 'nav-link'],
    ].join(' ');
  }

  render() {
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

      <nav class={`navbar navbar-expand-lg ${this.orientation}`}>
        <div class={`collapse navbar-collapse${this.navigationOpen ? ' show' : ''}`}>
          <nav class='navbar-nav'>
            { this._primaryItems.map((item: any) => {
              item.class = this.combineClasses(item.class);
              return <a { ...item }></a>;
            }) }

            <slot name="primary-items" />
          </nav>
        </div>

        <div class={`collapse navbar-collapse${this.navigationOpen ? ' show' : ''}`}>
          <nav class='navbar-nav ml-auto'>
            { this._secondaryItems.map((item: any) => {
              item.class = this.combineClasses(item.class);
              return <a { ...item }></a>;
            }) }

            <slot name="secondary-items" />
          </nav>
        </div>
      </nav>,

      <slot name="sub" />
    ];
  }
}
