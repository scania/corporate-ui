import { Component, Prop, State, Method, Watch } from '@stencil/core';
import { store } from '../../store';
import * as style from '../../themes.built/header';

@Component({
  tag: 'c-header',
  styleUrl: 'header.scss',
  shadow: true
})
export class Header {

  @Prop() theme: string;
  @Prop() siteName = 'Application name';
  @Prop() siteUrl = '/';
  @Prop() items: any = [{ text: 'global', location: '/' }];

  @State() currentTheme: string = this.theme;

  @Watch('items')
  updateName(items) {
    this.setItems(items);
  }

  // There should be a better way of solving this, either by "{ mutable: true }"
  // or "{ reflectToAttr: true }" or harder prop typing Array<Object>
  _items: object[] = [];

  componentWillLoad() {
    store.subscribe(() => this.currentTheme = store.getState());

    this.setItems(this.items);
  }

  @Method()
  setItems(items) {
    this._items = Array.isArray(items) ? items : JSON.parse(items);
  }

  render() {
    return [
      <style>{ style[this.currentTheme] }</style>,
      <nav class='navbar navbar-expand-lg navbar-default'>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span class='navbar-toggler-icon'></span>
        </button>

        <a href={ this.siteUrl } class='navbar-brand collapse'></a>
        <strong class='navbar-title'>{ this.siteName }</strong>

        <div class='collapse navbar-collapse'>
          <ul class='navbar-nav ml-auto'>
            { this._items.map(item =>
              <li class='nav-item'>
                <a class='nav-link' href={ item['location'] }>
                  <span>{ item['text'] }</span>
                </a>
              </li>
            ) }
          </ul>
        </div>

        <a href={ this.siteUrl } class='navbar-symbol'></a>
      </nav>
    ];
  }
}
