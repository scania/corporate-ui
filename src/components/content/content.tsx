import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

@Component({
  tag: 'c-content',
  styleUrl: 'content.scss',
  shadow: true,
})
export class Content {
  @Prop({ context: 'store' }) store: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop() theme: string;

  /** This property is in experimental state */
  @Prop() router: boolean;

  @State() tagName: string;

  @State() style: string;

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme() {
    const name = this.theme || this.store.getState().theme.name;
    const currentTheme = this.store.getState().themes[name];

    this.style = currentTheme ? currentTheme[this.tagName] : '';
  }

  componentWillLoad() {
    this.tagName = this.el.tagName.toLowerCase();

    this.setTheme();

    this.store.subscribe(() => this.setTheme());
  }

  render() {
    return [
      this.style ? <style>{ this.style }</style> : '',

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
