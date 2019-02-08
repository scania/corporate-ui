import { Component, Prop, State } from '@stencil/core';
import { store } from '../../store';

@Component({
  tag: 'cui-header',
  styleUrls: ['cui-header.scss','theme.scss'],
  shadow: true
})
export class CuiHeader {
  @Prop() siteName: string;
  @Prop() items: any = [];

  @State() theme: string;

  _items: object[] = [];

  hostData() {
    let hostClass = {class: {}}
    hostClass.class[this.theme] = this.theme;
    return hostClass;
  }

  componentWillLoad(){
  this._items = Array.isArray(this.items) ? this.items : JSON.parse(this.items);

  }

  componentWillUpdate() {
    this._items = Array.isArray(this.items) ? this.items : JSON.parse(this.items);
  }

  render() {
    store.subscribe(() => this.theme = store.getState())
    return (
          <nav class="navbar navbar-expand-lg navbar-default ">
            <div class="navbar-header collapse navbar-collapse">

                  <div class="mr-auto mt-2 mt-lg-0">
                    <a class="navbar-brand" href="#"></a>
                    {this.siteName} - {this.theme}
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

    );
  }
}
