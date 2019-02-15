import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-list',
  styleUrl: 'c-list.scss',
  shadow: true
})
export class cList {
  @Prop() items: any = [];

  _items: object[] = [];

  componentWillLoad() {
    this._items = Array.isArray(this.items) ? this.items : JSON.parse(this.items);
  }

  componentWillUpdate() {
    this._items = Array.isArray(this.items) ? this.items : JSON.parse(this.items);
  }

  render() {
    return (
      <ul>
        { this._items.map((item) =>
          <li>
            <span>{ item['text']}</span>
          </li>
        ) }
      </ul>
    );
  }
}
