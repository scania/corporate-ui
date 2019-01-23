import { Component, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import { configureStore } from '../../store/index';

@Component({
  tag: 'cui-content',
  styleUrl: 'cui-content.scss',
  shadow: true
})
export class CuiContent {
  @Prop() router: Boolean;
  @Prop({ context: 'store' }) store: Store;

  componentWillLoad(){
    this.store.setStore(configureStore({}));
  }

  render() {
    if (this.router) {
      return (
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url='/' component='app-home' exact={true} />
            <stencil-route url='/profile/:name' component='app-profile' />
          </stencil-route-switch>
        </stencil-router>
      )
    } else {
      return <slot></slot>
    }
  }
}
