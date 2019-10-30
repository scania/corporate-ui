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

  @State() theme: string;

  @State() currentTheme = { icons: { }, components: [] };

  @Element() el: any;

  @Watch('theme')
  setTheme() {
    this.theme = this.store.getState().theme.current;
    this.setIcon();
  }

  @Watch('name')
  setIcon(name = this.name) {
    const items = this.store.getState().theme.items[this.theme].icons;

    // TODO: We should have the default icon being a simple
    // square instead of first icon in the collection
    this.icon = items[name] || items.question || items[Object.keys(items)[0]] || { width: 0, height: 0 };
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;
    this.theme = this.store.getState().theme.current;
    this.currentTheme = this.store.getState().theme[this.theme];

    this.setIcon();

    this.store.subscribe(() => {
      this.theme = this.store.getState().theme.current;
      this.currentTheme = this.store.getState().theme[this.theme];
    });
  }

  componentDidLoad() {
    if (!this.el) return;

    this.tagName = this.el.nodeName.toLowerCase();
  }

  render() {
    return [
      this.currentTheme ? <style>{ this.currentTheme.components[this.tagName] }</style> : '',
      <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${this.icon.width} ${this.icon.height}`}>
        <path fill='currentColor' d={this.icon.definition} />
      </svg>,
    ];
  }
}
