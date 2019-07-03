import {
  Component, Prop, State, Watch, Element,
} from '@stencil/core';

import { library, findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, fab);

@Component({
  tag: 'c-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {
  @Prop() name = 'circle';

  @State() icon: any;

  @Element() el: any;

  @Watch('name')
  setIcon(name) {
    let iconObject = findIconDefinition({ prefix: 'fas', iconName: name });
    iconObject = iconObject || findIconDefinition({ prefix: 'fab', iconName: name });
    iconObject = iconObject || findIconDefinition({ prefix: 'fas', iconName: 'question' });
    if (iconObject) {
      this.icon = icon(iconObject).node[0];
      (this.el.shadowRoot || this.el).appendChild(this.icon);
    }
  }

  componentWillLoad() {
    this.setIcon(this.name);
  }
}
