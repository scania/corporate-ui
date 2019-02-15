import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-navigation',
  styleUrl: 'c-navigation.scss',
  shadow: true
})
export class CuiNavigation {
  @Prop() router: Boolean;
  @Prop() primaryItems: any = [];

  _primaryItems: object[] = [];

  componentWillLoad() {
    this._primaryItems = Array.isArray(this.primaryItems) ? this.primaryItems : JSON.parse(this.primaryItems);
  }

  componentWillUpdate() {
    this._primaryItems = Array.isArray(this.primaryItems) ? this.primaryItems : JSON.parse(this.primaryItems);
  }

  render() {
    if (this.router) {
      return (
        <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link>
      );
    } else {
      return (
        <nav class='navbar navbar-expand-lg navbar-light bg-light'>
          <div class='collapse navbar-collapse'>
            <ul class='navbar-nav mr-auto'>

              {this._primaryItems.map((item) =>
                <li class='nav-item'>
                  <a class='nav-link' href={ item['location'] }>
                    <span>{ item['text'] }</span>
                  </a>
                </li>
              )}

            </ul>
          </div>
        </nav>
      );
    }
  }
}
