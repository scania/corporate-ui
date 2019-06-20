import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

@Component({
  tag: 'c-footer',
  styleUrl: 'footer.scss',
  shadow: true,
})
export class Footer {
  @Prop({ context: 'store' }) store: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop({ mutable: true }) theme: string;

  /** Change default copyright text */
  @Prop() text = 'Copyright © Scania 2019';

  /** Set footer links */
  @Prop({ mutable: true }) items: any;

  /** Add social media icons */
  @Prop({ mutable: true }) socialItems: any;

  @State() show = false;

  @State() initialSlot = '';

  @State() tagName: string;

  @State() currentTheme: object;

  @Element() el: HTMLElement;

  @Watch('items')
  setItems(items) {
    this.items = this.parse(items);
  }

  @Watch('socialItems')
  setSocialItems(items) {
    this.socialItems = this.parse(items);
  }

  @Watch('theme')
  setTheme(name) {
    this.theme = name || this.store.getState().theme.name;
    this.currentTheme = this.store.getState().themes[this.theme] || {};
  }

  componentWillLoad() {
    this.setTheme(this.theme);
    this.setItems(this.items);
    this.setSocialItems(this.socialItems);

    this.store.subscribe(() => this.setTheme(this.theme));
  }

  componentDidLoad() {
    this.initialSlot = this.el.innerHTML;
    this.tagName = this.el.nodeName.toLowerCase();
  }

  parse(items) {
    return Array.isArray(items) ? items : JSON.parse(items || '[]');
  }

  combineClasses(classes) {
    return [
      ...(classes || '').split(' '),
      ...['nav-item', 'nav-link'],
    ].join(' ');
  }

  render() {
    return [
      this.currentTheme ? <style>{ this.currentTheme[this.tagName] }</style> : '',

      <nav class='navbar navbar-expand-lg navbar-default'>
        <strong class='navbar-brand'></strong>

        <nav class='social-media-items'>

          { this.socialItems.map(item => (
            <c-social-media { ...item }></c-social-media>
          )) }

          <slot name='social-items' />
        </nav>
        { this.initialSlot.indexOf('slot="items"') > 0 || this.items
          ? <nav class='navbar-nav'>
            { this.items.map((item: any) => {
              item.class = this.combineClasses(item.class);
              return <a { ...item }></a>;
            }) }

            <slot name='items' />
          </nav>
          : '' }
        <p>
          {this.text}
          <slot name='text' />
        </p>
      </nav>,
    ];
  }
}
