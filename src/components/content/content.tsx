import { Component, Prop, State, Watch } from '@stencil/core';

import { store } from '../../global';
import * as themes from '../../tmp/c-content';

@Component({
  tag: 'c-content',
  styleUrl: 'content.scss',
  shadow: true
})
export class Content {
  @Prop() theme: string;
  @Prop() router: Boolean;

  @State() currentTheme: string = this.theme || store.getState().theme.name;

  @Watch('theme')
  updateTheme(name) {
    this.currentTheme = name;
  }

  componentWillLoad() {
    store.subscribe(() => this.currentTheme = store.getState().theme.name);
  }

  render() {
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

    // Move the router related things a router component
    // if (this.router) {
    //   return (
    //     <stencil-router>
    //       <stencil-route-switch scrollTopOffset={0}>
    //         <stencil-route url='/' component='app-home' exact={true} />
    //         <stencil-route url='/profile/:name' component='app-profile' />
    //       </stencil-route-switch>
    //     </stencil-router>
    //   );
    // } else {
      <slot />
    // }
    ]
  }
}
