import {
  Component, Prop, State, Watch,
} from '@stencil/core';

import { store } from '../../store';
import * as themes from '../../themes.built/c-content';

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
      <slot />,
    // }
    ]
  }
}
