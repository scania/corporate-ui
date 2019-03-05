import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-content',
  styleUrl: 'content.scss',
  shadow: true,
})
export class Content {
  @Prop() router: boolean;

  render() {
    if (this.router) {
      return (
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url='/' component='app-home' exact={true} />
            <stencil-route url='/profile/:name' component='app-profile' />
          </stencil-route-switch>
        </stencil-router>
      );
    }
      return <slot />;
  }
}
