import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cui-header',
  // assetsDir: '../../themes/scania/cui-header.css',
  styleUrl: 'cui-header.scss',
  shadow: true
})
export class CuiHeader {
  @Prop() siteName: string = 'Application name';
  @Prop() items: any = [{text:'global', location:'/'}];

  // There should be a better way of solving this, either by "{ mutable: true }"
  // or "{ reflectToAttr: true }" or harder prop typing Array<Object>
  _items: object[] = [];

  componentWillLoad() {
    this._items = Array.isArray(this.items) ? this.items : JSON.parse(this.items);
  }

  componentWillUpdate() {
    this._items = Array.isArray(this.items) ? this.items : JSON.parse(this.items);
  }

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-default">
        <div class="navbar-header collapse navbar-collapse">
          <div class="mr-auto mt-2 mt-lg-0">
            <a class="navbar-brand" href="#" />
            {this.siteName}
          </div>

          <ul class="navbar-nav my-2 my-lg-0">
            {this._items.map(item => (
              <li class="nav-item">
                <a class="nav-link" href={item['location']}>
                  <span>{item['text']}</span>
                </a>
              </li>
            ))}
          </ul>

          <a class="navbar-symbol" href="#" />
        </div>
      </nav>
    );
  }
}
