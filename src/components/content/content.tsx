import {
  Component, Prop, State, Watch,
} from '@stencil/core';

import { store } from '../../store';

@Component({
  tag: 'c-content',
  styleUrl: 'content.scss',
  shadow: true,
})
export class Content {
  /** Per default, this will inherit the value from c-theme name property */
  @Prop() theme: string;

  /** This property is in experimental state */
  @Prop() router: boolean;

  @State() currentTheme: string = this.theme || store.getState().theme.name;

  @Watch('theme')
  setTheme(name) {
    name = name || store.getState().theme.name;
    this.currentTheme = store.getState().themes[name];
  }

  componentWillLoad() {
    store.subscribe(() => this.setTheme(this.theme));

    this.setTheme(this.theme);
  }

  render() {
    const type = document.head.attachShadow ? 'default' : 'ie';

    return [
      this.currentTheme && this.currentTheme['c-content'] ? <style>{ this.currentTheme['c-content'][type] }</style> : '',

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
      <slot />,
    // }
    ];
  }
}
