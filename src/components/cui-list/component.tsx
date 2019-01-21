import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cui-list',
  styleUrl: 'component.css',
  shadow: true
})
export class CuiList {
  @Prop() items: any = [];

  render() {
    let items = Array.isArray(this.items) ? this.items : JSON.parse(this.items);

    return (
      <ul>
        {items.map((item) =>
          <li>
            <span>{item.text}</span>
          </li>
        )}
      </ul>
    )
  }
}
