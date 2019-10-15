import {
  Component, Element, Prop, State, Watch,
} from '@stencil/core';

@Component({
  tag: 'c-dealer-header',
  styleUrl: 'dealer-header.scss',
  shadow: true,
})
export class DealerHeader {
  /** Dealer name */
  @Prop() dealerName: string;

  /** A link to dealer logotype image */
  @Prop() dealerLogo: string;

  /** Short name that will appear in smaller screen size */
  @Prop() shortName: string;

  /** A link that will be applied to the site-name */
  @Prop() siteUrl: string = '/';

  @Prop({ mutable: true }) theme: string;

  @Prop({ context: 'store' }) ContextStore: any;

  @State() currentTheme: object;

  @State() store: any;

  @State() tagName: string;

  @Element() el: HTMLElement;

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.theme];
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);

    this.store.subscribe(() => {
      this.setTheme();
    });
  }

  componentDidLoad() {
    if (!this.el) return;
    this.tagName = this.el.nodeName.toLowerCase();
  }

  render() {
    return [
      this.currentTheme ? <style>{ this.currentTheme[this.tagName] }</style> : '',

      <c-header site-name={this.dealerName} short-name={this.shortName} site-url={this.siteUrl} variation='dealer'>
        {this.dealerLogo
          ? <img src={this.dealerLogo} alt={this.dealerName} slot='brand-logo'/>
          : <strong class='navbar-title' slot='brand-logo'>{ this.dealerName }</strong>
        }
        <slot name='items' slot='items' />
      </c-header>,
    ];
  }
}
