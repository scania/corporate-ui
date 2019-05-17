import {
  Component, Prop, State, Element, Watch,
} from '@stencil/core';

import { store } from '../../store';
import * as themes from '../../themes.built/c-footer';

@Component({
  tag: 'c-footer',
  styleUrl: 'footer.scss',
  shadow: true,
})
export class Footer {
  /** Per default, this will inherit the value from c-theme name property */
  @Prop() theme: string;

  /** Change default copyright text */
  @Prop() text = 'Copyright © Scania 2019';

  /** Set footer links */
  @Prop() items: any;

  /** Add social media icons */
  @Prop() socialMediaItems: any;

  @State() currentTheme: string = this.theme || store.getState().theme.name;

  @State() show = false;

  // There should be a better way of solving this, either by "{ mutable: true }"
  // or "{ reflectToAttr: true }" or harder prop typing Array<Object>
  @State() _items: object[] = [];
  
  @State() initialSlot : any;

  @State() _socialMediaItems: object[] = [];

  @Element() el: HTMLElement;

  @Watch('items')
  @Watch('socialMediaItems')
  setItems(items, type) {
    this[type] = Array.isArray(items) ? items : JSON.parse(items || '[]');
  }

  @Watch('theme')
  updateTheme(name) {
    this.currentTheme = name;
  }

  componentWillLoad() {
    store.subscribe(() => this.currentTheme = store.getState().theme.name);
    
    this.initialSlot = this.el.innerHTML;

    this.setItems(this.items, '_items');
    this.setItems(this.socialMediaItems, '_socialMediaItems');
  }

  combineClasses(classes) {
    return [
      ...(classes || '').split(' '),
      ...['nav-item', 'nav-link'],
    ].join(' ');
  }

  render() {
    if (!document.head.attachShadow) {
      this.currentTheme += '_ie';
    }
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

      <nav class='navbar navbar-expand-lg navbar-default'>
        <strong class='navbar-brand'></strong>
        <div class='navbar-top'>
          <nav class='social-media-items'>

            { this._socialMediaItems.map(item => (
              <c-social-media { ...item }></c-social-media>
            )) }

            <slot name='social-media-items' />
          </nav>
          
          { this.initialSlot.indexOf('slot="items"') > 0 || this.items ? 

            <nav class='navbar-nav'> 
            
              { this._items.map((item: any) => {
                item.class = this.combineClasses(item.class);
                return <a { ...item }></a>;
              }) }

              <slot name='items' />
            </nav>

            : ''

          }
        </div>
        
        <p>
          {this.text}
          <slot name='text' />
        </p>
      </nav>,
    ];
  }
}
