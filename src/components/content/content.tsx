import {
  Component, Prop, State, Element, Watch, Listen,
} from '@stencil/core';

@Component({
  tag: 'c-content',
  styleUrl: 'content.scss',
  shadow: true,
})
export class Content {
  @Prop({ context: 'store' }) ContextStore: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop({ mutable: true }) theme: string;

  /** This property is in experimental state */
  @Prop() router: boolean;

  @State() store: any;

  @State() tagName: string;

  @State() currentTheme: object;

  @State() navHeight: any;

  @State() navEl: any;

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.theme];
  }

  @Listen('window:resize')
  onResize() {
    this.navHeight = this.navEl ? this.navEl.clientHeight : 0;
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);

    this.store.subscribe(() => this.setTheme());
  }

  componentDidLoad() {
    this.tagName = this.el.nodeName.toLowerCase();
    this.navEl = document.querySelector('c-navigation');
  }

  componentDidUpdate() {
    this.navHeight = this.navEl ? this.navEl.clientHeight : 0;
  }

  render() {
    if (!document.head.attachShadow) this.el.style.paddingTop = `${this.navHeight}px`;
    return [
      <style {...{ innerHTML: `:host { --navHeight: ${this.navHeight}px;}` }}></style>,
      this.currentTheme ? <style>{this.currentTheme[this.tagName]}</style> : '',

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
