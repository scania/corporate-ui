import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cui-list',
  styleUrl: 'cui-list.scss',
  shadow: true
})
export class CuiList {
  @Prop() items: any = [];
  @Prop() headline: string = 'List';

  _items: object[] = [];

  componentWillLoad() {
    this._items = Array.isArray(this.items) ? this.items : JSON.parse(this.items);
  }

  componentWillUpdate() {
    this._items = Array.isArray(this.items) ? this.items : JSON.parse(this.items);
  }

  render() {
    return [
      <h3>
        <cui-icon name="angle-right"></cui-icon>
        {this.headline}
      </h3>,
      <ul>
        { this._items.map((item) =>
          <li>
            <span>{ item['text']}</span>
          </li>
        ) }
      </ul>
    ]
  }
}
