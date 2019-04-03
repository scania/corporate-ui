import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-list',
  styleUrl: 'list.scss',
  shadow: true,
})
export class List {
  @Prop() items: any = [];

  _items: object[] = [];

  componentWillLoad() {
    this._items = Array.isArray(this.items)
      ? this.items
      : JSON.parse(this.items);
  }

  componentWillUpdate() {
    this._items = Array.isArray(this.items)
      ? this.items
      : JSON.parse(this.items);
  }

  render() {
    return (
      <ul>
        {this._items.map((item: any) => (
          <li>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    );
  }
}
