import {
  Component, Prop, State, Watch,
} from '@stencil/core';

import * as icons from './icons';

@Component({
  tag: 'c-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {
  @Prop() name = 'truck';

  @State() iconSet: any;

  @State() iconPath: any;

  @Watch('name')
  updateIcon(name) {
    // change to camelCase
    name = name.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase())
    if (name === 'function') {
      name = 'functionIcon';
    }
    this.iconSet = icons[name] || icons.ban;
    this.iconPath = this.iconSet.data;
  }

  componentWillLoad() {
    this.updateIcon(this.name);
  }

  render() {
    return (
      <svg class='icon' xmlns="http://www.w3.org/2000/svg" viewBox={ `0 0 ${this.iconSet.pos.join(' ')}` }>
        <path d={ window.atob(this.iconPath) } />
      </svg>
    );
  }
}
