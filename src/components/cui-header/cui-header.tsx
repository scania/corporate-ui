import { Component, Prop } from '@stencil/core';
import Tunnel from '../data/theme';

@Component({
  tag: 'cui-header',
  styleUrl: 'cui-header.scss',
  shadow: true
})
export class CuiHeader {
  @Prop() siteName: string;
  @Prop() items: any = [];

  render() {
    try {
      let items = Array.isArray(this.items)
        ? this.items
        : JSON.parse(this.items);

      return (
        <Tunnel.Consumer>
          {({ theme }) => (
            <nav class="navbar navbar-expand-lg navbar-default">
              <style>
                @import url({'../../themes/' + theme + '/cui-header.css'});
              </style>
              <div class="navbar-header collapse navbar-collapse">
                <div class="mr-auto mt-2 mt-lg-0">
                  <a class="navbar-brand" href="#" />
                  {this.siteName}
                </div>

                <ul class="navbar-nav my-2 my-lg-0">
                  {items.map(item => (
                    <li class="nav-item">
                      <a class="nav-link" href={item.location}>
                        <span>{item.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <a class="navbar-symbol" href="#" />
              </div>
            </nav>
          )}
        </Tunnel.Consumer>
      );
    } catch (error) {
      console.error(error);
    }
  }
}
