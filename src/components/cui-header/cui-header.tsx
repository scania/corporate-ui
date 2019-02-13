import { Component, Prop, State, Method, Watch } from '@stencil/core';
import { store } from '../../store';
import * as style from '../../themes.built/cui-header';

@Component({
  tag: 'cui-header',
  styleUrls: ['cui-header.scss'],
  shadow: true
})
export class CuiHeader {

  @Prop() theme: string;
  @Prop() siteName: string = 'Application name';
  @Prop() items: any = [{text:'global', location:'/'}];

  @State() currentTheme: string = this.theme;

  @Watch('items')
  updateName(items) {
    this.setItems(items);
  }

  // There should be a better way of solving this, either by "{ mutable: true }"
  // or "{ reflectToAttr: true }" or harder prop typing Array<Object>
  _items: object[] = [];

  componentWillLoad() {
    store.subscribe(() => this.currentTheme = store.getState())

    this.setItems(this.items);
  }

  @Method()
  setItems(items) {
    this._items = Array.isArray(items) ? items : JSON.parse(items);
  }

  render() {
    return [
      <style>{style[this.currentTheme]}</style>,
      <nav class="navbar navbar-expand-lg navbar-default ">
        <div class="navbar-header collapse navbar-collapse">

          <div class="mr-auto mt-2 mt-lg-0">
            <a class="navbar-brand" href="#"></a>
            {this.siteName} - {this.currentTheme}
          </div>

          <ul class="navbar-nav my-2 my-lg-0">

            {this._items.map((item) =>
              <li class="nav-item">
                <a class="nav-link" href={item['location']}>
                  <span>{item['text']}</span>
                </a>
              </li>
            )}

          </ul>

          <a class="navbar-symbol" href="#"></a>
        </div>
      </nav>
    ];
  }
}
