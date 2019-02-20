import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-navigation',
  styleUrl: 'navigation.scss',
  shadow: true
})
export class Navigation {
  @Prop() primaryItems: any = [];

  _primaryItems: object[] = [];

  componentWillLoad() {
    this._primaryItems = Array.isArray(this.primaryItems)
      ? this.primaryItems
      : JSON.parse(this.primaryItems);
  }

  componentWillUpdate() {
    this._primaryItems = Array.isArray(this.primaryItems)
      ? this.primaryItems
      : JSON.parse(this.primaryItems);
  }

  render() {
    return (
      <nav class='navbar navbar-expand-lg navbar-light bg-light'>
        <div class='collapse navbar-collapse'>
          <ul class='navbar-nav mr-auto'>
            {this._primaryItems.map((item, key) =>
              <li class='nav-item'>
                <slot name={'nav-item-' + key}>
                  <a class='nav-link' href={item['location']}>
                    <span>{item['text']}</span>
                  </a>
                </slot>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
