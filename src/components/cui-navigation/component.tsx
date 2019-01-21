import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cui-navigation',
  styleUrl: 'component.scss',
  shadow: true
})
export class CuiNavigation {
  @Prop() router: Boolean;
  @Prop() primaryItems: any = [];

  render() {
    let primaryItems = Array.isArray(this.primaryItems) ? this.primaryItems : JSON.parse(this.primaryItems);

    if(this.router) {
      return (
        <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link>
      );
    } else {
      return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">

              {primaryItems.map((item) =>
                <li class="nav-item">
                  <a class="nav-link" href={item.location}>
                    <span>{item.text}</span>
                  </a>
                </li>
              )}

            </ul>
          </div>
        </nav>
      )
    }
  }
}
