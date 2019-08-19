import {
  Component, Prop, State, Watch, Element,
} from '@stencil/core';

@Component({
  tag: 'c-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {
  @Prop({ context: 'store' }) ContextStore: any;

  @Prop() name = 'question';

  @State() store: any;

  @State() icon: any;

  @State() tagName: string;

  @State() currentTheme: object;

  @Element() el: any;

  @Watch('name')
  setIcon(name = this.name) {
    const items = this.store.getState().icon.items;

    // TODO: We should have the default icon being a simple
    // square instead of first icon in the collection
    this.icon = items[name] || items.question || items[Object.keys(items)[0]] || { width: 0, height: 0 };
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;
    this.currentTheme = this.store.getState().themes[this.store.getState().theme.name];

    this.setIcon();

    this.store.subscribe(() => {
      this.currentTheme = this.store.getState().themes[this.store.getState().theme.name];

      this.setIcon();
    });
  }

  componentDidLoad() {
    if (!this.el) return;

    this.tagName = this.el.nodeName.toLowerCase();
  }

  render() {
    return [
      this.currentTheme ? <style>{ this.currentTheme[this.tagName] }</style> : '',
      <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${this.icon.width} ${this.icon.height}`}>
        <path fill='currentColor' d={this.icon.definition} />
      </svg>,
    ];
  }
}
