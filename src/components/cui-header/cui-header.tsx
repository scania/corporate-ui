import { Store } from '@stencil/redux';
import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'cui-header',
  styleUrl: 'cui-header.scss',
  shadow: true
})
export class CuiHeader {
  @Prop() siteName: string;
  @Prop() items: any = [];

  @Prop({ context: 'store' }) store: Store;
  @State() theme: string;

  componentWillLoad(){
    this.store.mapStateToProps(this, (state) => {
      const {
        app: { theme }
      } = state;

      return {
        theme
      }
    });

  }

  render() {
    let items = Array.isArray(this.items) ? this.items : JSON.parse(this.items);

    return (
          <nav class="navbar navbar-expand-lg navbar-default">
            <div class="navbar-header collapse navbar-collapse">

                  <div class="mr-auto mt-2 mt-lg-0">
                    <a class="navbar-brand" href="#"></a>
                    {this.siteName}
                  </div>

                  <ul class="navbar-nav my-2 my-lg-0">

                    {items.map((item) =>
                      <li class="nav-item">
                        <a class="nav-link" href={item.location}>
                          <span>{item.text}</span>
                        </a>
                      </li>
                    )}

                  </ul>

                  <a class="navbar-symbol" href="#"></a>
                  <style>@import url({'../../themes/' + this.theme + '/cui-header.css'});</style>
            </div>
          </nav>

    );
  }
}
